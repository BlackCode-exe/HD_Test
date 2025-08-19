
function toggleMode() {
    const body = document.body;
    const toggle = document.getElementById("modeToggle");
    body.classList.toggle("dark-mode");
    toggle.innerHTML = body.classList.contains("dark-mode") ? "🌙" : "🌞";
}

document.getElementById('modeToggle').addEventListener('click', toggleMode);


const chartOptions = {
    responsive: true,
    animation: {
        duration: 1500,
        easing: 'easeOutQuart'
    },
    interaction: {
        mode: 'nearest',
        axis: 'y',
        intersect: false
    },
    plugins: {
        tooltip: {
            enabled: true,
            backgroundColor: '#222',
            titleColor: '#fff',
            bodyColor: '#fff',
            cornerRadius: 4,
            padding: 10,
            titleFont: { weight: 'bold' },
            bodyFont: { size: 13 }
        },
        legend: { display: false }
    },
    scales: {
        x: { grid: { display: false } },
        y: { grid: { display: false } }
    },
    indexAxis: 'y'
};

// Chart 1: By Building
new Chart(document.getElementById('buildingChart'), {
    type: 'bar',
    data: {
        labels: ['Bed & Breakfast', 'Cinema', 'Diner', 'Gift Shop', 'Grocery Store', 'Spa'],
        datasets: [{
            label: 'Visitors',
            data: [5, 5, 6, 5, 13, 8],
            backgroundColor: 'steelblue'
        }]
    },
    options: chartOptions
});

// Chart 2: By Townie Type
new Chart(document.getElementById('townieChart'), {
    type: 'bar',
    data: {
        labels: ['Actress', 'Cowboy', 'Dancer', 'Local', 'Mechanic', 'Old man', 'Sales', 'Strongman', 'Teacher', 'Tourist'],
        datasets: [{
            label: 'Visitors',
            data: [5, 8, 3, 3, 4, 5, 4, 4, 2, 4],
            backgroundColor: 'orange'
        }]
    },
    options: chartOptions
});

// Chart 3: Cross Table
new Chart(document.getElementById('crossChart'), {
    type: 'bar',
    data: {
        labels: ['Actress', 'Cowboy', 'Dancer', 'Local', 'Mechanic', 'Old man', 'Sales', 'Strongman', 'Teacher', 'Tourist'],
        datasets: [
            { label: 'Bed & Breakfast', data: [0, 1, 1, 0, 0, 0, 0, 1, 0, 2], backgroundColor: '#4e79a7' },
            { label: 'Cinema', data: [1, 0, 0, 1, 1, 2, 0, 0, 0, 0], backgroundColor: '#f28e2b' },
            { label: 'Diner', data: [1, 2, 0, 1, 0, 0, 1, 0, 0, 1], backgroundColor: '#e15759' },
            { label: 'Gift Shop', data: [0, 0, 2, 0, 1, 1, 0, 0, 1, 0], backgroundColor: '#76b7b2' },
            { label: 'Grocery Store', data: [2, 3, 0, 1, 1, 1, 2, 1, 1, 1], backgroundColor: '#59a14f' },
            { label: 'Spa', data: [1, 2, 0, 0, 1, 1, 1, 2, 0, 0], backgroundColor: '#edc949' }
        ]
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        scales: {
            x: { stacked: true, grid: { display: false } },
            y: { stacked: true, grid: { display: false } }
        },
        animation: chartOptions.animation,
        plugins: chartOptions.plugins,
        interaction: chartOptions.interaction
    }
});


document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});


function setupTableFilter(inputId, tableIndex) {
    const input = document.getElementById(inputId);
    input.addEventListener("input", function () {
        const filter = input.value.toUpperCase();
        const table = document.getElementsByTagName("table")[tableIndex];
        const trs = table.getElementsByTagName("tr");
        let hasFilter = filter.length > 0;

        for (let i = 1; i < trs.length; i++) {
            const row = trs[i];
            const tds = row.getElementsByTagName("td");

            if (tds.length === 0) continue;

            const isTotalRow = tds[0].textContent.trim().toUpperCase().includes("TOTAL");

            if (isTotalRow) {
                row.style.display = hasFilter ? "none" : "";
                continue;
            }

            const match = Array.from(tds).some(td =>
                td.textContent.toUpperCase().includes(filter)
            );
            row.style.display = match ? "" : "none";
        }
    });
}


window.addEventListener("DOMContentLoaded", () => {
    setupTableFilter("searchBuilding", 0);
    setupTableFilter("searchTownie", 1);
    setupTableFilter("searchCross", 2);
});