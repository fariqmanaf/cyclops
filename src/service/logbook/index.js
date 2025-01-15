export const getAllLogbook = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/logbook-mahasiswa`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();
  if (result.status === "Failed") {
    throw new Error(result?.message);
  }

  return result?.data;
};

export const getLogbook = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/logbook`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();
  if (result.status === "Failed") {
    throw new Error(result?.message);
  }

  return result?.data;
};

