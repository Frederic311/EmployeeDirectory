document.addEventListener('DOMContentLoaded', function() {
  // Check if an admin user already exists in local storage
  var existingAdmin = JSON.parse(localStorage.getItem('user'));

  if (!existingAdmin) {
    // Create an admin user object (securely hash password)
    var adminUser = {
      username: 'admin',
      password: 'admin'
    };

    // Store the admin user object in local storage
    localStorage.setItem('user', JSON.stringify(adminUser));

    console.log('Admin user created successfully!');
  } else {
    console.log('Admin user already exists in local storage.');
  }
});

