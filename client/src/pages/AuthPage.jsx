import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import './AuthPage.css';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  function switchMode(nextMode) {
    setMode(nextMode);
    setFieldErrors({});
    setTouched({ email: false, password: false });
    setFormError('');
  }

  function handleEmailChange(value) {
    setEmail(value);
    if (mode === 'register' && touched.email) {
      setFieldErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  }

  function handlePasswordChange(value) {
    setPassword(value);
    if (mode === 'register' && touched.password) {
      setFieldErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  }

  function handleEmailBlur() {
    setTouched((prev) => ({ ...prev, email: true }));
    if (mode === 'register') {
      setFieldErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    }
  }

  function handlePasswordBlur() {
    setTouched((prev) => ({ ...prev, password: true }));
    if (mode === 'register') {
      setFieldErrors((prev) => ({ ...prev, password: validatePassword(password) }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    const emailError = mode === 'register' ? validateEmail(email) : !email.trim() ? 'Email обязателен' : null;
    const passwordError = mode === 'register' ? validatePassword(password) : !password ? 'Пароль обязателен' : null;

    if (emailError || passwordError) {
      setFieldErrors({ email: emailError, password: passwordError });
      return;
    }

    setFieldErrors({});
    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate('/');
    } catch (err) {
      if (err.errors) {
        setFieldErrors(err.errors);
      } else {
        setFormError(err.message || 'Что-то пошло не так');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">CRM Бронирование</h1>
        <p className="auth-subtitle">
          {mode === 'login' ? 'Войдите в свой аккаунт' : 'Создайте новый аккаунт'}
        </p>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Вход
          </button>
          <button
            type="button"
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Регистрация
          </button>
        </div>

        {formError && <div className="form-banner-error">{formError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${fieldErrors.email ? 'invalid' : ''}`}
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              placeholder="name@company.com"
              autoComplete="email"
            />
            {fieldErrors.email && <div className="form-error">{fieldErrors.email}</div>}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className={`form-input ${fieldErrors.password ? 'invalid' : ''}`}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={handlePasswordBlur}
              placeholder={mode === 'login' ? 'Ваш пароль' : 'Минимум 8 символов, буквы и цифры'}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            {fieldErrors.password && <div className="form-error">{fieldErrors.password}</div>}
          </div>

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? 'Подождите…' : mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        {mode === 'register' && (
          <p className="auth-hint">
            Первый зарегистрированный пользователь автоматически получает роль администратора,
            все последующие — роль менеджера.
          </p>
        )}
      </div>
    </div>
  );
}
