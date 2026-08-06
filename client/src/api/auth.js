import { apiRequest } from './client';

export function register(email, password) {
  return apiRequest('/auth/register', { method: 'POST', body: { email, password } });
}

export function login(email, password) {
  return apiRequest('/auth/login', { method: 'POST', body: { email, password } });
}

export function fetchMe(token) {
  return apiRequest('/auth/me', { token });
}
