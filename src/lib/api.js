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

export default api;