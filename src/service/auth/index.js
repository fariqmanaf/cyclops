export const login = async (request) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    body: JSON.stringify(request),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (result.status === "Failed") {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const register = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (result.status === "Failed") {
    throw new Error(result?.message);
  }

  return result?.data;
};
