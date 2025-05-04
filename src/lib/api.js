import axios from "axios"; 

const api = axios.create({
  baseURL : 'http://localhost:8000/api/v1/',
  headers: {
    'Content-Type': "application/json",
    timeout : 10000,
  }, 
});

api.interceptors.request.use((req)=> {
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken){
    req.headers.Authorization = `Bearer ${accessToken}`
  }

  return req;
})

// Request Interceptor: Attach access token
api.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

// Response Interceptor: Handle expired token (401)
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already trying to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        const refreshRes = await axios.get(
          'http://localhost:8000/api/v1/auth/refreshTkn', // Adjust your refresh token endpoint
          {},
          {
            withCredentials: true, // Important if using cookies
          }
        );

        console.log('Refresh token response:', refreshRes.data);

        const newAccessToken = refreshRes.data?.accessToken;

        if (newAccessToken) {
          // Save new access token
          localStorage.setItem('accessToken', newAccessToken);

          // Update original request with new token and retry it
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshErr) {
        console.error('Refresh token failed', refreshErr);
        // Optional: redirect to login or logout user
      }
    }

    return Promise.reject(error);
  }
);

export default api;