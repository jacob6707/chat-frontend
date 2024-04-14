import { API_URL } from "../util/constants";

export async function updateStatus(status) {
  const res = await fetch(`${API_URL}/users/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to update status");
  }

  return data;
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (res.status === 401) return null;

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to get user");
  }

  return data;
}
