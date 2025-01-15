export const getTopicsByUser = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/absensi-mahasiswa`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    });
  
    const result = await response.json();
    if (result.status === "Failed") {
      throw new Error(result?.message);
    }
  
    return result?.data;
  };

export const getMahasiswaByTopic = async (topic) => {
    try {
      // Get token from localStorage or your auth management system
      const token = localStorage.getItem('token'); // adjust based on your token storage method

      // Build URL with query parameter
      const url = new URL(`${import.meta.env.VITE_API_URL}/absensi-mahasiswa/filter`);
      if (topic) {
        url.searchParams.append('topic', topic);
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.status === 'Failed') {
        throw new Error(result.message);
      }

      return result.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch students by topic');
    }
  };

  export const getAttendanceDetails = async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/absensi-mahasiswa/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching attendance: ${response.statusText}`);
      }
  
      const result = await response.json();
  
      if (result.status === 'Failed') {
        throw new Error(result.message);
      }
  
      // If successful, return the data
      return result.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch attendance details');
    }
  };