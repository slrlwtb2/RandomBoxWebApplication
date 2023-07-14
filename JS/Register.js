document.getElementById('registrationForm').addEventListener('submit', registerUser);
document.getElementById('loginForm').addEventListener('submit', loginUser);

var registerURL = 'https://randomboxwebapplication.azurewebsites.net/api/User/Register';
var LoginURL = 'https://randomboxwebapplication.azurewebsites.net/api/User/login'; 

function registerUser(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch(registerURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ Username: username, Password: password })
  })
    .then(response => {
      if (response.ok) {
        showMessage('Registration successful. Please log in.');
      } else {
        showMessage('Registration failed. User already exists.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showMessage('An error occurred during registration.');
    });
}

function loginUser(e) {
    e.preventDefault();
  
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
  
    fetch(LoginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Username: username, Password: password })
    })
      .then(response => {
        if (response.ok) {
          response.text().then(token => {
            // Store the token in localStorage
            localStorage.setItem('jwtToken', token);
            showMessage('Login successful');
            // Redirect to index.html or any other page
            window.location.href = 'index.html';
          });
        } else {
          showMessage('Invalid username or password. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred during login.');
      });
  }
  

function showMessage(message) {
  document.getElementById('message').textContent = message;
}