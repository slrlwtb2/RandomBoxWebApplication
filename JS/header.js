class MyHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<header>
      <div class="logo" href="index.html">
        <img src="Images/logo.png" alt="RandomBoxAPI Logo" />
      </div>
      <nav id="web-header">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
          <li><a href="https://github.com/" target="_blank">Github</a></li>
        </ul>
      </nav>
      <nav id="user-options">
        <ul>
          <li><a href="item.html">Items</a></li>
          <li><a href="buy.html">Buy</a></li>
          <li><a href="profile.html">Profile</a></li>
        </ul>
      </nav>
      <nav id="admin-options" style="display: none;">
        <ul>
          <li><a href="dashboard.html">DashBoard</a></li>
        </ul>
      </nav>
      <div class="right-section">
        <div class="username-display">
          <span id="username"></span>
          <button id="loginButton" style="font-family: 'VT323', monospace">Login</button>
          <button id="logoutButton" style="font-family: 'VT323', monospace">Logout</button>
        </div>
      </div>
    </header>`;
  }
}

customElements.define('my-header', MyHeader);

document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('jwtToken');
  const loginButton = document.getElementById('loginButton');
  const logoutButton = document.getElementById('logoutButton');
  const userOptions = document.getElementById('user-options');
  const adminOptions = document.getElementById('admin-options');

  if (token) {
    // Parse the token to extract the claims
    const decodedToken = parseJwt(token);
    const username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log(roles);

    // Display the username in the header
    document.getElementById('username').textContent = 'Hi ' + username;

    // Check if the user has the 'admin' role
    if (roles && roles.includes('ADMIN')) {
      adminOptions.style.display = 'block';
    }

    // Hide the login button
    loginButton.style.display = 'none';
  } else {
    logoutButton.style.display = 'none';
    userOptions.style.visibility = 'hidden';
  }

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const claims = JSON.parse(jsonPayload);

    return claims;
  }


  // Add click event listener to the logout button
  logoutButton.addEventListener('click', function() {
    localStorage.removeItem('jwtToken');
    window.location.href = 'index.html';
  });

  // Add click event listener to the login button
  loginButton.addEventListener('click', function() {
    window.location.href = 'Register.html';
  });
});
