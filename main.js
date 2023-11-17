import './style.css'
import covidData from './covid-data'
import processData from './process-data.js'

processData(covidData)

// Get references to elements
const filterStatsButton = document.getElementById('filterStats')
const fullStatsButton = document.getElementById('fullStats')
const fullStats = document.querySelector('.fullStats')
const filterStats = document.querySelector('.filterStats')
const countryFilterInput = document.getElementById('countryFilter');
const filterByDate = document.getElementById('dateFilter');
const covidTable = document.getElementById('covidTable');
const covidTableBody2 = covidTable.getElementsByTagName('tbody')[1]

filterStatsButton.addEventListener('click', showFilterStats)
fullStatsButton.addEventListener('click', showFullStats)

function showFilterStats() {
  fullStats.style.display = 'none'
  filterStats.style.display = 'block'
  processData(covidData, true)
}

function showFullStats() {
  fullStats.style.display = 'block'
  filterStats.style.display = 'none'
}

// Add an event listener to the input field
countryFilterInput.addEventListener('input', function () {
  // Get the user's input and convert it to lowercase for case-insensitive matching
  const inputText = countryFilterInput.value.toLowerCase();

  // Loop through the table rows to find a matching country
  const rows = covidTable.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const countryName = row.cells[0].textContent.toLowerCase();
      
      if (countryName.includes(inputText)) {
      row.style.display = ''; // Display the row if it matches
      } else {
      row.style.display = 'none'; // Hide the row if it doesn't match
      }
  }
});

filterByDate.addEventListener('change', filterTable)

function filterTable() {
  covidTableBody2.style.display = 'block'
  console.log(covidTableBody2.style.display)
  // Get the selected month and year
  const selectedDate = (new Date(filterByDate.value)).toLocaleDateString();
  console.log(selectedDate)

  // Loop through the table rows to filter based on month and year
  const filteredRows = covidTable.getElementsByTagName('tr');
  for (let i = 1; i < filteredRows.length; i++) {
    const filteredRow = filteredRows[i];
    const dateCell = (new Date(filteredRow.cells[1].textContent)).toLocaleDateString()
    
    if (
      (selectedDate === dateCell || filterByDate.value === '0')
    ) {
      filteredRow.style.display = '';
    } else {
      filteredRow.style.display = 'none';
    }
  }
}

const table = document.querySelectorAll('table');
const headers = table.querySelectorAll('.sortable-header');
const dataRows = table.querySelector('tbody').rows;

let currentSortKey = 'country';
let sortDirection = 'asc';

function sortTable() {
  const key = currentSortKey;
  const order = sortDirection === 'asc' ? 1 : -1;
  
  const sortedRows = Array.from(dataRows);
  sortedRows.sort((a, b) => {
    const aValue = a.getAttribute(`data-${key}`);
    const bValue = b.getAttribute(`data-${key}`);
    return (aValue > bValue ? 1 : -1) * order;
  });

  // Clear the table body
  const tbody = table.querySelector('tbody');
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  // Append sorted rows back to the table
  sortedRows.forEach(row => {
    tbody.appendChild(row);
  });
}

// Add click event listeners to the sortable headers
headers.forEach(header => {
  header.addEventListener('click', () => {
    const key = header.getAttribute('data-sort');
    
    if (key === currentSortKey) {
      // Toggle sorting direction
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set new sorting key
      currentSortKey = key;
      sortDirection = 'asc';
    }
    
    // Update sorting indicator in the headers
    headers.forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
    header.classList.add(sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
    
    // Sort and refresh the table
    sortTable();
  });
});

// Initial sort on load
sortTable();
