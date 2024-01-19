const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Muestra mensajes de error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Muestra bordeado cuando la validación es exitosa
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Comprueba que el email es válido
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email no válido");
  }
}

// Comprueba campos requeridos
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `Campo ${getFieldName(input)} es necesario`);
    } else {
      showSuccess(input);
    }
  });
}

// Comprueba la longitud en caracteres del input
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `Campo ${getFieldName(input)} debe tener al menos ${min} caracteres`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} debe de tener menos de ${max} caracteres`
    );
  } else {
    showSuccess(input);
  }
}

// Comprueba que las contraseñas coinciden
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Las contraseñas no coinciden");
  }
}

// Getter para el nombre del campo
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Escuchadores de evento
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
