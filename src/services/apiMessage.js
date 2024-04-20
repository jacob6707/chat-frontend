import { API_URL } from "../util/constants";

export async function patchMessage(cid, mid, content) {
  const res = await fetch(`${API_URL}/channels/${cid}/messages/${mid}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ content }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to update message");
  }

  return data;
}

export async function deleteMessage(cid, mid) {
  const res = await fetch(`${API_URL}/channels/${cid}/messages/${mid}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete message");
  }

  return data;
}
