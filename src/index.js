/*

Helper script to handle application user interactions

*/

function openPassWindow() {
    console.log("window opened")
    newPassWindow = window.open('add_password.html', 'Add New Password');
}

function addRow() {

    console.log("adding row")

    website = document.getElementById("website-input").value
    username = document.getElementById("username-input").value
    pw = document.getElementById("pw-input").value
    last_updated = "Now"

    passTable = document.getElementById("password-table");
    console.log(passTable)


    const newRow = document.createElement('tr');
    newRow.innerHTML = `<tr><td>${website}</td><td>${username}</td><td>${pw}</td><td>${last_updated}</td></tr>`;

    tableBody.appendChild(newRow);

    const newRowHTML = `<tr><td>${website}</td><td>${username}</td><td>${pw}</td><td>${last_updated}</td></tr>`;

    passTable.insertAdjacentHTML("beforeend", newRowHTML);

    // Write to database

    newPassWindow.close('add_password.html');
}

function deleteRow() {
    const table = document.getElementById("password-table");

    function deleteThisRow(button) {
        button.closest('tr').remove();
    }
}

function passwordVisibility() {
  var x = document.getElementById("pw-input");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

/*
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

function fetchData() {
    fetch('http://localhost:3000/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response failure');
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error fetching database items:', error);
        });
}

function displayData(credentials) {
    const tableBody = document.getElementById('pass-table-body');
    tableBody.innerHTML = ''; 

    credentials.forEach(c => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${credentials.website}</td>
            <td>${credentials.username}</td>
            <td>$${credentials.pasword}</td>
            <td>$${credentials.lastUpdated}</td>
        `;

        tableBody.appendChild(row);
    });
}*/
