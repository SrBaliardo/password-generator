const inputPassword = document.querySelector("#password");
const passwordLenght = document.querySelector("#password-lenght");
const copyBtn = document.querySelector("#copy");
const copy2Btn = document.querySelector("#copy2");
const refreshBtn = document.querySelector("#refresh");
const upperCaseCheck = document.querySelector("#uppercase-check");
const numbersCheck = document.querySelector("#numbers-check");
const symbolsCheck = document.querySelector("#symbols-check");
const spanPasswordLenght = document.querySelector("#password-lenght-text");
const securityIndicatorBar = document.querySelector("#indicator-bar");
const renewBtn = document.querySelector("#refresh");
const refreshImg = document.querySelector(".refresh-image");
const toast = document.querySelector("#toast");

let passwordRange = 16;

function showToast() {
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1200);
}

function generatePassword() {
  let chars = "abcdefghijklmnopqrstuvwxyz";

  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbersChars = "0123456789";
  const symbolsChars = "?!@#$%&";

  if (upperCaseCheck.checked) {
    chars += upperCaseChars;
  }

  if (numbersCheck.checked) {
    chars += numbersChars;
  }

  if (symbolsCheck.checked) {
    chars += symbolsChars;
  }

  let password = "";

  for (let i = 0; i < passwordRange; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  inputPassword.value = password;
  calculateSecurity();
  adjustFontSize();

  function calculateSecurity() {
    const secPercent = Math.round(
      (passwordRange / 64) * 25 +
        (upperCaseCheck.checked ? 15 : 0) +
        (numbersCheck.checked ? 25 : 0) +
        (symbolsCheck.checked ? 35 : 0)
    );

    securityIndicatorBar.style.width = `${secPercent}%`;

    if (secPercent > 69) {
      securityIndicatorBar.classList.remove("critical");
      securityIndicatorBar.classList.remove("warning");
      securityIndicatorBar.classList.add("safe");
    } else if (secPercent > 50) {
      securityIndicatorBar.classList.remove("critical");
      securityIndicatorBar.classList.add("warning");
      securityIndicatorBar.classList.remove("safe");
    } else {
      securityIndicatorBar.classList.add("critical");
      securityIndicatorBar.classList.remove("warning");
      securityIndicatorBar.classList.remove("safe");
    }

    if (secPercent === 100) {
      securityIndicatorBar.classList.add("completed");
    } else {
      securityIndicatorBar.classList.remove("completed");
    }
  }

  function adjustFontSize() {
    if (passwordRange > 45) {
      inputPassword.classList.remove("font-ms");
      inputPassword.classList.remove("font-ss");
      inputPassword.classList.add("font-xss");
    } else if (passwordRange > 32) {
      inputPassword.classList.remove("font-ms");
      inputPassword.classList.add("font-ss");
      inputPassword.classList.remove("font-xss");
    } else if (passwordRange > 22) {
      inputPassword.classList.add("font-ms");
      inputPassword.classList.remove("font-ss");
      inputPassword.classList.remove("font-xss");
    } else {
      inputPassword.classList.remove("font-ms");
      inputPassword.classList.remove("font-ss");
      inputPassword.classList.remove("font-xss");
    }
  }

  function copy() {
    navigator.clipboard.writeText(inputPassword.value);
    showToast();
  }

  passwordLenght.addEventListener("input", function () {
    passwordRange = passwordLenght.value;
    spanPasswordLenght.innerHTML = passwordLenght.value;
  });
  passwordLenght.addEventListener("change", function () {
    passwordRange = passwordLenght.value;
    spanPasswordLenght.innerHTML = passwordLenght.value;
    generatePassword();
  });
  renewBtn.addEventListener("click", generatePassword);
  copyBtn.addEventListener("click", copy);
  copy2Btn.addEventListener("click", copy);
  upperCaseCheck.addEventListener("click", generatePassword);
  numbersCheck.addEventListener("click", generatePassword);
  symbolsCheck.addEventListener("click", generatePassword);
}
generatePassword();
