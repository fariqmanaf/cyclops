export const getAllTopics = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${import.meta.env.VITE_API_URL}/topic`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (result.status === "Failed") {
    throw new Error(result?.message);
  }

  return result;
};

export const registerInTopic = async (body, id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/create-topic/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message);
  }

  return result;
};
