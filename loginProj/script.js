const email = document.querySelector("#email");
const pw = document.querySelector("#password");
const login = document.querySelector(".login-btn");
const emailMsg = document.querySelector(".emailMsg");
const pwMsg = document.querySelector(".pwMsg");

let emailVerified = false;
let pwVerified = false;

function check() {
  if (email.value === "" || email.value === null) {
    email.classList.add("error");
    emailMsg.innerHTML = `<p>Please, enter an email</p>`;
  } else if (!validateEmail(email.value)) {
    email.classList.add("error");
    emailMsg.innerHTML = `<p>This email is invalid</p>`;
  } else if (validateEmail(email.value)) {
    email.classList.remove("error");
    email.classList.add("success");
    emailMsg.innerHTML = ``;
    emailVerified = true;
  }

  if (pw.value === "" || pw.value === null) {
    pw.classList.add("error");
    pwMsg.innerHTML = `<p>Please, enter a password</p>`;
  } else if (pw.value.length < 8) {
    pw.classList.add("error");
    pwMsg.innerHTML = `<p>Password must be at least 8 characters</p>`;
  } else if (pw.value.length > 16) {
    pw.classList.add("error");
    pwMsg.innerHTML = `<p>Password must be less than 16 characters</p>`;
  } else {
    pw.classList.remove("error");
    pw.classList.add("success");
    pwMsg.innerHTML = ``;
    pwVerified = true;
  }

  if (emailVerified && pwVerified) {
    login.setAttribute("href", "https://danieleiudica.github.io/MyPortfolio/portfolio/");
  }
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
check();
