// =============================================================================
// Saif Knowledge Hub - Google Sheets Admission Database Script
// =============================================================================
// This Google Apps Script receives student registrations and inquiries from 
// the website and appends them automatically as new rows in your Google Sheet.
//
// QUICK 2-MINUTE SETUP:
// 1. Open Google Sheets (https://sheets.new) and create a new spreadsheet.
//    Name it e.g. "Saif Knowledge Hub - Student Registrations".
// 2. Click on "Extensions" in the top menu -> "Apps Script".
// 3. Delete any code in the editor, paste this entire script, and click Save (Ctrl+S).
// 4. Click the blue "Deploy" button (top right) -> "New deployment".
// 5. Click the gear icon next to "Select type" -> select "Web app".
// 6. Set Description: "SKH Admissions API"
// 7. Set "Execute as": "Me"
// 8. Set "Who has access": "Anyone"  <-- CRITICAL for website submissions!
// 9. Click "Deploy" -> Authorize access with your Google account.
// 10. Copy the "Web app URL" (starts with https://script.google.com/macros/s/...)
// 11. Paste that URL in your website's Database Settings or in index.html!
// =============================================================================

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other processes to finish
  lock.tryLock(10000);
  
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();
    
    // If the sheet is empty, create formatted header row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Student Name",
        "WhatsApp / Phone",
        "Course",
        "Email",
        "Shift",
        "Mode of Study",
        "City / Remarks",
        "Source"
      ]);
      
      // Style headers: Navy background, White bold text
      var headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0b192c");
      headerRange.setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }
    
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        data = e.parameter;
      }
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var now = new Date();
    var formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    
    var newRow = [
      formattedDate,
      data.name || data.student_name || "Guest Student",
      data.phone || data.whatsapp || "N/A",
      data.course || "General Inquiry",
      data.email || "-",
      data.shift || "Morning / Flexible",
      data.mode || "On-Campus Lab",
      data.notes || data.city || "-",
      data.source || "Website Registration"
    ];
    
    sheet.appendRow(newRow);
    
    // Auto-fit columns for clean view
    for (var col = 1; col <= 9; col++) {
      sheet.autoResizeColumn(col);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "success", 
        message: "Registration successfully recorded in Google Sheets!",
        timestamp: formattedDate
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "error", 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Saif Knowledge Hub Google Sheets API is running smoothly.");
}
