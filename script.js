
document.getElementById('username').addEventListener('focusout', validateUsername);
document.getElementById('email').addEventListener('focusout', validateEmailInput);
document.getElementById("password").addEventListener("input", validatePassword);
document.getElementById("confirmPassword").addEventListener("input", validateConfirmPassword);

// Valida el camp d'usuari per assegurar-se que no estigui buit
function validateUsername() {
    var input = document.getElementById('username');
    var errorMessage = document.getElementById('usernameError');

    if (input.value.trim() === '') {
        errorMessage.style.display = 'inline';
        input.classList.remove('valid');
        input.classList.add('invalid');
        return false;
    } else {
        errorMessage.style.display = 'none';
        input.classList.remove('invalid');
        input.classList.add('valid');
        return true;
    }
}

// Valida el camp de correu electrònic fent servir una expressió regular
function validateEmailInput() {
    var input = document.getElementById('email');
    var isValid = validateEmail(input.value);
    var errorMessage = document.getElementById('emailError');

    if (isValid) {
        errorMessage.style.display = 'none';
        input.classList.remove('invalid');
        input.classList.add('valid');
        return true;
    } else {
        errorMessage.style.display = 'inline';
        input.classList.remove('valid');
        input.classList.add('invalid');
        return false;
    }
}

// Expressió regular per validar el format del correu electrònic
function validateEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

// Valida el camp de contrasenya segons criteris específics
function validatePassword() {
    var password = document.getElementById("password").value;
    var errorMessages = [];
    var errorMessageDiv = document.getElementById("passwordError");
    var isValid = true;

    // Criteris de validació per a la contrasenya
    if (password.length < 8 || password.length > 15) {
        errorMessages.push("Entre 8 i 15 caràcters.");
        isValid = false;
    }
    if (!/[a-z]/.test(password)) {
        errorMessages.push("1 minúscula.");
        isValid = false;
    }
    if (!/[A-Z]/.test(password)) {
        errorMessages.push("1 majúscula.");
        isValid = false;
    }
    if (!/[0-9]/.test(password)) {
        errorMessages.push("1 dígit numèric.");
        isValid = false;
    }
    if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password)) {
        errorMessages.push("1 caràcter especial.");
        isValid = false;
    }

    // Aplica estils segons la validesa de la contrasenya
    if (isValid) {
        document.getElementById("password").classList.remove('invalid');
        document.getElementById("password").classList.add('valid');
        errorMessageDiv.innerHTML = "";
    } else {
        document.getElementById("password").classList.add('invalid');
        document.getElementById("password").classList.remove('valid');
        errorMessageDiv.innerHTML = "La contrasenya ha de tenir: " + errorMessages.join(", ");
    }
    return isValid;
}

// Valida que la confirmació de la contrasenya coincideixi amb la contrasenya
function validateConfirmPassword() {
    var confirmPassword = document.getElementById("confirmPassword").value;
    var password = document.getElementById("password").value;
    var errorMessageDiv = document.getElementById("confirmPasswordError");
    var isValid = confirmPassword === password;

    // Aplica estils segons la coincidència de les contrasenyes
    if (isValid) {
        document.getElementById("confirmPassword").classList.remove('invalid');
        document.getElementById("confirmPassword").classList.add('valid');
        errorMessageDiv.style.display = "none";
    } else {
        document.getElementById("confirmPassword").classList.add('invalid');
        document.getElementById("confirmPassword").classList.remove('valid');
        errorMessageDiv.style.display = "inline";
        errorMessageDiv.innerHTML = "Les contrasenyes no coincideixen";
    }
    return isValid;
}

// Gestiona l'enviament del formulari, validant tots els camps
document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita l'enviament automàtic del formulari

    // Validacions per a cada camp
    var isValidUsername = validateUsername();
    var isValidEmail = validateEmailInput();
    var isValidPassword = validatePassword();
    var isValidConfirmPassword = validateConfirmPassword();
    var isValidAddress = validateAddress();

    // Comprova que tots els camps siguin vàlids abans d'enviar el formulari
    if (isValidUsername && isValidEmail && isValidPassword && isValidConfirmPassword && isValidAddress) {
       alert("El formulari és vàlid per enviar");
    } else {
        alert("Alguns camps són invàlids.");
    }
});

// Valida que el camp d'adreça postal no estigui buit
function validateAddress() {
    var address = document.getElementById("address").value;
    var errorMessageDiv = document.getElementById("addressError");
    var isValid = address.trim() !== "";

    // Aplica estils segons la validesa de l'adreça
    if (isValid) {
        document.getElementById("address").classList.remove('invalid');
        document.getElementById("address").classList.add('valid');
        errorMessageDiv.style.display = "none";
    } else {
        document.getElementById("address").classList.add('invalid');
        document.getElementById("address").classList.remove('valid');
        errorMessageDiv.style.display = "inline";
        errorMessageDiv.innerHTML = "Camp obligatori";
    }
    return isValid;
}
