import { google } from 'googleapis';

export default async function getDataSet() {
  console.log("Running getDataSet()")
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      undefined,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    )
    // let ranges = ["Asset Name", "Lat", "Long", "Business Category", "Risk Rating", "Risk Factors", "Year"]
    const sheets = google.sheets({ version: 'v4', auth: jwt})
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'sample_data'
    });
    // console.log("response", response.data.values)
    return response.data.values;
  } catch(err) {
    console.log(err)
  }
}