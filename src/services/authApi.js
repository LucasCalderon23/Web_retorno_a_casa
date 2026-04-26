const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5282";

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  const hasJsonBody = contentType?.includes("application/json");
  const payload = hasJsonBody ? await response.json() : null;

  if (!response.ok) {
    const message = payload?.message ?? "No se pudo completar la autenticacion.";
    throw new Error(message);
  }

  return payload;
};

export const loginRequest = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return handleResponse(response);
};

export const registerRequest = async ({ email, password }) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return handleResponse(response);
};
