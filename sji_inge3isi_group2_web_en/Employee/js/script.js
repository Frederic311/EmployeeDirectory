var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  userName = document.getElementById("name"),
  phone = document.getElementById("phone"),
  activity = document.getElementById("activity"),
  sector = document.getElementById("Sector"),
  email = document.getElementById("email"),
  Region = document.getElementById("Region"),
  department = document.getElementById("Department"),
  district = document.getElementById("District"),
  neighborhood = document.getElementById("Neighborhood"),
  pLocation = document.getElementById("pLocation"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title"),
  newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', () => {
  submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
  isEdit = false
  imgInput.src = "../images/Profile Icon.webp"
  form.reset()
})


file.onchange = function () {
  if (file.files[0].size < 5000000) {  // 5MB = 5000000
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      imgUrl = e.target.result
      imgInput.src = imgUrl
    }

    fileReader.readAsDataURL(file.files[0])
  }
  else {
    alert("This file is too large!")
  }
}


function showInfo() {
  // Clear existing employee details
  document.querySelectorAll('.employeeDetails').forEach(info => info.remove());

  // Use getData directly for all pills
  getData.forEach((element, index) => {
    let createElement = `
      <tr class="employeeDetails">
        <td>${index + 1}</td>
        <td><img src="${element.picture}" alt="" width="50" height="50"></td>
        <td>${element.employeeName}</td>
        <td>${element.employeeSector}</td>
        <td>${element.employeeActivity}</td>
        <td>${element.employeeEmail}</td>
        <td>${element.employeePhone}</td>
        <td>${element.employeeRegion}</td>
        <td>${element.employeeDepartment}</td>
        <td>${element.employeeDistrict}</td>
        <td>${element.employeeNeighborhood}</td>
        <td>${element.employeepLocation}</td>

        <td>
          <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeeSector}', '${element.employeeActivity}', '${element.employeeRegion}', '${element.employeeDepartment}', '${element.employeeDistrict}','${element.employeeNeighborhood}','${element.employeepLocation}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

          <button class="btn btn-primary" onclick="editInfo('${index}', '${element.picture}', '${element.employeeName}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeeSector}', '${element.employeeActivity}', '${element.employeeRegion}', '${element.employeeDepartment}', '${element.employeeDistrict}','${element.employeeNeighborhood}','${element.employeepLocation}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

          <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>

        </td>
      </tr>`;

    userInfo.innerHTML += createElement;
  });
}
showInfo()



function readInfo(pic, name, email, phone, sector, activity, region, department, district, neighborhood, plocation) {
  document.querySelector('.showImg').src = pic;
  document.querySelector('#showName').value = name;
  document.querySelector("#showEmail").value = email;
  document.querySelector("#showPhone").value = phone;
  document.querySelector("#ShowSector").value = sector;
  document.querySelector("#Showactivity").value = activity;
  document.querySelector("#ShowRegion").value = region;
  document.querySelector("#ShowDepartment").value = department;
  document.querySelector("#ShowDistrict").value = district;
  document.querySelector("#ShowNeighborhood").value = neighborhood;
  document.querySelector("#ShowLocation").value = plocation;
}



function editInfo(index, pic, name, email, phone, sector, activity, region, department, district, neighborhood, plocation) {
  isEdit = true,
    editId = index,
    imgInput.src = pic,
    userName.value = name,
    document.getElementById("email").value = email,
    document.getElementById("phone").value = phone,
    document.getElementById("Sector").value = sector,
    document.getElementById("activity").value = activity,
    Region.value = region,
    Region.length = 1;
  department.value = department,
    district.value = district,
    neighborhood.value = neighborhood,
    pLocation.value = plocation
  updateLocationSelection()



  submitBtn.innerText = "Update"
  modalTitle.innerText = "Update The Form"
}


function deleteInfo(index) {
  //using swalfire for popups
  Swal.fire({
    title: 'Delete Confirmation',
    text: "Are you sure you want to delete this information?",
    icon: 'warning', // Optional icon for warning
    showCancelButton: true,
    confirmButtonColor: '#9844ebef', // Optional: Change confirm button color
    cancelButtonColor: '#d33', // Optional: Change cancel button color
    confirmButtonText: 'Yes, delete' // Customize confirm button text
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed deletion
      getData.splice(index, 1);
      localStorage.setItem("userProfile", JSON.stringify(getData));
      showInfo();
    } else {

    }
  });
}





form.addEventListener('submit', (e) => {
  e.preventDefault();

  const information = {
    picture: imgInput.src == undefined ? "../images/Profile Icon.webp" : imgInput.src,
    employeeName: userName.value,
    employeePhone: phone.value,
    employeeEmail: email.value,
    employeeSector: sector.value,
    employeeActivity: activity.value,
    employeeRegion: Region.value,
    employeeDepartment: department.value,
    employeeDistrict: district.value,
    employeeNeighborhood: neighborhood.value,
    employeepLocation: pLocation.value,
  };

  if (!isEdit) {
    getData.push(information);
    //first show before alert
    showAlert(); // success
  }
  else {
    getData[editId] = information;
    isEdit = false;
  }

  localStorage.setItem('userProfile', JSON.stringify(getData));

  submitBtn.innerText = "Submit";
  modalTitle.innerHTML = "Fill The Form";

  showInfo();

  form.reset();

  imgInput.src = "../images/Profile Icon.webp";
});

//custom alert
function showAlert() {
  Swal.fire({
    title: 'Employee Confirmation',
    text: 'A new employee was created successfully.',
    confirmButtonColor: '#9844ebef',
    buttons: true, // Add a confirm button
  });

}


// This is the js for region selection to precise location
var RegionSatinfo = {
  Center: {
    "Haute-Sanga": {
      Yaounde: {
        Acacia: ["Rond point", "Maison damas"],
        // "Biyem-assi":["lycee biyem assi"],
        Damas: ["Rond1point", "Maison1damas"]
      }

    },
    "Haute-Sanga": {
      Yaounde: {
        Acacia1: ["Rond point", "Maison damas"],
        // "Biyem-assi":["lycee biyem assi"],
        Damas1: ["Rond point", "Maison damas"]
      }

    }

  },

  Littoral: {
    Moungo: {
      Douala: {
        Akwa: {
          Bonajo: ["lycee Akwa"],
          Deido: ["Rond point Deido", "Maison deido"]
        }

      },
      Nkam: {
        Bonaberi: ["Rond point Kadey", "bomba"]
      }
    }
  }
}



function updateLocationSelection() {
  const selectRegion = document.getElementById('Region'),
    selectDepartment = document.getElementById('Department'),
    selectDistrict = document.getElementById('District'),
    selectNeighborhood = document.getElementById('Neighborhood'),
    selectLocation = document.getElementById('pLocation'),
    selects = document.querySelectorAll('select');

  // Disable location select elements initially
  selectDepartment.disabled = true;
  selectDistrict.disabled = true;
  selectNeighborhood.disabled = true;
  selectLocation.disabled = true;

  // Set cursor to default for disabled elements
  selects.forEach(select => {
    if (select.disabled === true) {
      select.style.cursor = "auto";
    }
  });

  // Populate Region select element
  for (let region in RegionSatinfo) {
    selectRegion.options[selectRegion.options.length] = new Option(region, region);
  }

  // Region Change Event Listener
  selectRegion.onchange = (e) => {
    selectDepartment.disabled = false;
    selectDistrict.disabled = true;
    selectNeighborhood.disabled = true;
    selectLocation.disabled = true;

    selectDepartment.length = 1; // Clear previous department options
    selectDistrict.length = 1; // Clear previous district options
    selectNeighborhood.length = 1; // Clear previous neighborhood options
    selectLocation.length = 1; // Clear previous location options

    // Populate Department select element based on selected Region
    for (let department in RegionSatinfo[e.target.value]) {
      selectDepartment.options[selectDepartment.options.length] = new Option(department, department);
    }
  };

  // Department Change Event Listener
  selectDepartment.onchange = (e) => {
    selectDistrict.disabled = false;
    selectNeighborhood.disabled = true;
    selectLocation.disabled = true;

    selectDistrict.length = 1; // Clear previous district options
    selectNeighborhood.length = 1; // Clear previous neighborhood options
    selectLocation.length = 1; // Clear previous location options

    // Populate District select element based on selected Region and Department
    for (let district in RegionSatinfo[selectRegion.value][e.target.value]) {
      selectDistrict.options[selectDistrict.options.length] = new Option(district, district);
    }
  };

  // District Change Event Listener
  selectDistrict.onchange = (e) => {
    selectNeighborhood.disabled = false;
    selectLocation.disabled = true;

    selectNeighborhood.length = 1; // Clear previous neighborhood options
    selectLocation.length = 1; // Clear previous location options

    // Populate Neighborhood select element based on selected Region, Department, and District
    for (let neighborhood in RegionSatinfo[selectRegion.value][selectDepartment.value][e.target.value]) {
      selectNeighborhood.options[selectNeighborhood.options.length] = new Option(neighborhood, neighborhood);
    }
  };

  // Neighborhood Change Event Listener
  selectNeighborhood.onchange = (e) => {
    selectLocation.disabled = false;

    selectLocation.length = 1; // Clear previous location options

    // Populate Location select element based on selected Region, Department, District, and Neighborhood
    const locations = RegionSatinfo[selectRegion.value][selectDepartment.value][selectDistrict.value][e.target.value];
    for (let i = 0; i < locations.length; i++) {
      selectLocation.options[selectLocation.options.length] = new Option(locations[i], locations[i]);
    }
  };
}
updateLocationSelection();
//function to validate phone number
// Get the input field
let phoneInput = document.getElementById('phone');

// Get the error message element
let errorMessage = document.getElementById('error-message');

// Listen for keypress event
phoneInput.addEventListener('keypress', function (e) {
  // Get the key pressed
  let key = e.key;

  // Check if the key is not a digit
  if (!/\d/.test(key)) {
    // Prevent the key from being entered
    e.preventDefault();

    // Display an error message in red
    errorMessage.style.display = 'block';
    errorMessage.style.color = 'red'; // Set the color to red
    errorMessage.innerText = 'Please enter only numbers for the phone number';
  } else {
    // Hide the error message if the key is a digit
    errorMessage.style.display = 'none';
  }
});
//function for searching
// Get the elements
let input = document.querySelector('input[type="search"]');
let table = document.querySelector('table');

// Add an input event listener
input.addEventListener('input', function () {
  // Get the query
  let query = this.value.toLowerCase();

  // Get all the rows
  let rows = table.querySelectorAll('tbody tr');

  // Loop through the rows
  for (let row of rows) {
    // Get the row text
    let rowText = row.textContent.toLowerCase();

    // If the row text includes the query, show the row, otherwise hide it
    if (rowText.includes(query)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  }
});
//Activate the buttons of the nav bar and sort the table according to category
// Insert CSS for .nav-link:active directly into the document head
// Insert CSS for .selected directly into the document head
const style = document.createElement('style');
style.textContent = `
  .selected {
    background-color: var(--blackbooth) !important;
    color: var(--primary) !important;
    border-radius: 0px !important;
  }
`;
document.head.appendChild(style);

// Get all the buttons
let buttons = document.querySelectorAll('.nav-link');

// Set the "All" button as selected by default
buttons[0].classList.add('selected');

// Add a click

// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', function () {
    // Remove the 'active' class from all buttons
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Add the 'active' class to the clicked button
    this.classList.add('selected');

    // Filter the table
    filterTable(this.textContent);
  });
});

function filterTable(category) {
  // Get all the rows
  let rows = document.querySelectorAll('tbody tr');

  // Loop through the rows
  rows.forEach(row => {
    // Get the category of the row (assuming it's in the third cell)
    let rowCategory = row.cells[3].textContent;

    // If the row category matches the selected category or the selected category is "All", show the row, otherwise hide it
    if (rowCategory === category || category === 'All') {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}









