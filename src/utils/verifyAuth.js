import decode from 'jwt-decode';

const verifyAuth = {
  isLoggedIn: () => {
    if (localStorage.getItem('currentUser')) {
      const token = localStorage.getItem('currentUser');

      if (!token) return false;

      const expiredToken = verifyAuth.checkExpired(token);

      if (expiredToken) {
        debugger;
        return false;
      }
      debugger;
      return true;
    }
    return false;
  },
  checkExpired: (token) => {
    try {
      const decodedToken = decode(token);
      debugger;
      console.log(decodedToken);
      const now = Date.now() / 1000;
      debugger;
      console.log(now);

      if (decodedToken.exp < now) {
        console.log('expired');
        debugger;
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
