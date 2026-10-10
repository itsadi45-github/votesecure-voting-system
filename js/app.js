const App = {
  init() {
    this.initPasswordToggles();
    this.initForms();
  },

  initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input');
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        btn.querySelector('i').classList.toggle('fa-eye');
        btn.querySelector('i').classList.toggle('fa-eye-slash');
      });
    });
  },

  initForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const adminForm = document.getElementById('adminForm');

    if (loginForm) this.initLoginForm(loginForm);
    if (registerForm) this.initRegisterForm(registerForm);
    if (adminForm) this.initAdminForm(adminForm);
  },

  initLoginForm(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('#email');
      const passwordInput = form.querySelector('#password');
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      let firstInvalid = null;

      if (!email) {
        this.setError(emailInput, 'Email is required');
        firstInvalid = firstInvalid || emailInput;
      } else if (!this.isValidEmail(email)) {
        this.setError(emailInput, 'Please enter a valid email address');
        firstInvalid = firstInvalid || emailInput;
      } else {
        this.setSuccess(emailInput);
      }

      if (!password) {
        this.setError(passwordInput, 'Password is required');
        firstInvalid = firstInvalid || passwordInput;
      } else {
        this.setSuccess(passwordInput);
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      const name = email.split('@')[0];
      sessionStorage.setItem('voterName', name);
      sessionStorage.setItem('voterEmail', email);
      window.location.href = 'voter-dashboard.html';
    });

    form.querySelectorAll('input[required]').forEach(input => {
      input.addEventListener('input', () => this.clearError(input));
    });
  },

  initRegisterForm(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validateRegisterForm(form)) {
        const fullName = form.querySelector('#fullName').value.trim();
        const email = form.querySelector('#email').value.trim();
        const citizenshipNumber = form.querySelector('#citizenship').value.trim();
        const address = form.querySelector('#address').value.trim();

        const result = DataStore.addVoter({
          fullName,
          email,
          citizenshipNumber,
          district: address,
          status: 'pending'
        });

        if (result.success) {
          this.showSuccess(form, 'Registration successful! Your account is pending verification. Redirecting to login...');
          setTimeout(() => window.location.href = 'index.html', 2000);
        } else {
          this.showError(form, result.message || 'Registration failed. Please try again.');
        }
      }
    });

    form.querySelectorAll('input[required]').forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  },

  initAdminForm(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = form.querySelector('#username');
      const passwordInput = form.querySelector('#password');
      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      let firstInvalid = null;

      if (!username) {
        this.setError(usernameInput, 'Username is required');
        firstInvalid = firstInvalid || usernameInput;
      } else {
        this.setSuccess(usernameInput);
      }

      if (!password) {
        this.setError(passwordInput, 'Password is required');
        firstInvalid = firstInvalid || passwordInput;
      } else {
        this.setSuccess(passwordInput);
      }

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      sessionStorage.setItem('adminUser', username);
      sessionStorage.setItem('isAdmin', 'true');
      window.location.href = 'admin-dashboard.html';
    });

    form.querySelectorAll('input[required]').forEach(input => {
      input.addEventListener('input', () => this.clearError(input));
    });
  },

  validateRegisterForm(form) {
    const fields = {
      fullName: form.querySelector('#fullName'),
      citizenship: form.querySelector('#citizenship'),
      email: form.querySelector('#email'),
      dob: form.querySelector('#dob'),
      phone: form.querySelector('#phone'),
      address: form.querySelector('#address'),
      password: form.querySelector('#password'),
      confirmPassword: form.querySelector('#confirmPassword')
    };

    let firstInvalid = null;

    Object.values(fields).forEach(field => {
      if (!this.validateField(field) && !firstInvalid) {
        firstInvalid = field;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }

    return true;
  },

  validateField(input) {
    if (input.required && !input.value.trim()) {
      this.setError(input, this.getRequiredMessage(input));
      return false;
    }

    if (input.id === 'email' && input.value) {
      if (!this.isValidEmail(input.value.trim())) {
        this.setError(input, 'Please enter a valid email address');
        return false;
      }
    }

    if (input.id === 'phone' && input.value) {
      if (!this.isValidPhone(input.value)) {
        this.setError(input, 'Please enter a valid phone number');
        return false;
      }
    }

    if (input.id === 'password' && input.value) {
      if (input.value.length < 6) {
        this.setError(input, 'Password must be at least 6 characters');
        return false;
      }
    }

    if (input.id === 'confirmPassword') {
      const password = document.getElementById('password');
      if (password && input.value !== password.value) {
        this.setError(input, 'Passwords do not match');
        return false;
      }
    }

    this.setSuccess(input);
    return true;
  },

  getRequiredMessage(input) {
    const messages = {
      fullName: 'Full name is required',
      citizenship: 'Citizenship number is required',
      email: 'Please enter a valid email address',
      dob: 'Date of birth is required',
      phone: 'Please enter a valid phone number',
      address: 'Address is required',
      password: 'Password must be at least 6 characters',
      confirmPassword: 'Passwords do not match',
      username: 'Username is required'
    };
    return messages[input.id] || 'This field is required';
  },

  isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },

  isValidPhone(value) {
    const digits = value.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  },

  setError(input, message) {
    input.classList.remove('success');
    input.classList.add('error');
    const errorEl = input.closest('.form-group')?.querySelector('.error-message');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.classList.add('visible');
    }
  },

  setSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    const errorEl = input.closest('.form-group')?.querySelector('.error-message');
    if (errorEl) {
      errorEl.classList.remove('visible');
    }
  },

  clearError(input) {
    input.classList.remove('error');
    const errorEl = input.closest('.form-group')?.querySelector('.error-message');
    if (errorEl) {
      errorEl.classList.remove('visible');
    }
  },

  showError(form, message) {
    let errorBox = form.querySelector('.form-error');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.className = 'form-error';
      errorBox.style.cssText = 'color: var(--error); font-size: 0.9rem; text-align: center; padding: 0.75rem; background: rgba(231, 76, 60, 0.1); border: 1px solid var(--error); border-radius: 8px; margin-bottom: 1rem;';
      form.insertBefore(errorBox, form.firstChild);
    }
    errorBox.textContent = message;
  },

  showSuccess(form, message) {
    let successBox = form.querySelector('.success-message');
    if (!successBox) {
      successBox = document.createElement('div');
      successBox.className = 'success-message';
      form.insertBefore(successBox, form.firstChild);
    }
    successBox.textContent = message;
    successBox.classList.add('visible');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());