import { API_URL } from "../util/constants";

export async function getChannel(cid) {
  const res = await fetch(`${API_URL}/channels/${cid}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to get channel");
  }

  return data;
}

export async function getChannelMessages(cid, page = 1, limit = 4) {
  const res = await fetch(
    `${API_URL}/channels/${cid}/messages?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to get channel messages");
  }

  return data;
}

export async function postChannelMessage(cid, message) {
  const res = await fetch(`${API_URL}/channels/${cid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ content: message }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to post message");
  }

  return data;
}

export async function createChannel(name, participants) {
  const res = await fetch(`${API_URL}/channels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ name, participants }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to create channel");
  }

  return data;
}

export async function deleteChannel(cid) {
  const res = await fetch(`${API_URL}/channels/${cid}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to delete channel");
  }

  return data;
}

export async function addParticipant(cid, uid) {
  const res = await fetch(`${API_URL}/channels/${cid}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ userId: uid }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to add participant");
  }

  return data;
}

export async function removeParticipant(cid, uid) {
  const res = await fetch(`${API_URL}/channels/${cid}/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ userId: uid }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message) throw new Error(data.message);
    throw new Error("Failed to remove participant");
  }

  return data;
}
