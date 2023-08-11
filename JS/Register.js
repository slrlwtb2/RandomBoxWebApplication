document.getElementById('registrationForm').addEventListener('submit', registerUser);
document.getElementById('loginForm').addEventListener('submit', loginUser);

var registerURL = 'http://richy1710-001-site1.btempurl.com/api/User/Register';
var LoginURL = 'http://richy1710-001-site1.btempurl.com/api/User/login'; 

function showLoadingScreen() {
  document.getElementById('loadingScreen').style.display = 'block';
}

function hideLoadingScreen() {
  document.getElementById('loadingScreen').style.display = 'none';
}

function registerUser(e) {
  e.preventDefault();
  showLoadingScreen();

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
      hideLoadingScreen();
      if (response.ok) {
        showMessage('Registration successful. Please log in.');
      } else {
        showMessage('Registration failed. User already exists.');
      }
    })
    .catch(error => {
      hideLoadingScreen();
      console.error('Error:', error);
      showMessage('An error occurred during registration.');
    });
}

function loginUser(e) {
  e.preventDefault();
  showLoadingScreen();

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
      hideLoadingScreen();
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
      hideLoadingScreen();
      console.error('Error:', error);
      showMessage('An error occurred during login.');
    });
}

function showMessage(message) {
  document.getElementById('message').textContent = message;
}
