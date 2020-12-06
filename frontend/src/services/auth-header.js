export default function authHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));
  
    if (user && user.token) {
      return { 'Authorization': `${user.token}` };
    } else {
      return {};
    }
  }