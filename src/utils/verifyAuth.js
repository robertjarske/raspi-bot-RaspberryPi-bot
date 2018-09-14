import decode from 'jwt-decode';

const verifyAuth = {
  isLoggedIn: () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      if (!token) return false;

      const expiredToken = verifyAuth.checkExpired(token);

      if (expiredToken) {
        return false;
      }

      return true;
    }
    return false;
  },
  checkExpired: (token) => {
    try {
      const decodedToken = decode(token);

      const now = Date.now() / 1000;

      if (decodedToken.exp < now) {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },
};

export { verifyAuth as default };
