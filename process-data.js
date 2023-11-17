export default function processData(covidData, filterByDate = false){
    if (filterByDate) {
        displayFilterStats(covidData)
    } else {
        displayStats(covidData)
    }
}
const covidStats = document.getElementById('covidStats')
const covidStatsBody = covidStats.getElementsByTagName('tbody')[0]
const covidTable = document.getElementById('covidTable');
const covidTableBody = covidTable.getElementsByTagName('tbody')[0]
const covidTableBody2 = covidTable.getElementsByTagName('tbody')[1]

function displayStats(covidData) {
    covidData.forEach(countryData => {
        // Get the country name and the time of the last update
        const country = countryData.country;
        const statistics = countryData.statistics
    
        // const firstTime = statistics[0].time;
        const lastTime = statistics[statistics.length - 1].time;
      
        // Get the total cases, deaths, and recoveries for each country
        const totalCases = countryData.statistics.reduce((total, stats) => total + stats.cases, 0);
        const totalDeaths = countryData.statistics.reduce((total, stats) => total + stats.deaths, 0);
        const totalRecoveries = countryData.statistics.reduce((total, stats) => total + stats.recoveries, 0);
      
        const row = covidStatsBody.insertRow();
        const cellCountry = row.insertCell(0);
        const cellTime = row.insertCell(1)
        const cellCases = row.insertCell(2);
        const cellDeaths = row.insertCell(3);
        const cellRecoveries = row.insertCell(4);
      
        cellCountry.innerHTML = country;
        cellTime.innerHTML = lastTime;
        cellCases.innerHTML = totalCases;
        cellDeaths.innerHTML = totalDeaths;
        cellRecoveries.innerHTML = totalRecoveries;
    });
}

function displayFilterStats(covidData) {
    covidData.forEach(countryData => {

        const country = countryData.country;
        
        countryData.statistics.forEach(stats => {
            const time = stats.time;
            const cases = stats.cases;
            const deaths = stats.deaths;
            const recoveries = stats.recoveries;

            const row = covidTableBody.insertRow();
            const cellCountry = row.insertCell(0);
            const cellTime = row.insertCell(1)
            const cellCases = row.insertCell(2);
            const cellDeaths = row.insertCell(3);
            const cellRecoveries = row.insertCell(4);

            cellCountry.textContent = country;
            cellTime.textContent = time;
            cellCases.textContent = cases;
            cellDeaths.textContent = deaths;
            cellRecoveries.textContent = recoveries;
        });
    });
}