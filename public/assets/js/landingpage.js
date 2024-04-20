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

//resets de form to default
function resetForm() {
    const loginForm = document.getElementById('loginForm');
    const createAccountForm = document.getElementById('createAccountForm');
    const strengthLabel = document.getElementById('strengthLabel');
    const strengthBar = document.getElementById('strengthBar');
    const passwordMatch = document.getElementById('passwordMatch');

    loginForm.reset();
    createAccountForm.reset();
    strengthLabel.textContent = '';
    strengthBar.style.width = '0%';
    strengthBar.className = 'progress-bar';

    resetPasswordVisibility('toggleSignupPassword', 'signupPassword');
    resetPasswordVisibility('toggleRepeatPassword', 'repeatPassword');
    resetPasswordVisibility('togglePassword', 'loginPassword');

    passwordMatch.style.display = 'none';
}

document.getElementById('loginModal').addEventListener('hidden.bs.modal', () => {
    resetForm();
    switchForms(true);
});

//werkt ffe niet (nog toevoegen)
function resetPasswordVisibility(toggleId, passwordId) {
    const toggle = document.getElementById(toggleId);
    const passwordField = document.getElementById(passwordId);

    passwordField.type = 'password';
    toggle.getElementsByTagName('i')[0].classList.remove('bi-eye');
    toggle.getElementsByTagName('i')[0].classList.add('bi-eye-slash');
}

//switchen naar login en register
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

//event listener voor create account
document.getElementById('showCreateAccountBtn').addEventListener('click', (event) => {
    event.preventDefault();
    switchForms(false);
});

//event listener voor login
document.getElementById('profileButton').addEventListener('click', () => {
    switchForms(true);
});

//alert voor disabled logins
const buttons = document.querySelectorAll('.custom-disabled-button');
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        alert('mag niet');
    });
});

//event listener voor back to login
document.getElementById('backToLoginBtn').addEventListener('click', (event) => {
    event.preventDefault();
    switchForms(true);
});



//wachtwoord sterkte controleren
// document.getElementById('signupPassword').addEventListener('input', () => {
//   const password = document.getElementById('signupPassword').value;
//   const strengthLabel = document.getElementById('strengthLabel');
//   const strengthBar = document.getElementById('strengthBar');
  
//   const regexLowercase = /[a-z]/;
//   const regexUppercase = /[A-Z]/;
//   const regexNumber = /[0-9]/;
//   const regexSpecial = /[^A-Za-z0-9]/;

//   let strength = 0;
//   if (regexLowercase.test(password)) strength++;
//   if (regexUppercase.test(password)) strength++;
//   if (regexNumber.test(password)) strength++;
//   if (regexSpecial.test(password)) strength++;
  
//   switch(strength) {
//     case 0:
//       strengthLabel.textContent = 'zeer zwak';
//       strengthBar.style.width = '20%';
//       strengthBar.className = 'progress-bar bg-danger';
//       break;
//     case 1:
//       strengthLabel.textContent = 'zwak';
//       strengthBar.style.width = '40%';
//       strengthBar.className = 'progress-bar bg-warning';
//       break;
//     case 2:
//       strengthLabel.textContent = 'matig';
//       strengthBar.style.width = '60%';
//       strengthBar.className = 'progress-bar bg-info';
//       break;
//     case 3:
//       strengthLabel.textContent = 'sterk';
//       strengthBar.style.width = '80%';
//       strengthBar.className = 'progress-bar bg-success';
//       break;
//     case 4:
//       strengthLabel.textContent = 'zeer sterk';
//       strengthBar.style.width = '100%';
//       strengthBar.className = 'progress-bar bg-success';
//       break;
//     default:
//       strengthLabel.textContent = '';
//       strengthBar.style.width = '0%';
//       strengthBar.className = 'progress-bar';
//   }
// });

//zien of wachtwoorden overeen komen
// document.getElementById('createAccountForm').addEventListener('submit', (event) => {
//   const password = document.getElementById('signupPassword').value;
//   const repeatPassword = document.getElementById('repeatPassword').value;
//   const passwordMatch = document.getElementById('passwordMatch');

//   if (password !== repeatPassword) {
//     passwordMatch.style.display = 'block';
//     event.preventDefault();
//   } else {
//     passwordMatch.style.display = 'none';
//   }
// });

//wachtwoord visibility
// document.addEventListener('DOMContentLoaded', function () {
//   const toggleSignupPassword = document.getElementById('toggleSignupPassword');
//   const signupPasswordField = document.getElementById('signupPassword');
//   const toggleRepeatPassword = document.getElementById('toggleRepeatPassword');
//   const repeatPasswordField = document.getElementById('repeatPassword');
//   const togglePassword = document.getElementById('togglePassword');
//   const passwordField = document.getElementById('loginPassword');

//   toggleSignupPassword.addEventListener('click', function () {
//     const type = signupPasswordField.type === 'password' ? 'text' : 'password';
//     signupPasswordField.type = type;
//     this.getElementsByTagName('i')[0].classList.toggle('bi-eye');
//     this.getElementsByTagName('i')[0].classList.toggle('bi-eye-slash');
//   });

//   togglePassword.addEventListener('click', function() {
//     const type = passwordField.type === 'password' ? 'text' : 'password';
//     passwordField.type = type;
//     this.getElementsByTagName('i')[0].classList.toggle('bi-eye');
//     this.getElementsByTagName('i')[0].classList.toggle('bi-eye-slash');
//   });

//   toggleRepeatPassword.addEventListener('click', function () {
//     const type = repeatPasswordField.type === 'password' ? 'text' : 'password';
//     repeatPasswordField.type = type;
//     this.getElementsByTagName('i')[0].classList.toggle('bi-eye');
//     this.getElementsByTagName('i')[0].classList.toggle('bi-eye-slash');
//   });
// });

// voorbeeld
// function handleLogin() {
//   // Perform login process (e.g., validate credentials, etc.)
//   // For demonstration purposes, let's assume the login is successful

//   // Redirect user to the selection.html page
//   window.location.href = "selection";
// }

// function handleLoginFormSubmit(event) {
//   event.preventDefault(); // Prevent default form submission behavior
  
//   // Get the form data
//   const formData = new FormData(event.target);
  
//   // Make an asynchronous request to the server
//   fetch('/login', {
//     method: 'POST',
//     body: formData
//   })
//   .then(response => {
//     if (response.ok) {
//       // If login successful, reload the page or perform any other actions
//       window.location.reload();
//     } else if (response.status === 401) {
//       // If wrong password, display the message in the modal without closing it
//       const errorMessage = document.getElementById('errorMessage');
//       if (errorMessage) {
//         errorMessage.textContent = 'Wrong password';
//         errorMessage.style.display = 'block';
//       }
//     } else {
//       // Handle other error cases
//       console.error('Error:', response.statusText);
//     }
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }

// document.getElementById('loginForm').addEventListener('submit', handleLoginFormSubmit);