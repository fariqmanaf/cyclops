export const getMahasiswaPendaftar = async (name) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/pendaftar-topic?nama=${name}`,
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

export const getMahasiswaAccepted = async (name) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/pendaftar-topic-acc?nama=${name}`,
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

export const accMahasiswa = async (body, id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/update-pendaftar-topic/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const result = await response.json();
  if (result.status === "Failed") {
    throw new Error(result?.message);
  }

  return result;
};

export const declineMahasiswa = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/delete-pendaftar-topic/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();
  if (result.status === "Failed") {
    throw new Error(result?.message);
  }

  return result;
};
