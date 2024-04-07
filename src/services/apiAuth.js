import { API_URL } from "../util/constants";

export async function createUser(user) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const data = await res.json();
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to create user.");
  }

  return { status: res.status };
}

export async function login(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const { user, token, message } = await res.json();

  if (!res.ok) {
    if (message) throw new Error(message);
    throw new Error("Failed to login.");
  }

  return { user, token };
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to get user");
  }

  return data;
}
