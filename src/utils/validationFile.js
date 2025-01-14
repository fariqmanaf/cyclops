export const validateFile = (file) => {
    const allowedMimeTypes = ['application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
  
    if (!allowedMimeTypes.includes(file.type)) {
      throw new Error('File harus berformat PDF');
    }
    
    if (file.size > maxSize) {
      throw new Error('Ukuran file maksimal 5MB');
    }
  
    return true;
  };