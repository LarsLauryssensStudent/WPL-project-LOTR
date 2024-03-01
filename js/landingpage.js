function playVideo(index) {
  const video = document.getElementById(`video-${index}`);
  video.style.display = 'block';
  video.play();
}

function pauseVideo(index) {
  const video = document.getElementById(`video-${index}`);
  video.pause();
  video.currentTime = 0;
  video.style.display = 'none';
}

// Function to handle video play on hover
function playVideo(index) {
  const video = document.getElementById(`video-${index}`);
  video.style.display = 'block';
  video.play();
}

function pauseVideo(index) {
  const video = document.getElementById(`video-${index}`);
  video.pause();
  video.currentTime = 0;
  video.style.display = 'none';
}

// Function to reset all form fields and elements
function resetForm() {
  const loginForm = document.getElementById('loginForm');
  const createAccountForm = document.getElementById('createAccountForm');
  const strengthLabel = document.getElementById('strengthLabel');
  const strengthBar = document.getElementById('strengthBar');
  const passwordMatch = document.getElementById('passwordMatch');

  loginForm.reset(); // Reset form fields
  createAccountForm.reset(); // Reset form fields
  strengthLabel.textContent = ''; // Reset password strength label
  strengthBar.style.width = '0%'; // Reset password strength bar width
  strengthBar.className = 'progress-bar'; // Reset password strength bar color

  // Reset password visibility toggles
  resetPasswordVisibility('toggleSignupPassword', 'signupPassword');
  resetPasswordVisibility('toggleRepeatPassword', 'repeatPassword');
  resetPasswordVisibility('togglePassword', 'loginPassword');

  passwordMatch.style.display = 'none';
}

// Function to reset password visibility toggle
function resetPasswordVisibility(toggleId, passwordId) {
  const toggle = document.getElementById(toggleId);
  const passwordField = document.getElementById(passwordId);

  passwordField.type = 'password';
  toggle.getElementsByTagName('i')[0].classList.remove('bi-eye');
  toggle.getElementsByTagName('i')[0].classList.add('bi-eye-slash');
}

// Function to switch between login and signup forms
function switchForms(showLogin) {
  const loginForm = document.getElementById('loginForm');
  const createAccountForm = document.getElementById('createAccountForm');
  const loginModalLabel = document.getElementById('loginModalLabel');

  if (showLogin) {
    loginForm.style.display = 'block';
    createAccountForm.style.display = 'none';
    loginModalLabel.textContent = 'Login';
  } else {
    loginForm.style.display = 'none';
    createAccountForm.style.display = 'block';
    loginModalLabel.textContent = 'Create Account';
  }
}

// Function to reset form and switch to login when modal is closed
document.getElementById('loginModal').addEventListener('hidden.bs.modal', () => {
  resetForm(); // Reset all form fields and elements
  switchForms(true); // Switch to login form when modal is closed
});

// Event listener for "Create Account" button
document.getElementById('showCreateAccountBtn').addEventListener('click', (event) => {
  event.preventDefault();
  switchForms(false);
});

// Event listener for "Login" button
document.getElementById('profileButton').addEventListener('click', () => {
  switchForms(true);
});

// Event listener for "Back to Login" button
document.getElementById('backToLoginBtn').addEventListener('click', (event) => {
  event.preventDefault();
  switchForms(true);
});

// Validate password strength
document.getElementById('signupPassword').addEventListener('input', () => {
  const password = document.getElementById('signupPassword').value;
  const strengthLabel = document.getElementById('strengthLabel');
  const strengthBar = document.getElementById('strengthBar');
  
  const regexLowercase = /[a-z]/;
  const regexUppercase = /[A-Z]/;
  const regexNumber = /[0-9]/;
  const regexSpecial = /[^A-Za-z0-9]/;

  let strength = 0;
  if (regexLowercase.test(password)) strength++;
  if (regexUppercase.test(password)) strength++;
  if (regexNumber.test(password)) strength++;
  if (regexSpecial.test(password)) strength++;
  
  switch(strength) {
    case 0:
      strengthLabel.textContent = 'zeer zwak';
      strengthBar.style.width = '20%';
      strengthBar.className = 'progress-bar bg-danger';
      break;
    case 1:
      strengthLabel.textContent = 'zwak';
      strengthBar.style.width = '40%';
      strengthBar.className = 'progress-bar bg-warning';
      break;
    case 2:
      strengthLabel.textContent = 'matig';
      strengthBar.style.width = '60%';
      strengthBar.className = 'progress-bar bg-info';
      break;
    case 3:
      strengthLabel.textContent = 'sterk';
      strengthBar.style.width = '80%';
      strengthBar.className = 'progress-bar bg-success';
      break;
    case 4:
      strengthLabel.textContent = 'zeer sterk';
      strengthBar.style.width = '100%';
      strengthBar.className = 'progress-bar bg-success';
      break;
    default:
      strengthLabel.textContent = '';
      strengthBar.style.width = '0%';
      strengthBar.className = 'progress-bar';
  }
});

// Check if passwords match on form submission
document.getElementById('createAccountForm').addEventListener('submit', (event) => {
  const password = document.getElementById('signupPassword').value;
  const repeatPassword = document.getElementById('repeatPassword').value;
  const passwordMatch = document.getElementById('passwordMatch');

  if (password !== repeatPassword) {
    passwordMatch.style.display = 'block';
    event.preventDefault();
  } else {
    passwordMatch.style.display = 'none';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const toggleSignupPassword = document.getElementById('toggleSignupPassword');
  const signupPasswordField = document.getElementById('signupPassword');
  const toggleRepeatPassword = document.getElementById('toggleRepeatPassword');
  const repeatPasswordField = document.getElementById('repeatPassword');
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('loginPassword');

  toggleSignupPassword.addEventListener('click', function () {
    const type = signupPasswordField.type === 'password' ? 'text' : 'password';
    signupPasswordField.type = type;
    this.getElementsByTagName('i')[0].classList.toggle('bi-eye');
    this.getElementsByTagName('i')[0].classList.toggle('bi-eye-slash');
  });

  togglePassword.addEventListener('click', function() {
    const type = passwordField.type === 'password' ? 'text' : 'password';
    passwordField.type = type;
    this.getElementsByTagName('i')[0].classList.toggle('bi-eye');
    this.getElementsByTagName('i')[0].classList.toggle('bi-eye-slash');
  });

  toggleRepeatPassword.addEventListener('click', function () {
    const type = repeatPasswordField.type === 'password' ? 'text' : 'password';
    repeatPasswordField.type = type;
    this.getElementsByTagName('i')[0].classList.toggle('bi-eye');
    this.getElementsByTagName('i')[0].classList.toggle('bi-eye-slash');
  });
});

//voorbeeld
function handleLogin() {
  // Perform login process (e.g., validate credentials, etc.)
  // For demonstration purposes, let's assume the login is successful

  // Redirect user to the selection.html page
  window.location.href = "pages/templates/selection.html";
}