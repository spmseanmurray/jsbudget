import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import Cookies from 'js-cookie';
import api from '../services/api';

let fetchUserPromise = null;

const useUserStore = create(subscribeWithSelector((set) => ({
  user: null,
  fetchUser: async () => {
    if (!fetchUserPromise) {
      fetchUserPromise = api.get('/auth/user')
        .then(({ data }) => set(() => ({ user: data })))
        .catch(() => console.log('Failed to fetch user'));
    }
    return fetchUserPromise;
  },
  login: async (payload) => {
    if (!fetchUserPromise) {
      fetchUserPromise = api.post('/auth/login', payload)
        .then(({ data }) => set(() => ({ user: data })))
        .catch(() => console.log('Failed to login user'));
    }
    return fetchUserPromise;
  },
  logout: async () => {
    fetchUserPromise = null;
    set(() => ({ user: {} }));
    Cookies.remove('jsbudget-session');
  },
  register: async (payload) => api.post('/auth/register', payload)
    .then(({ data }) => set(() => ({ user: data })))
    .catch(() => console.log('Failed to register user')),
})));

export default useUserStore;
