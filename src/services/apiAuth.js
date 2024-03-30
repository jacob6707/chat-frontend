export async function createUser(user) {
  const res = await fetch("http://localhost:8080/auth/signup", {
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
