/*

Helper script to handle application user interactions

*/

function openPassWindow() {
    newPassWindow = window.open('add_password.html', 'Add New Password');
}

function addRow() {

    website = document.getElementById("website-input")
    username = document.getElementById("username-input")
    pw = document.getElementById("pw-input")
    last_updated = "Now"


    const table = document.getElementById("password-table");

    const newRowHTML = `<tr><td>${website}</td><td>${username}</td><td>${pw}</td><td>${last_updated}</td></tr>`;
    table.insertAdjacentHTML("beforeend", newRowHTML);

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