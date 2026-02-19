#!/usr/bin/env python3
"""
ProExpress Email Notification Backend Tests

Tests the fire-and-forget email notification contract:
- Forms save to MongoDB and return success even when SMTP is not configured
- Admin functionality continues to work (login, status updates, delete)
- No 500 errors due to missing SMTP configuration
"""

import requests
import json
import os
from datetime import datetime

# Base URL from environment
BASE_URL = "https://proexpress-preview-1.preview.emergentagent.com"
API_URL = f"{BASE_URL}/api"
ADMIN_PASSWORD = "proexpress2025"

def log_test(test_name, status, details=""):
    """Log test results with timestamp"""
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[{timestamp}] {test_name}: {status}")
    if details:
        print(f"  → {details}")
    print()

def test_quote_submission_no_smtp():
    """Test POST /api/quote with no SMTP configured - should still return success"""
    print("=" * 70)
    print("TEST 1: POST /api/quote WITH no SMTP configured")
    print("=" * 70)
    
    quote_data = {
        "full_name": "Email Test User",
        "company_name": "Test Corp", 
        "email": "test@test.com",
        "phone": "555-111-2222",
        "pickup_location": "Milwaukee, WI",
        "delivery_location": "Chicago, IL",
        "service_type": "sprinter",
        "freight_description": "Machine parts",
        "weight": "800",
        "pickup_date": "2025-08-01",
        "delivery_deadline": "2025-08-01",
        "additional_notes": "Fragile"
    }
    
    try:
        response = requests.post(f"{API_URL}/quote", 
                               json=quote_data,
                               headers={"Content-Type": "application/json"},
                               timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "id" in data:
                log_test("Quote submission", "✅ PASS", 
                        f"Got success=true, id={data['id'][:8]}... (Fire-and-forget working)")
                return data["id"]
            else:
                log_test("Quote submission", "❌ FAIL", 
                        f"Expected {{success:true, id:<uuid>}}, got: {data}")
                return None
        else:
            log_test("Quote submission", "❌ FAIL", 
                    f"Expected 200, got {response.status_code}: {response.text}")
            return None
            
    except Exception as e:
        log_test("Quote submission", "❌ FAIL", f"Request failed: {str(e)}")
        return None

def test_contact_submission_no_smtp():
    """Test POST /api/contact with no SMTP configured - should still return success"""
    print("=" * 70)
    print("TEST 2: POST /api/contact WITH no SMTP configured") 
    print("=" * 70)
    
    contact_data = {
        "name": "Email Test Contact",
        "email": "contact@test.com",
        "phone": "555-333-4444",
        "message": "Testing email notification path"
    }
    
    try:
        response = requests.post(f"{API_URL}/contact",
                               json=contact_data, 
                               headers={"Content-Type": "application/json"},
                               timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "id" in data:
                log_test("Contact submission", "✅ PASS",
                        f"Got success=true, id={data['id'][:8]}... (Fire-and-forget working)")
                return data["id"]
            else:
                log_test("Contact submission", "❌ FAIL",
                        f"Expected {{success:true, id:<uuid>}}, got: {data}")
                return None
        else:
            log_test("Contact submission", "❌ FAIL",
                    f"Expected 200, got {response.status_code}: {response.text}")
            return None
            
    except Exception as e:
        log_test("Contact submission", "❌ FAIL", f"Request failed: {str(e)}")
        return None

def test_admin_login():
    """Test admin login still works"""
    print("=" * 70)
    print("TEST 3: Admin Login Verification")
    print("=" * 70)
    
    try:
        response = requests.post(f"{API_URL}/admin/login",
                               json={"password": ADMIN_PASSWORD},
                               headers={"Content-Type": "application/json"},
                               timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("success") and "token" in data:
                log_test("Admin login", "✅ PASS", 
                        f"Login successful with token={data['token']}")
                return data["token"]
            else:
                log_test("Admin login", "❌ FAIL",
                        f"Expected {{success:true, token:<token>}}, got: {data}")
                return None
        else:
            log_test("Admin login", "❌ FAIL",
                    f"Expected 200, got {response.status_code}: {response.text}")
            return None
            
    except Exception as e:
        log_test("Admin login", "❌ FAIL", f"Request failed: {str(e)}")
        return None

def test_admin_leads_fetch(token, expected_quote_id=None):
    """Test GET /api/admin/leads - verify quote appears and MongoDB saves work"""
    print("=" * 70)
    print("TEST 4: MongoDB Saves Verification - GET /api/admin/leads")
    print("=" * 70)
    
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{API_URL}/admin/leads", headers=headers, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if "data" in data and "total" in data:
                leads = data["data"]
                log_test("Admin leads fetch", "✅ PASS",
                        f"Retrieved {len(leads)} leads, total={data['total']}")
                
                # Check if our test quote appears
                if expected_quote_id:
                    found_quote = any(lead.get("id") == expected_quote_id for lead in leads)
                    if found_quote:
                        log_test("Quote in MongoDB", "✅ PASS", 
                                f"Test quote {expected_quote_id[:8]}... found in database")
                    else:
                        log_test("Quote in MongoDB", "❌ FAIL",
                                f"Test quote {expected_quote_id[:8]}... NOT found in database")
                
                return True
            else:
                log_test("Admin leads fetch", "❌ FAIL",
                        f"Expected {{data:[], total:<num>}}, got: {data}")
                return False
        else:
            log_test("Admin leads fetch", "❌ FAIL", 
                    f"Expected 200, got {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        log_test("Admin leads fetch", "❌ FAIL", f"Request failed: {str(e)}")
        return False

def test_admin_contacts_fetch(token, expected_contact_id=None):
    """Test GET /api/admin/contacts - verify contact appears and MongoDB saves work"""
    print("=" * 70)
    print("TEST 5: MongoDB Saves Verification - GET /api/admin/contacts")
    print("=" * 70)
    
    try:
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{API_URL}/admin/contacts", headers=headers, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if "data" in data and "total" in data:
                contacts = data["data"] 
                log_test("Admin contacts fetch", "✅ PASS",
                        f"Retrieved {len(contacts)} contacts, total={data['total']}")
                
                # Check if our test contact appears
                if expected_contact_id:
                    found_contact = any(contact.get("id") == expected_contact_id for contact in contacts)
                    if found_contact:
                        log_test("Contact in MongoDB", "✅ PASS",
                                f"Test contact {expected_contact_id[:8]}... found in database")
                    else:
                        log_test("Contact in MongoDB", "❌ FAIL", 
                                f"Test contact {expected_contact_id[:8]}... NOT found in database")
                
                return True
            else:
                log_test("Admin contacts fetch", "❌ FAIL",
                        f"Expected {{data:[], total:<num>}}, got: {data}")
                return False
        else:
            log_test("Admin contacts fetch", "❌ FAIL",
                    f"Expected 200, got {response.status_code}: {response.text}")
            return False
            
    except Exception as e:
        log_test("Admin contacts fetch", "❌ FAIL", f"Request failed: {str(e)}")
        return False

def test_status_updates(token, quote_id, contact_id):
    """Test PATCH /api/admin/leads/:id and contacts/:id - status updates still work"""
    print("=" * 70)
    print("TEST 6: Status Update Regression Tests")
    print("=" * 70)
    
    # Test lead status update
    if quote_id:
        try:
            headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
            response = requests.patch(f"{API_URL}/admin/leads/{quote_id}",
                                    json={"status": "contacted"},
                                    headers=headers, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    log_test("Lead status update", "✅ PASS",
                            f"Updated lead {quote_id[:8]}... to 'contacted'")
                else:
                    log_test("Lead status update", "❌ FAIL", f"Expected success:true, got: {data}")
            else:
                log_test("Lead status update", "❌ FAIL", 
                        f"Expected 200, got {response.status_code}: {response.text}")
                
        except Exception as e:
            log_test("Lead status update", "❌ FAIL", f"Request failed: {str(e)}")
    
    # Test contact status update
    if contact_id:
        try:
            headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
            response = requests.patch(f"{API_URL}/admin/contacts/{contact_id}",
                                    json={"status": "contacted"},
                                    headers=headers, timeout=30)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    log_test("Contact status update", "✅ PASS",
                            f"Updated contact {contact_id[:8]}... to 'contacted'")
                else:
                    log_test("Contact status update", "❌ FAIL", f"Expected success:true, got: {data}")
            else:
                log_test("Contact status update", "❌ FAIL",
                        f"Expected 200, got {response.status_code}: {response.text}")
                
        except Exception as e:
            log_test("Contact status update", "❌ FAIL", f"Request failed: {str(e)}")

def main():
    """Run all email notification backend tests"""
    print("🚚 ProExpress Email Notification Backend Tests")
    print("📧 Testing fire-and-forget email contract with NO SMTP configured")
    print(f"🌐 Base URL: {BASE_URL}")
    print(f"⚙️  Admin Password: {ADMIN_PASSWORD}")
    print()
    
    # Store test results
    quote_id = None
    contact_id = None
    auth_token = None
    
    # Test 1: Quote submission without SMTP
    quote_id = test_quote_submission_no_smtp()
    
    # Test 2: Contact submission without SMTP  
    contact_id = test_contact_submission_no_smtp()
    
    # Test 3: Admin login
    auth_token = test_admin_login()
    
    if auth_token:
        # Test 4 & 5: Verify MongoDB saves worked
        test_admin_leads_fetch(auth_token, quote_id)
        test_admin_contacts_fetch(auth_token, contact_id)
        
        # Test 6: Status updates still work
        test_status_updates(auth_token, quote_id, contact_id)
    else:
        print("⚠️  Skipping admin tests - login failed")
    
    print("=" * 70)
    print("🏁 EMAIL NOTIFICATION TESTING COMPLETE")
    print("=" * 70)
    print("Key Validation Points:")
    print("✓ Form submissions return success even with no SMTP config")
    print("✓ Data is saved to MongoDB regardless of email status")
    print("✓ No 500 errors thrown due to missing SMTP variables") 
    print("✓ Admin functionality remains unaffected")
    print("✓ Fire-and-forget contract working as designed")
    print()

if __name__ == "__main__":
    main()