#!/usr/bin/env python3

import requests
import json
import uuid
import sys
from datetime import datetime, timedelta

# Base URL from environment
BASE_URL = "https://proexpress-preview.preview.emergentagent.com/api"
ADMIN_PASSWORD = "proexpress2025"

class ProExpressAPITest:
    def __init__(self):
        self.base_url = BASE_URL
        self.admin_token = None
        self.test_quote_id = None
        self.test_contact_id = None
        
    def log(self, message):
        print(f"[{datetime.now().strftime('%H:%M:%S')}] {message}")
        
    def test_health_check(self):
        """Test GET /api/health - Health check endpoint"""
        try:
            self.log("Testing health check endpoint...")
            response = requests.get(f"{self.base_url}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('status') == 'ok' and 'service' in data and 'timestamp' in data:
                    self.log("✅ Health check passed")
                    return True
                else:
                    self.log(f"❌ Health check failed - Invalid response format: {data}")
                    return False
            else:
                self.log(f"❌ Health check failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Health check exception: {str(e)}")
            return False
            
    def test_quote_submission(self):
        """Test POST /api/quote - Submit quote request"""
        try:
            self.log("Testing quote submission...")
            
            # Test with valid comprehensive data
            quote_data = {
                "full_name": "John Smith",
                "company_name": "Smith Logistics LLC",
                "email": "john.smith@smithlogistics.com",
                "phone": "414-555-0123",
                "pickup_location": "Milwaukee, WI",
                "delivery_location": "Chicago, IL",
                "service_type": "sprinter",
                "freight_description": "Electronics equipment - 5 boxes",
                "weight": "500 lbs",
                "pickup_date": (datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d"),
                "delivery_deadline": (datetime.now() + timedelta(days=3)).strftime("%Y-%m-%d"),
                "additional_notes": "Fragile items - handle with care"
            }
            
            response = requests.post(f"{self.base_url}/quote", 
                                   json=quote_data, 
                                   headers={'Content-Type': 'application/json'},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'id' in data:
                    self.test_quote_id = data['id']
                    self.log(f"✅ Quote submission passed - ID: {self.test_quote_id}")
                    
                    # Test with minimal data (all fields are optional per schema)
                    minimal_data = {"full_name": "Jane Doe", "email": "jane@example.com"}
                    response2 = requests.post(f"{self.base_url}/quote", 
                                            json=minimal_data, 
                                            headers={'Content-Type': 'application/json'},
                                            timeout=10)
                    
                    if response2.status_code == 200 and response2.json().get('success'):
                        self.log("✅ Quote submission with minimal data passed")
                        return True
                    else:
                        self.log(f"❌ Quote submission with minimal data failed: {response2.text}")
                        return False
                        
                else:
                    self.log(f"❌ Quote submission failed - Invalid response: {data}")
                    return False
            else:
                self.log(f"❌ Quote submission failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Quote submission exception: {str(e)}")
            return False
            
    def test_contact_submission(self):
        """Test POST /api/contact - Submit contact form"""
        try:
            self.log("Testing contact form submission...")
            
            contact_data = {
                "name": "Sarah Johnson",
                "email": "sarah.johnson@corporatefreight.com",
                "phone": "414-555-0456",
                "message": "I need urgent delivery service from Milwaukee to Madison tomorrow. Please call me ASAP."
            }
            
            response = requests.post(f"{self.base_url}/contact", 
                                   json=contact_data, 
                                   headers={'Content-Type': 'application/json'},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and 'id' in data:
                    self.test_contact_id = data['id']
                    self.log(f"✅ Contact submission passed - ID: {self.test_contact_id}")
                    return True
                else:
                    self.log(f"❌ Contact submission failed - Invalid response: {data}")
                    return False
            else:
                self.log(f"❌ Contact submission failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Contact submission exception: {str(e)}")
            return False
            
    def test_admin_login(self):
        """Test POST /api/admin/login - Password authentication"""
        try:
            self.log("Testing admin login...")
            
            # Test with correct password
            login_data = {"password": ADMIN_PASSWORD}
            response = requests.post(f"{self.base_url}/admin/login", 
                                   json=login_data, 
                                   headers={'Content-Type': 'application/json'},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') and data.get('token') == ADMIN_PASSWORD:
                    self.admin_token = data['token']
                    self.log("✅ Admin login with correct password passed")
                    
                    # Test with wrong password
                    wrong_login = {"password": "wrongpassword"}
                    response2 = requests.post(f"{self.base_url}/admin/login", 
                                            json=wrong_login, 
                                            headers={'Content-Type': 'application/json'},
                                            timeout=10)
                    
                    if response2.status_code == 401:
                        self.log("✅ Admin login with wrong password correctly rejected")
                        return True
                    else:
                        self.log(f"❌ Admin login with wrong password should return 401, got: {response2.status_code}")
                        return False
                        
                else:
                    self.log(f"❌ Admin login failed - Invalid response: {data}")
                    return False
            else:
                self.log(f"❌ Admin login failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Admin login exception: {str(e)}")
            return False
            
    def test_admin_leads_fetch(self):
        """Test GET /api/admin/leads - Fetch all quote leads with auth"""
        try:
            self.log("Testing admin leads fetch...")
            
            if not self.admin_token:
                self.log("❌ Admin leads fetch failed - No admin token available")
                return False
                
            # Test with authentication
            headers = {'Authorization': f'Bearer {self.admin_token}'}
            response = requests.get(f"{self.base_url}/admin/leads", 
                                  headers=headers, 
                                  timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'data' in data and 'total' in data and 'page' in data and 'limit' in data:
                    self.log(f"✅ Admin leads fetch passed - Found {data['total']} leads")
                    
                    # Test without authentication
                    response2 = requests.get(f"{self.base_url}/admin/leads", timeout=10)
                    
                    if response2.status_code == 401:
                        self.log("✅ Admin leads fetch without auth correctly rejected")
                        return True
                    else:
                        self.log(f"❌ Admin leads fetch without auth should return 401, got: {response2.status_code}")
                        return False
                        
                else:
                    self.log(f"❌ Admin leads fetch failed - Invalid response format: {data}")
                    return False
            else:
                self.log(f"❌ Admin leads fetch failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Admin leads fetch exception: {str(e)}")
            return False
            
    def test_admin_contacts_fetch(self):
        """Test GET /api/admin/contacts - Fetch all contacts with auth"""
        try:
            self.log("Testing admin contacts fetch...")
            
            if not self.admin_token:
                self.log("❌ Admin contacts fetch failed - No admin token available")
                return False
                
            # Test with authentication
            headers = {'Authorization': f'Bearer {self.admin_token}'}
            response = requests.get(f"{self.base_url}/admin/contacts", 
                                  headers=headers, 
                                  timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if 'data' in data and 'total' in data:
                    self.log(f"✅ Admin contacts fetch passed - Found {data['total']} contacts")
                    
                    # Test without authentication
                    response2 = requests.get(f"{self.base_url}/admin/contacts", timeout=10)
                    
                    if response2.status_code == 401:
                        self.log("✅ Admin contacts fetch without auth correctly rejected")
                        return True
                    else:
                        self.log(f"❌ Admin contacts fetch without auth should return 401, got: {response2.status_code}")
                        return False
                        
                else:
                    self.log(f"❌ Admin contacts fetch failed - Invalid response format: {data}")
                    return False
            else:
                self.log(f"❌ Admin contacts fetch failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Admin contacts fetch exception: {str(e)}")
            return False
            
    def test_admin_lead_update(self):
        """Test PATCH /api/admin/leads/:id - Update lead status"""
        try:
            self.log("Testing admin lead status update...")
            
            if not self.admin_token or not self.test_quote_id:
                self.log("❌ Admin lead update failed - Missing token or quote ID")
                return False
                
            # Test status update with authentication
            headers = {
                'Authorization': f'Bearer {self.admin_token}',
                'Content-Type': 'application/json'
            }
            update_data = {"status": "contacted"}
            
            response = requests.patch(f"{self.base_url}/admin/leads/{self.test_quote_id}", 
                                    json=update_data, 
                                    headers=headers, 
                                    timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log("✅ Admin lead update passed")
                    
                    # Verify the status was actually updated by fetching leads again
                    fetch_response = requests.get(f"{self.base_url}/admin/leads", 
                                                headers={'Authorization': f'Bearer {self.admin_token}'}, 
                                                timeout=10)
                    
                    if fetch_response.status_code == 200:
                        leads_data = fetch_response.json()
                        # Find our updated lead
                        updated_lead = None
                        for lead in leads_data.get('data', []):
                            if lead.get('id') == self.test_quote_id:
                                updated_lead = lead
                                break
                                
                        if updated_lead and updated_lead.get('status') == 'contacted':
                            self.log("✅ Lead status verification passed")
                            return True
                        else:
                            self.log(f"❌ Lead status not updated correctly - Expected 'contacted', got: {updated_lead.get('status') if updated_lead else 'lead not found'}")
                            return False
                    else:
                        self.log("❌ Could not verify lead status update")
                        return False
                        
                else:
                    self.log(f"❌ Admin lead update failed - Response: {data}")
                    return False
            else:
                self.log(f"❌ Admin lead update failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Admin lead update exception: {str(e)}")
            return False
            
    def test_admin_contact_update(self):
        """Test PATCH /api/admin/contacts/:id - Update contact status"""
        try:
            self.log("Testing admin contact status update...")
            
            if not self.admin_token or not self.test_contact_id:
                self.log("❌ Admin contact update failed - Missing token or contact ID")
                return False
                
            # Test status update with authentication
            headers = {
                'Authorization': f'Bearer {self.admin_token}',
                'Content-Type': 'application/json'
            }
            update_data = {"status": "contacted"}
            
            response = requests.patch(f"{self.base_url}/admin/contacts/{self.test_contact_id}", 
                                    json=update_data, 
                                    headers=headers, 
                                    timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log("✅ Admin contact update passed")
                    return True
                else:
                    self.log(f"❌ Admin contact update failed - Response: {data}")
                    return False
            else:
                self.log(f"❌ Admin contact update failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Admin contact update exception: {str(e)}")
            return False
            
    def test_admin_lead_delete(self):
        """Test DELETE /api/admin/leads/:id - Delete a lead"""
        try:
            self.log("Testing admin lead deletion...")
            
            if not self.admin_token or not self.test_quote_id:
                self.log("❌ Admin lead delete failed - Missing token or quote ID")
                return False
                
            headers = {'Authorization': f'Bearer {self.admin_token}'}
            
            response = requests.delete(f"{self.base_url}/admin/leads/{self.test_quote_id}", 
                                     headers=headers, 
                                     timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log("✅ Admin lead deletion passed")
                    return True
                else:
                    self.log(f"❌ Admin lead deletion failed - Response: {data}")
                    return False
            else:
                self.log(f"❌ Admin lead deletion failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Admin lead deletion exception: {str(e)}")
            return False
            
    def test_admin_contact_delete(self):
        """Test DELETE /api/admin/contacts/:id - Delete a contact"""
        try:
            self.log("Testing admin contact deletion...")
            
            if not self.admin_token or not self.test_contact_id:
                self.log("❌ Admin contact delete failed - Missing token or contact ID")
                return False
                
            headers = {'Authorization': f'Bearer {self.admin_token}'}
            
            response = requests.delete(f"{self.base_url}/admin/contacts/{self.test_contact_id}", 
                                     headers=headers, 
                                     timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    self.log("✅ Admin contact deletion passed")
                    return True
                else:
                    self.log(f"❌ Admin contact deletion failed - Response: {data}")
                    return False
            else:
                self.log(f"❌ Admin contact deletion failed - Status: {response.status_code}, Body: {response.text}")
                return False
                
        except Exception as e:
            self.log(f"❌ Admin contact deletion exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests in sequence"""
        self.log(f"Starting ProExpress API Backend Tests")
        self.log(f"Testing against: {self.base_url}")
        self.log("="*60)
        
        tests = [
            ("Health Check", self.test_health_check),
            ("Quote Submission", self.test_quote_submission),
            ("Contact Submission", self.test_contact_submission),
            ("Admin Login", self.test_admin_login),
            ("Admin Leads Fetch", self.test_admin_leads_fetch),
            ("Admin Contacts Fetch", self.test_admin_contacts_fetch),
            ("Admin Lead Update", self.test_admin_lead_update),
            ("Admin Contact Update", self.test_admin_contact_update),
            ("Admin Lead Delete", self.test_admin_lead_delete),
            ("Admin Contact Delete", self.test_admin_contact_delete),
        ]
        
        passed = 0
        failed = 0
        
        for test_name, test_func in tests:
            self.log(f"\n--- {test_name} ---")
            try:
                if test_func():
                    passed += 1
                else:
                    failed += 1
            except Exception as e:
                self.log(f"❌ {test_name} crashed: {str(e)}")
                failed += 1
                
        self.log("\n" + "="*60)
        self.log(f"RESULTS: {passed} passed, {failed} failed")
        
        if failed == 0:
            self.log("🎉 ALL BACKEND TESTS PASSED!")
        else:
            self.log(f"⚠️  {failed} tests failed - see details above")
            
        return failed == 0

if __name__ == "__main__":
    tester = ProExpressAPITest()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)