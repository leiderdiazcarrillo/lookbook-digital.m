/*
  scripts.js

  Funcionalidad para el formulario de registro y el inicio de sesión.
  - Guarda múltiples usuarios en localStorage.
  - Valida coincidencia de contraseñas.
  - Muestra el nivel de seguridad de la contraseña.
  - Permite alternar visibilidad de contraseñas.
  - Alterna entre el formulario de registro y el de inicio de sesión.
*/

(function () {
  const LS_KEY = 'usuarios';

  const tabs = document.querySelectorAll('.tab-btn');
  const forms = document.querySelectorAll('.auth-form');
  const toggleButtons = document.querySelectorAll('.btn-toggle-password');
  const strengthText = document.getElementById('passwordStrength');
  const passwordInput = document.getElementById('passwordRegistro');

  function getStoredUsers() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('No se pudo leer usuarios de localStorage:', e);
      return [];
    }
  }

  function setStoredUsers(users) {
    localStorage.setItem(LS_KEY, JSON.stringify(users));
  }

  function getPasswordStrength(password) {
    // Score basado en longitud y variedad de caracteres
    let score = 0;
    if (!password) return { label: '-', score };

    const lengthScore = Math.min(10, password.length); // máximo 10
    score += lengthScore;

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    score += hasLower ? 5 : 0;
    score += hasUpper ? 5 : 0;
    score += hasNumber ? 5 : 0;
    score += hasSymbol ? 5 : 0;

    let label = 'Baja';
    if (score >= 28) label = 'Alta';
    else if (score >= 20) label = 'Media';

    return { label, score };
  }

  function updatePasswordStrength() {
    if (!strengthText) return;
    const value = passwordInput ? passwordInput.value : '';
    const strength = getPasswordStrength(value);
    strengthText.textContent = strength.label;
    strengthText.className = '';
    strengthText.classList.add(`strength-${strength.label.toLowerCase()}`);
  }

  function switchForm(target) {
    forms.forEach((form) => {
      form.classList.toggle('hidden', form.id !== `form${target.charAt(0).toUpperCase()}${target.slice(1)}`);
    });

    tabs.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.target === target);
    });
  }

  function showMessage(form, message, type = 'error') {
    const messageEl = form.querySelector('.form-message');
    if (!messageEl) return;
    messageEl.textContent = message;
    messageEl.className = 'form-message ' + (type === 'success' ? 'success' : 'error');
  }

  function clearMessage(form) {
    showMessage(form, '', '');
  }

  function togglePasswordVisibility(button) {
    const targetId = button.dataset.target;
    const input = document.getElementById(targetId);
    if (!input) return;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? '🔒' : '👁️';
  }

  function configureTabs() {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        switchForm(tab.dataset.target);
        clearMessage(document.getElementById(`form${tab.dataset.target.charAt(0).toUpperCase()}${tab.dataset.target.slice(1)}`));
      });
    });
  }

  function configurePasswordToggles() {
    toggleButtons.forEach((button) => {
      button.addEventListener('click', () => togglePasswordVisibility(button));
    });
  }

  function initRegistration() {
    const form = document.getElementById('formRegistro');
    if (!form) return;

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim().toLowerCase();
      const password = form.password.value;
      const confirm = form.confirmPassword.value;

      if (password !== confirm) {
        showMessage(form, 'Las contraseñas no coinciden.');
        return;
      }

      const users = getStoredUsers();
      const exists = users.some((u) => u.email === email);
      if (exists) {
        showMessage(form, 'Ya existe un usuario registrado con este correo.');
        return;
      }

      users.push({ nombre, email, password, createdAt: new Date().toISOString() });
      setStoredUsers(users);

      form.reset();
      updatePasswordStrength();
      showMessage(form, 'Registro exitoso. Ya puedes iniciar sesión.', 'success');
    });

    passwordInput?.addEventListener('input', updatePasswordStrength);
    updatePasswordStrength();
  }

  function initLogin() {
    const form = document.getElementById('formLogin');
    if (!form) return;

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const email = form.emailLogin.value.trim().toLowerCase();
      const password = form.passwordLogin.value;
      const users = getStoredUsers();
      const match = users.find((u) => u.email === email && u.password === password);

      if (!match) {
        showMessage(form, 'Correo o contraseña incorrectos.');
        return;
      }

      showMessage(form, `Bienvenido(a) ${match.nombre}!`, 'success');
      if (window.location.pathname.includes('login.html')) {
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }
      form.reset();
    });
  }

  function init() {
    configureTabs();
    configurePasswordToggles();
    initRegistration();
    initLogin();

    // Inicialmente mostrar registro
    switchForm('registro');
  }

  document.addEventListener('DOMContentLoaded', init);
})();
