const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email.trim()) {
    return 'Email обязателен';
  }
  if (!EMAIL_RE.test(email.trim())) {
    return 'Некорректный формат email';
  }
  return null;
}

export function validatePassword(password) {
  if (!password) {
    return 'Пароль обязателен';
  }
  if (password.length < 8) {
    return 'Пароль должен содержать минимум 8 символов';
  }
  if (!/[a-zA-Zа-яА-Я]/.test(password)) {
    return 'Пароль должен содержать хотя бы одну букву';
  }
  if (!/\d/.test(password)) {
    return 'Пароль должен содержать хотя бы одну цифру';
  }
  return null;
}
