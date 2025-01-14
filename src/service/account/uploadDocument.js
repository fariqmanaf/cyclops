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