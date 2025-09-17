// apps/shared/api.js
const API_URL = process.env.EXPO_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_URL;


////////////////////////////////////////////////
export const API_BASE_URL = 'http://localhost:5000/api';

// Example: Get user by ID
export async function getUser(id) {
  const res = await fetch(`${API_BASE_URL}/users/${id}`);
  return res.json();
}
export async function getProtectedData(token) {
  const res = await fetch(`${API_BASE_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
export async function uploadFile(file, token) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}
// Example usage in a React component
import { getUser, getProtectedData, uploadFile } from '../../shared/api';

async function fetchUserData() {
  const user = await getUser('123');
  console.log(user);
}

async function fetchProtected(token) {
  const data = await getProtectedData(token);
  console.log(data);
}

async function handleUpload(file, token) {
  const result = await uploadFile(file, token);
  console.log(result);
}
//////////////////////////////////////////


export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token"); // for web
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
};
