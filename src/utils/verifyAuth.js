import decode from 'jwt-decode';

const verifyAuth = {
  isLoggedIn: () => {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');

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
        console.log('expired');
        return true;
      }

      return false;

    } catch (error) {
      console.log(error)
      return false;
    }
  },
};

export { verifyAuth as default };
