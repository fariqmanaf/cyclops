export const uploadDocuments = async (formData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/upload-document`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // Send as FormData directly
    });
  
    const result = await response.json();
    if (result.status === 'Failed') {
      throw new Error(result.error);
    }
    return result;
  };

  export const getDocument = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/dokumen-diri`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const result = await response.json();
    if (result.status === 'Failed') {
      throw new Error(result.error);
    }
    return result.data;
  };