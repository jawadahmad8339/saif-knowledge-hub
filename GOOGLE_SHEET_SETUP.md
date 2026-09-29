# Connecting Saif Knowledge Hub Website to Google Sheets (Database)

This guide shows you how to connect your website to a Google Sheet so every time a student registers or submits an inquiry, their name, WhatsApp number, and selected course are saved as a new row in your Google Sheet in real time.

---

### Step 1: Create a Google Sheet
1. Open [Google Sheets](https://sheets.new).
2. Name your spreadsheet: **`Saif Knowledge Hub - Student Registrations`**.

---

### Step 2: Add the Google Apps Script
1. In the top menu of your Google Sheet, click **Extensions** > **Apps Script**.
2. Erase any code inside `Code.gs`.
3. Open [`google-apps-script.js`](./google-apps-script.js) from this folder, copy all the code, and paste it into the editor.
4. Click the **Save** disk icon (or press `Ctrl + S`).

---

### Step 3: Deploy as a Web App
1. Click the blue **Deploy** button (top right) > select **New deployment**.
2. Click the gear icon ⚙ next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description**: `SKH Admission API`
   - **Execute as**: `Me (your email)`
   - **Who has access**: **`Anyone`** *(Important: Must be set to Anyone so website visitors can submit)*
4. Click **Deploy**.
5. Google will ask you to authorize permissions:
   - Click **Authorize access** > select your Google account.
   - Click **Advanced** (small text) > **Go to Untitled project (unsafe)**.
   - Click **Allow**.
6. Copy the **Web app URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

### Step 4: Paste the URL in Your Website
1. On your website, scroll to the footer and click **"Admissions Database"** (or click the database icon).
2. Click **"Google Sheet Settings"** and paste your Web App URL into the box.
3. Click **Save Webhook URL**.

All incoming student enrollments and inquiries will now automatically save directly into your Google Sheet!
