// Standardized API response handler
export const handleApiResponse = async (apiCall) => {
  try {
    const response = await apiCall();
    if (response?.status === 200) {
      return { success: true, data: response.data };
    }
    return { success: false, error: 'Request failed' };
  } catch (error) {
    console.error('API Error:', error);
    
    // Handle specific error types
    if (error.response?.status === 401) {
      return { success: false, error: 'NOT_AUTHENTICATED' };
    }
    
    if (error.response?.data?.message) {
      return { success: false, error: error.response.data.message };
    }
    
    return { success: false, error: 'Something went wrong' };
  }
};

// Standardized error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please login to continue.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  DEFAULT: 'Something went wrong. Please try again.'
}; 