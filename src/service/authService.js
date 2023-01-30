import axios from "axios";
import api from "../api";
class AuthService {
    signIn = (email, password) => {
      return new Promise((resolve, reject) => {
        api
          .post('/api/home/login', { email, password })
          .then((response) => {
            if (response.data.user) {
              this.setToken('JWT');
              resolve(response.data.user);
            } else {
              reject(response.data.error);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
  
    signIn = ( email, password) => {};
  
    signInWithToken = () => {
      return new Promise((resolve, reject) => {
        api
          .post('/auth/login') // envio o token pelo header
          .then((response) => {
            if (response.data.user) {
              resolve(response.data.user);
            } else {
              reject(response.data.error);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
  
    signOut = () => {
      this.removeToken();
    };
  
    setToken = (token) => {
        if(token){
            localStorage.setItem('accessToken', token);
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        } else {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common.Authorization;
        }
    };
  
    getToken = () => localStorage.getItem('accessToken');
  
    removeToken = () => localStorage.removeItem('accessToken');
  
    isAuthenticated = () => !!this.getToken();
  }
  
  const authService = new AuthService();
  
  export default authService;