import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { km } from 'vuetify/locale';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export default defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    user: JSON.parse(localStorage.getItem('user')),
    // keepMe: false,
    returnUrl: null
  }),
  actions: {
    async login(username: string, password: string, keepMe: boolean) {
      const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });

      // update pinia state
      this.user = {...user, "keepMe": keepMe};
      // this.keepMe = keepMe
      // store user details and jwt in local storage to keep user logged in between page refreshes
      if (keepMe) {
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.removeItem('user');
      }
      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/dashboard');
    },
    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/auth/login');
    }
  }
});
