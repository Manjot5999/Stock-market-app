import axios from 'axios';
import Papa from 'papaparse';

export async function getActiveNameFromCSV(symbol) {
  try {
    const response = await axios.get('/Stock_List.csv'); // Remove '/public'
    const parsedData = Papa.parse(response.data, { header: true }).data;

    const filteredRows = parsedData.filter(row => row.symbol === symbol && row.status === 'Active');

    if (filteredRows.length > 0) {
      return filteredRows[0].name;
    } else {
      return "No active record found for the given symbol";
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
