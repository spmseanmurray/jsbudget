import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import Cookies from 'js-cookie';
import api from '../services/api';

const useUserStore = create(subscribeWithSelector((set) => ({
  user: null,
  login: (payload) => api.post('/auth/login', payload)
    .then(({ data }) => set(() => ({ user: data })))
    .catch(() => console.log('Failed to login user')),
  logout: () => {
    set(() => ({ user: {} }));
    Cookies.remove('jsbudget-session');
  },
  register: (payload) => api.post('/auth/register', payload)
    .then(({ data }) => set(() => ({ user: data })))
    .catch(() => console.log('Failed to register user'))
  ,
})));

export default useUserStore;
