import { API_URL } from "../util/constants";

export async function addFriend(username) {
  const res = await fetch(`${API_URL}/users/${username}/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to add friend.");
  }

  return data;
}

export async function getFriend(id) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to get friend");
  }

  return data;
}

export async function removeFriend(id) {
  const res = await fetch(`${API_URL}/users/${id}/remove`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to remove friend.");
  }

  return data;
}

export async function messageFriend(id) {
  const res = await fetch(`${API_URL}/users/${id}/message`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to message friend.");
  }

  return data;
}
