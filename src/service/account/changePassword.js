export const changePassword = async (data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
    if (result.status === 'Failed') {
      throw new Error(result.error);
    }
    return result;
  };