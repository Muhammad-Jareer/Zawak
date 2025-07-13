import axios from "axios";

let axiosInstance = null;

const createApiInstance = () => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      // baseURL: import.meta.env.VITE_Backend_API_URL,
      baseURL: "http://31.97.145.126:3202/api/v1",
      withCredentials: true,
      headers: {
        'Content-Type': "application/json",
        timeout: 10000,
      },
    });

    // Request Interceptor: Attach access token
    axiosInstance.interceptors.request.use((req) => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
      }
      return req;
    });

    // Response Interceptor: Handle expired token (401)
    axiosInstance.interceptors.response.use(
      response => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshRes = await axiosInstance.get('/auth/refreshTkn');
            const newAccessToken = refreshRes.data?.accessToken;

            if (newAccessToken) {
              localStorage.setItem('accessToken', newAccessToken);
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
            }
          } catch (refreshErr) {
            console.log('Refresh token failed', refreshErr);
            // Handle logout/redirect here if needed
          }
        }
        return Promise.reject(error);
      }
    );
  }
  return axiosInstance;
};

const api = createApiInstance();
export default api;