# ProExpress — Complete Deployment Guide
### From Zero to Live on Vercel with a Custom Domain (HostPapa)

> **Who this guide is for:** This guide assumes you have never deployed a website before. Every step is explained from scratch. No technical background required. Estimated time: **45–90 minutes** for your first deployment.

---

## Table of Contents

1. [Before You Start — What You'll Need](#1-before-you-start)
2. [Step 1 — Create a Free MongoDB Atlas Database](#2-mongodb-atlas)
3. [Step 2 — Install Git on Your Computer](#3-install-git)
4. [Step 3 — Push Your Code to GitHub](#4-push-to-github)
5. [Step 4 — Create a Free Vercel Account](#5-create-vercel-account)
6. [Step 5 — Import Your GitHub Repo into Vercel & Deploy](#6-import-and-deploy)
7. [Step 6 — Add All Environment Variables in Vercel](#7-environment-variables)
8. [Step 7 — Add a Custom Domain in Vercel](#8-custom-domain)
9. [Step 8 — Update DNS Settings on HostPapa](#9-hostpapa-dns)
10. [Step 9 — Verify the Live Site & Test All Features](#10-verify-live-site)
11. [Step 10 — How to Redeploy After Code Changes](#11-redeploy)
12. [Troubleshooting — 3 Most Common Errors](#12-troubleshooting)

---

## 1. Before You Start — What You'll Need {#1-before-you-start}

Make sure you have the following ready before starting:

| What | Why | Cost |
|------|-----|------|
| Email address | To create accounts | Free |
| GitHub account | To store your code | Free |
| Vercel account | To host your website | Free |
| MongoDB Atlas account | To store form submissions | Free |
| Your domain name (e.g. `proexpressinc.com`) | Your website address | Already purchased on HostPapa |
| Access to your HostPapa account | To point the domain to Vercel | Already have |
| Your project code folder | The website files built for you | Already on your computer |

---

## 2. Step 1 — Create a Free MongoDB Atlas Database {#2-mongodb-atlas}

Your website needs a cloud database to store quote requests and contact form submissions. MongoDB Atlas has a **permanently free** tier (512 MB) that is more than enough.

### 2a. Create Your Atlas Account

1. Open your browser and go to: **https://www.mongodb.com/cloud/atlas/register**
2. Fill in your name, email address, and create a password. Click **"Create your Atlas account"**.
3. Check your email and click the confirmation link Atlas sends you.
4. You'll be asked a few setup questions. Select:
   - **"I'm building a new app"**
   - **"JavaScript / Node.js"**
   - Anything for team size
5. Click **"Finish"**.

### 2b. Create a Free Cluster

After signing in you'll be on the Atlas dashboard.

1. Click the big green button **"Create"** (or "Build a Database").
2. You'll see three options: **M0 (Free)**, M10, M30. Make sure **M0 Free** is selected.
3. Under **"Provider"**, choose **AWS**.
4. Under **"Region"**, choose the region closest to you (e.g., **"US East (N. Virginia)"** if you're in the US).
5. Under **"Cluster Name"**, type: `proexpress-cluster`
6. Click the green **"Create Deployment"** button at the bottom.
   > ⏳ Atlas takes about 2 minutes to create your cluster. A spinning progress indicator will show.

### 2c. Create a Database User

A popup will appear asking you to create a user.

1. **Username:** Type `proexpressadmin`
2. **Password:** Click **"Autogenerate Secure Password"** — then **copy the password and save it somewhere safe** (like Notepad). You will need it later.
3. Click **"Create Database User"**.
4. Click **"Choose a Connection Method"** at the bottom.

### 2d. Allow Access from Anywhere

1. You'll see a screen called **"Connect to Cluster"**.
2. Click **"Add My Current IP Address"** first, then also click **"Allow Access from Anywhere"** (this adds `0.0.0.0/0`).
   > This is necessary because Vercel's servers have different IP addresses every time, so you must allow all IPs.
3. Click **"Finish and Close"** then **"Go to Overview"**.

### 2e. Get Your Connection String

1. On the Atlas dashboard, you'll see your cluster `proexpress-cluster`. Click **"Connect"**.
2. Click **"Drivers"** (or "Connect your application").
3. Under **"Driver"**, select **Node.js**. Under **"Version"**, select **5.5 or later**.
4. You'll see a connection string that looks like this:

   ```
   mongodb+srv://proexpressadmin:<password>@proexpress-cluster.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

5. **Copy this entire string.** Replace `<password>` with the actual password you saved in step 2c.
   > For example: `mongodb+srv://proexpressadmin:MyPassword123@proexpress-cluster.abc123.mongodb.net/?retryWrites=true&w=majority`

6. **Save this connection string in Notepad** — you'll need it in Step 6 (Environment Variables).

---

## 3. Step 2 — Install Git on Your Computer {#3-install-git}

Git is a free tool that uploads your code to GitHub.

### On Windows:

1. Go to: **https://git-scm.com/download/win**
2. The download will start automatically. Open the downloaded `.exe` file.
3. Click **"Next"** through all the screens — the default settings are fine.
4. Click **"Install"**, then **"Finish"**.
5. To verify it worked: Press the **Windows key**, type `cmd`, press Enter. In the black window, type:
   ```
   git --version
   ```
   You should see something like `git version 2.44.0`. ✅

### On Mac:

1. Press **Command + Space**, type `Terminal`, press Enter.
2. Type this command and press Enter:
   ```
   git --version
   ```
3. If Git is not installed, a popup will appear asking you to install **Xcode Command Line Tools**. Click **"Install"** and wait for it to finish (about 5 minutes).
4. Once done, type `git --version` again to confirm. ✅

---

## 4. Step 3 — Push Your Code to GitHub {#4-push-to-github}

GitHub is where your code will live online so Vercel can access it.

### 4a. Create a GitHub Account

1. Go to: **https://github.com/signup**
2. Enter your email, create a password, and choose a username (e.g., `proexpressinc`).
3. Verify your email address when GitHub sends you a confirmation email.

### 4b. Create a New Repository on GitHub

1. After signing in to GitHub, click the **"+"** icon in the top-right corner.
2. Click **"New repository"**.
3. Fill in the form:
   - **Repository name:** `proexpress-website`
   - **Description:** `ProExpress expedite transportation website`
   - **Visibility:** Select **Private** (recommended — keeps your code private)
   - Leave everything else unchecked
4. Click **"Create repository"**.
5. You'll see a page with setup instructions. Look for the section titled **"…or push an existing repository from the command line"**. Leave this page open — you'll use it in a moment.

### 4c. Open Your Project Folder in Terminal

**On Windows:**
1. Open **File Explorer** and navigate to your project folder (the folder containing the website files).
2. In the address bar at the top of File Explorer, type `cmd` and press **Enter**. A black Command Prompt window opens in that folder.

**On Mac:**
1. Open **Finder** and navigate to your project folder.
2. Right-click the folder and choose **"New Terminal at Folder"**. (If you don't see this option, go to System Settings > Privacy & Security > Extensions > Finder Extensions, and enable Terminal.)

### 4d. Configure Git with Your Name and Email

This is a one-time setup. In the Terminal/Command Prompt window, type these two commands one at a time (press Enter after each):

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

Replace `"Your Name"` and `"your@email.com"` with your actual name and the email you used for GitHub.

### 4e. Initialize Git and Upload Your Code

Type each of these commands one at a time and press **Enter** after each:

```bash
git init
```
> You'll see: `Initialized empty Git repository in ...`

```bash
git add .
```
> This stages all your files. No output is normal.

```bash
git commit -m "Initial commit — ProExpress website"
```
> You'll see a list of files being committed.

```bash
git branch -M main
```

Now go back to the GitHub page you left open in your browser. Copy the line that looks like:

```bash
git remote add origin https://github.com/YOUR-USERNAME/proexpress-website.git
```

Paste it into your Terminal and press **Enter**.

Then type:

```bash
git push -u origin main
```

> GitHub may ask you to log in. A browser window will open asking you to authorize Git. Click **"Authorize git-ecosystem"** or enter your GitHub password.

When it finishes, you'll see something like:
```
Branch 'main' set up to track remote branch 'main' from 'origin'.
```
✅ **Your code is now on GitHub!**

To confirm: Go back to your GitHub tab and refresh the page. You should see all your project files listed.

---

## 5. Step 4 — Create a Free Vercel Account {#5-create-vercel-account}

1. Go to: **https://vercel.com/signup**
2. Click **"Continue with GitHub"** — this links your GitHub account so Vercel can access your code.
3. A GitHub authorization page appears. Click **"Authorize Vercel"**.
4. You'll be asked about your use case. Select **"Personal"** and click **"Continue"**.
5. You're now on the Vercel dashboard. ✅

---

## 6. Step 5 — Import Your GitHub Repo into Vercel & Deploy {#6-import-and-deploy}

### 6a. Import the Repository

1. On the Vercel dashboard, click the **"Add New…"** button (top right), then click **"Project"**.
2. You'll see a list of your GitHub repositories. Find **`proexpress-website`** and click **"Import"** next to it.
   > If you don't see your repository, click **"Adjust GitHub App Permissions"** and grant Vercel access to it.

### 6b. Configure the Project

On the **"Configure Project"** screen:

- **Project Name:** `proexpress-website` (or whatever you like — this is Vercel-internal only)
- **Framework Preset:** Vercel should auto-detect **Next.js**. ✅ Leave it.
- **Root Directory:** Leave as `./ ` (default)
- **Build Command:** Leave as default (`next build`)
- **Output Directory:** Leave as default
- **Install Command:** Change this to `yarn install` (important — the project uses Yarn, not npm)

> ⚠️ **Do NOT click Deploy yet.** You need to add environment variables first (next step).

### 6c. Add Environment Variables BEFORE First Deploy

Scroll down to the **"Environment Variables"** section. You'll see two text boxes: **Name** and **Value**.

Add each variable below, one at a time. Type the Name in the left box, the Value in the right box, then click **"Add"**:

> 🔴 These are required — the site will not work without them.

| Name | Value to Enter |
|------|----------------|
| `MONGODB_URI` | Your Atlas connection string from Step 1e (e.g. `mongodb+srv://proexpressadmin:Password@cluster.mongodb.net/...`) |
| `ADMIN_PASSWORD` | A strong password of your choice for the `/admin` dashboard (e.g. `ProExpress$2025!`) |
| `NEXT_PUBLIC_BASE_URL` | Your future website URL (e.g. `https://www.proexpressinc.com`) — use a placeholder like `https://proexpress.vercel.app` for now |

> 🟡 These are for email notifications (can be added later — the site saves leads to the database even without email configured):

| Name | Value to Enter |
|------|----------------|
| `SMTP_HOST` | Your email provider's SMTP server (e.g. `mail.proexpressinc.com` for HostPapa) |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Your email address (e.g. `dispatch@proexpressinc.com`) |
| `SMTP_PASS` | Your email account password |
| `SMTP_FROM` | Display name + email (e.g. `ProExpress <dispatch@proexpressinc.com>`) |
| `NOTIFY_EMAIL` | The email address that receives lead notifications (e.g. `owner@proexpressinc.com`) |

> 🟢 This is for Google Analytics (optional — leave blank if you don't have a GA account yet):

| Name | Value to Enter |
|------|----------------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Your GA4 Measurement ID (format: `G-XXXXXXXXXX`) — leave blank for now |

After adding all variables, click the **"Deploy"** button.

### 6d. Wait for the Build

Vercel will now build and deploy your site. You'll see a real-time build log.

> ⏳ The first build takes about **2–4 minutes**.

A **successful build** ends with a large **"Congratulations!"** screen and a URL like `https://proexpress-website.vercel.app`.

Click **"Visit"** to open your live site! 🎉

> If the build fails, check the [Troubleshooting section](#12-troubleshooting) at the bottom of this guide.

---

## 7. Step 6 — Add All Environment Variables in Vercel (After Deploy) {#7-environment-variables}

If you need to add or change environment variables after the first deploy:

1. Go to **https://vercel.com/dashboard**
2. Click on your project (`proexpress-website`)
3. Click **"Settings"** in the top navigation bar
4. Click **"Environment Variables"** in the left sidebar
5. To add a new variable: type the **Name**, type the **Value**, make sure all three environment boxes are checked (**Production**, **Preview**, **Development**), and click **"Save"**
6. To edit an existing variable: click the **three-dot menu (⋮)** next to it, then click **"Edit"**
7. ⚠️ **After changing any variable, you must redeploy** for the change to take effect. See [Step 10](#11-redeploy) for how to redeploy.

### Complete Variable Reference

Here is every environment variable the ProExpress app uses:

```
# ─── REQUIRED ────────────────────────────────────────────────────────────────

MONGODB_URI          = mongodb+srv://user:password@cluster.mongodb.net/proexpress
                       (Your MongoDB Atlas connection string)

ADMIN_PASSWORD       = YourStrongPassword123!
                       (Password to log in to the /admin dashboard)

NEXT_PUBLIC_BASE_URL = https://www.proexpressinc.com
                       (Your live domain — update after DNS is set up)

# ─── EMAIL NOTIFICATIONS (optional but recommended) ──────────────────────────

SMTP_HOST            = mail.proexpressinc.com
                       (Your mail server — HostPapa uses: mail.YOURDOMAIN.com)

SMTP_PORT            = 587

SMTP_USER            = dispatch@proexpressinc.com
                       (Email address that SENDS notifications)

SMTP_PASS            = YourEmailPassword
                       (Password for the sending email account)

SMTP_FROM            = ProExpress Dispatch <dispatch@proexpressinc.com>

NOTIFY_EMAIL         = owner@proexpressinc.com
                       (Where lead notifications are RECEIVED — can be Gmail)

# ─── GOOGLE ANALYTICS (optional) ─────────────────────────────────────────────

NEXT_PUBLIC_GA_MEASUREMENT_ID = G-XXXXXXXXXX
                                (From your GA4 property settings)
```

> 💡 **HostPapa SMTP Tip:** Log in to your HostPapa cPanel → **Email Accounts** → Create an email address (e.g. `dispatch@proexpressinc.com`) → Note the **Mail Server** value shown (usually `mail.yourdomain.com`) — use that as `SMTP_HOST`.

---

## 8. Step 7 — Add a Custom Domain in Vercel {#8-custom-domain}

By default your site lives at `proexpress-website.vercel.app`. This step connects it to your real domain (e.g. `www.proexpressinc.com`).

1. In Vercel, open your project.
2. Click **"Settings"** → **"Domains"**.
3. In the text box, type your domain: `proexpressinc.com` and click **"Add"**.
4. Vercel will ask: **"Add www.proexpressinc.com?"** — Click **"Add www.proexpressinc.com"** so both the root domain and `www` version work.
5. You'll now see two domain entries, each with a status of **"Invalid Configuration"** and a red ✗. That's expected — you haven't updated your DNS yet.

### Note the DNS Records Vercel Needs

Vercel will show you specific DNS records to add. They'll look like one of these two options:

**Option A — Nameservers (simplest, lets Vercel manage everything):**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B — A Record + CNAME (keeps DNS at HostPapa):**
```
Type: A      Name: @      Value: 76.76.21.21
Type: CNAME  Name: www    Value: cname.vercel-dns.com
```

> 💡 **Which option should I use?** If your domain is used ONLY for this website with no other services (no email hosted at HostPapa, no subdomains), use **Option A (Nameservers)** — it's simpler. If you have email or other services on the domain through HostPapa, use **Option B (A Record + CNAME)** to avoid disrupting them.

Keep the Vercel Domains page open while you complete the next step.

---

## 9. Step 8 — Update DNS Settings on HostPapa {#9-hostpapa-dns}

### How to Log In to HostPapa

1. Go to: **https://www.hostpapa.com**
2. Click **"Login"** in the top right corner.
3. Enter your HostPapa account email and password.
4. You'll arrive at your **HostPapa Account Dashboard**.

---

### Option A — Using Nameservers (Simplest)

> ⚠️ Only use this if you do NOT have email or other services hosted at HostPapa.

1. In your HostPapa dashboard, click on **"Domains"** in the left sidebar.
2. Find your domain (`proexpressinc.com`) and click **"Manage"** next to it.
3. Look for a section called **"Nameservers"** or **"DNS Management"** and click it.
4. You'll see a box with current nameservers (probably showing HostPapa's own nameservers).
5. Look for a button or link that says **"Use Custom Nameservers"** or **"Change Nameservers"** and click it.
6. **Delete** the existing nameserver entries.
7. **Add two new entries:**
   - **Nameserver 1:** `ns1.vercel-dns.com`
   - **Nameserver 2:** `ns2.vercel-dns.com`
8. Click **"Save"** or **"Update Nameservers"**.

> ⏳ **Propagation time:** Nameserver changes take **24–48 hours** to fully propagate worldwide. Most regions update within 1–4 hours.

---

### Option B — A Record + CNAME (Keeps Email Working)

> Use this if you have HostPapa email on this domain.

1. In your HostPapa dashboard, click **"Domains"** → find your domain → click **"Manage"**.
2. Click **"DNS Management"** or **"Advanced DNS"**.
3. You'll see a table of DNS records. You need to **edit or add** two records:

**Record 1 — A Record (for the root domain `proexpressinc.com`):**

- Look for an existing **A record** where **Name/Host** is `@` or blank.
- Click **"Edit"** next to it.
- Change the **Value / Points To** field to: `76.76.21.21`
- Set **TTL** to `3600` (or "1 Hour")
- Click **"Save"**.
- If there is no existing A record, click **"Add Record"**, select **Type: A**, set Name to `@`, Value to `76.76.21.21`, and save.

**Record 2 — CNAME Record (for `www.proexpressinc.com`):**

- Look for an existing **CNAME record** where **Name/Host** is `www`.
- Click **"Edit"** next to it.
- Change the **Value / Points To** field to: `cname.vercel-dns.com`
- Set **TTL** to `3600`
- Click **"Save"**.
- If there is no `www` CNAME, click **"Add Record"**, select **Type: CNAME**, set Name to `www`, Value to `cname.vercel-dns.com`, and save.

> ⏳ **Propagation time:** A Record + CNAME changes take **1–4 hours** (sometimes up to 24 hours) to take effect worldwide.

---

### How to Know DNS Is Working

1. Go back to **Vercel → Settings → Domains**.
2. Wait and refresh the page every 30 minutes.
3. When DNS has propagated, the red ✗ next to your domain will change to a green ✓ and the status will say **"Valid Configuration"**.
4. You can also check propagation status at: **https://dnschecker.org** — enter your domain and look for green checkmarks spreading around the globe.

---

## 10. Step 9 — Verify the Live Site & Test All Features {#10-verify-live-site}

Once your domain shows green ✓ in Vercel, test every part of your site:

### Checklist — Frontend Pages

Open each URL in your browser and confirm it loads:

| Page | URL to Visit |
|------|-------------|
| Home | `https://www.proexpressinc.com` |
| Services | `https://www.proexpressinc.com/services` |
| About | `https://www.proexpressinc.com/about` |
| Tracking | `https://www.proexpressinc.com/tracking` |
| Quote | `https://www.proexpressinc.com/quote` |
| Contact | `https://www.proexpressinc.com/contact` |
| FAQ | `https://www.proexpressinc.com/faq` |

### Checklist — API Endpoints

Test these in your browser address bar:

| Test | URL | Expected Result |
|------|-----|-----------------|
| Health check | `https://www.proexpressinc.com/api/health` | Should show `{"status":"ok"}` |
| Sitemap | `https://www.proexpressinc.com/sitemap.xml` | Should show XML with your 7 page URLs |
| Robots | `https://www.proexpressinc.com/robots.txt` | Should show robot rules |

### Checklist — Form Submissions

1. Go to the **Quote page** and fill in the form completely. Click **"Request My Quote"**.
   - You should see a green success message. ✅
2. Go to the **Contact page** and fill in the form. Click **"Send Message"**.
   - You should see a success message. ✅
3. Go to `https://www.proexpressinc.com/admin` and log in with your `ADMIN_PASSWORD`.
   - You should see both submissions appear in the dashboard. ✅

### Checklist — Cookie Consent Banner

1. Open your site in a **private/incognito browser window** (so localStorage is clear).
2. After about 1 second, a dark banner should appear at the bottom of the page with "Accept" and "Decline" options. ✅

---

## 11. Step 10 — How to Redeploy After Making Code Changes {#11-redeploy}

Every time you change your website code, you need to push those changes to GitHub and Vercel will automatically redeploy.

### Redeploy After a Code Change

Open Terminal/Command Prompt in your project folder and run:

```bash
git add .
git commit -m "Describe what you changed (e.g. updated contact page)"
git push
```

That's it! Vercel detects the push automatically and rebuilds your site within **2–3 minutes**. You can watch the build progress at **https://vercel.com/dashboard → your project → Deployments tab**.

### Redeploy After Changing an Environment Variable

1. Go to Vercel Dashboard → your project → **Settings → Environment Variables**
2. Add or edit the variable and save
3. Go to the **Deployments tab**
4. Click the **three-dot menu (⋮)** next to the most recent deployment
5. Click **"Redeploy"** → **"Redeploy"** (confirm)

> ⚠️ Environment variable changes do NOT take effect until you redeploy — the code must be rebuilt to pick up the new values.

### Rollback to a Previous Version

If something goes wrong after a redeploy:

1. Go to Vercel Dashboard → your project → **Deployments tab**
2. Find a previous deployment that was working (they're listed in chronological order)
3. Click the **three-dot menu (⋮)** next to it
4. Click **"Promote to Production"** — your live site instantly rolls back. ✅

---

## 12. Troubleshooting — 3 Most Common Deployment Errors {#12-troubleshooting}

---

### ❌ Error 1: Build Fails — "Module not found" or "Cannot find module"

**What it looks like in the Vercel build log:**
```
Error: Cannot find module '@/components/AnimatedSection'
Module not found: Error: Can't resolve 'framer-motion'
```

**Why it happens:** A required package is missing from `package.json`, or a file path is wrong.

**How to fix it:**

1. Look at the exact module name in the error.
2. Open your project folder on your computer.
3. Open Terminal/Command Prompt in the project folder and run:
   ```bash
   yarn add [module-name]
   ```
   Replace `[module-name]` with what the error says (e.g. `yarn add framer-motion`).
4. Then redeploy:
   ```bash
   git add .
   git commit -m "Fix missing dependency"
   git push
   ```

**If the error mentions a file path** (e.g. `@/components/SomePage`), the file may have been accidentally deleted or renamed. Check that the file exists in the correct location.

---

### ❌ Error 2: Site Deploys But Shows "Application Error" or "500 Internal Server Error" on Pages That Use the Database

**What it looks like:** The site loads but when you submit a form or visit the admin page, you see a generic error page or the API returns `500`.

**Why it happens:** The `MONGODB_URI` environment variable is missing, wrong, or the database hasn't allowed access from all IPs.

**How to fix it — Step by Step:**

**Check 1: Verify the environment variable exists**
1. Vercel → your project → **Settings → Environment Variables**
2. Confirm `MONGODB_URI` is listed and the value starts with `mongodb+srv://`
3. Make sure there are **no spaces** before or after the value
4. Confirm the password in the connection string does **not** contain special characters like `@`, `/`, or `:` — if it does, you need to [URL-encode them](https://www.urlencoder.org/)

**Check 2: Allow all IPs in Atlas**
1. Log in to **https://cloud.mongodb.com**
2. Click **"Network Access"** in the left sidebar (under Security)
3. If you see an IP address listed that is NOT `0.0.0.0/0`, click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** → click **"Confirm"**
5. Go back to Vercel and **redeploy** (Deployments → three-dot menu → Redeploy)

**Check 3: Verify database user credentials**
1. In Atlas, click **"Database Access"** in the left sidebar
2. Find the user `proexpressadmin` and confirm it has **"Read and Write to any database"** permissions
3. If in doubt, click **"Edit"** and reset the password, then update `MONGODB_URI` in Vercel

---

### ❌ Error 3: Domain Shows "Vercel: This domain is not configured" or HTTPS Certificate Error

**What it looks like:** You visit `www.proexpressinc.com` and see a Vercel error page saying the domain isn't configured, or your browser shows "Your connection is not private."

**Why it happens:** DNS hasn't fully propagated yet, or the DNS records were entered incorrectly in HostPapa.

**How to fix it — Step by Step:**

**Check 1: Verify propagation status**
1. Go to: **https://dnschecker.org**
2. Type your domain (e.g. `www.proexpressinc.com`) and press Enter
3. If you see mostly red ✗ marks, DNS is still propagating — **wait another 1–2 hours** and check again
4. If you see green ✓ marks worldwide, the issue is something else — continue to Check 2

**Check 2: Verify your DNS records in HostPapa**

For **Option B (A Record + CNAME)**:
1. Log in to HostPapa → Domains → Manage → DNS Management
2. Confirm you have:
   - An **A record** where Name is `@` and Value is exactly `76.76.21.21`
   - A **CNAME record** where Name is `www` and Value is exactly `cname.vercel-dns.com`
3. ⚠️ A common mistake: some HostPapa interfaces require the CNAME value to end with a period: `cname.vercel-dns.com.` — try adding the period if it's not working.

**Check 3: Force an SSL certificate reissue in Vercel**
1. Vercel → your project → **Settings → Domains**
2. Click the **three-dot menu (⋮)** next to your domain
3. Click **"Refresh"** or **"Renew Certificate"**
4. Wait 5 minutes and try visiting your domain again

**Check 4: Clear your browser cache**
Your browser may have cached the old (non-working) version of your site.
1. Press **Ctrl+Shift+Delete** (Windows) or **Command+Shift+Delete** (Mac)
2. Select **"Cached images and files"** and click **"Clear data"**
3. Try visiting your site again, or open an **Incognito / Private window**

---

## Quick Reference Card

Save or print this for day-to-day use:

```
┌─────────────────────────────────────────────────────┐
│           PROEXPRESS DEPLOYMENT CHEAT SHEET          │
├─────────────────────────────────────────────────────┤
│ Deploy code change:                                  │
│   git add .                                          │
│   git commit -m "your message"                       │
│   git push                                           │
│   → Vercel auto-builds in 2-3 min                    │
├─────────────────────────────────────────────────────┤
│ Admin dashboard:   yoursite.com/admin                │
│ Health check:      yoursite.com/api/health           │
│ Sitemap:           yoursite.com/sitemap.xml          │
├─────────────────────────────────────────────────────┤
│ Vercel Dashboard:  https://vercel.com/dashboard      │
│ Atlas Dashboard:   https://cloud.mongodb.com         │
│ DNS Checker:       https://dnschecker.org            │
└─────────────────────────────────────────────────────┘
```

---

*Guide last updated: June 2025. This guide is written specifically for the ProExpress Next.js + MongoDB website. For general Vercel documentation, visit https://vercel.com/docs*
