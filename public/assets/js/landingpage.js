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
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const strengthLabel = document.getElementById('strengthLabel');
    const strengthBar = document.getElementById('strengthBar');
    const passwordMatch = document.getElementById('passwordMatch');

    loginForm.reset();
    createAccountForm.reset();
    forgotPasswordForm.reset();
    forgotPasswordForm.style.display = 'none';
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
// function resetPasswordVisibility(toggleId, passwordId) {
//     const toggle = document.getElementById(toggleId);
//     const passwordField = document.getElementById(passwordId);

//     passwordField.type = 'password';
//     toggle.getElementsByTagName('i')[0].classList.remove('bi-eye');
//     toggle.getElementsByTagName('i')[0].classList.add('bi-eye-slash');
// }

//switchen tussen login en register formuliers
// function switchForms(showLogin) {
//     const loginForm = document.getElementById('loginForm');
//     const createAccountForm = document.getElementById('createAccountForm');
//     const loginModalLabel = document.getElementById('loginModalLabel');

//     registerErrorMessage.style.display = "none";
//     registerSuccessMessage.style.display = "none";

//     if (showLogin) {
//         loginForm.style.display = 'block';
//         createAccountForm.style.display = 'none';
//         if (loginModalLabel.innerText === "account aanmaken") {
//             loginModalLabel.textContent = 'aanmelden';
//         }
//     } else {
//         loginForm.style.display = 'none';
//         createAccountForm.style.display = 'block';
//         loginModalLabel.textContent = 'account aanmaken';
//     }
// }

// function changeModalTitle(title) {
//     const modalTitle = document.getElementById('loginModalLabel');
//     if (modalTitle) {
//         modalTitle.innerText = title;
//     } else {
//         console.error("Modal title element not found");
//     }
// }

//event listener voor create account
document.getElementById('showCreateAccountBtn').addEventListener('click', (event) => {
    event.preventDefault();
    switchForms(false);


    changeModalTitle("account aanmaken");
});

//event listener voor login
document.getElementById('lotrButton').addEventListener('click', () => {
    switchForms(true);

    changeModalTitle("aanmelden");
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

//event listener voor forgot-password
document.getElementById('forgot-password').addEventListener('click', function(event) {
    event.preventDefault();

    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('forgotPasswordForm').style.display = 'block';

    changeModalTitle("wachtwoord opnieuw instellen");
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

//error messages voor de login
// document.getElementById('loginForm').addEventListener('submit', async (event) => {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     try {
//         const response = await fetch("/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 username: username,
//                 password: password
//             })
//         });

//         const data = await response.json();

//         if (response.ok) {
//             loginErrorMessage.style.display = 'none';

//             setTimeout(() => {
//                 window.location.replace("/selection");
//             }, 2000);

//             loginErrorMessage.textContent = '';
//         } else {
//             loginErrorMessage.textContent = data.message;
//             loginErrorMessage.style.display = 'block';
//             event.preventDefault();
//         }
//     } catch (error) {
//         console.error('Fout bij inloggen:', error);
//         loginErrorMessage.textContent = data.message;
//         loginErrorMessage.style.display = 'block';
//         event.preventDefault();
//     }
// });

//error messages voor de register
// document.getElementById('createAccountForm').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const username = document.getElementById('signupUsername').value;
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;
//     const repeatPassword = document.getElementById('repeatPassword').value;

//     try {
//         const response = await fetch("/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 signupUsername: username,
//                 signupEmail: email,
//                 signupPassword: password,
//                 repeatPassword: repeatPassword
//             })
//         });

//         const data = await response.json();
        
//         if (response.ok) {
//             registerErrorMessage.style.display = 'none';
//             registerSuccessMessage.textContent = data.message;
//             registerSuccessMessage.style.display = 'block'; 

//             setTimeout(() => {
//                 window.location.reload();
//             }, 2000);

//             registerErrorMessage.textContent = '';
//         } else {
//             registerErrorMessage.textContent = data.message;
//             registerErrorMessage.style.display = 'block';
//             registerSuccessMessage.style.display = 'none'; 
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         registerErrorMessage.textContent = data.message;
//         registerErrorMessage.style.display = 'block';
//     }
// });
















// document.getElementById('createAccountForm').addEventListener('submit', (event) => {
//     const username = document.getElementById('signupUsername').value;
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;
//     const repeatPassword = document.getElementById('repeatPassword').value;
    
//     const registerErrorMessage = document.getElementById('registerErrorMessage');

//     if (!username || !email || !password || !repeatPassword) {
//         registerErrorMessage.textContent = "All fields are required";
//         registerErrorMessage.style.display = 'block';
//         event.preventDefault();
//     } else if (password !== repeatPassword) {
//         registerErrorMessage.textContent = "Passwords do not match";
//         registerErrorMessage.style.display = 'block';
//         event.preventDefault();
//     } else {
//         registerErrorMessage.style.display = 'none';
//     }
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