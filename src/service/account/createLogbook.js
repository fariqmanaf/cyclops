export const createLogbookDetail = async (id, formData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/logbook/${id}/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // Send as FormData directly
    });
  
    const result = await response.json();
    if (result.status === 'Failed') {
      throw new Error(result.message || 'Terjadi kesalahan');
    }
    return result;
  };
  
  // Helper function to create FormData from logbook detail
  export const createLogbookFormData = (data) => {
    const formData = new FormData();
    
    // Add all text fields
    formData.append('namaDosen', data.namaDosen);
    formData.append('target', data.target);
    formData.append('kendala', data.kendala);
    formData.append('output', data.output);
    formData.append('rincianKegiatan', data.rincianKegiatan);
    
    // Add file if exists
    if (data.buktiKegiatan) {
      formData.append('buktiKegiatan', data.buktiKegiatan);
    }
  
    return formData;
  };