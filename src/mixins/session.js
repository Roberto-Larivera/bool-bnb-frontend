export default {
    methods: {
      setSession(key, value) {
        window.sessionStorage.setItem(key, value);
      },
      getSession(key) {
        return window.sessionStorage.getItem(key);
      },
      removeSession(key) {
        window.sessionStorage.removeItem(key);
      },
    },
  };