document.querySelector('.sign-in-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the values from the input fields
  var username = document.getElementById('Username').value;
  var password = document.getElementById('Password').value;

  // Get the user object from local storage
  var user = JSON.parse(localStorage.getItem('user'));

  // Check if user exists and the password is correct
  if (user && user.username === username && user.password === password) {
    // Redirect to the professional.html page
    window.location.href = 'professional.html';
  } else {
    // Display a SweetAlert error message
    swal("Error", "Invalid username or password!", "error");
  }
});
