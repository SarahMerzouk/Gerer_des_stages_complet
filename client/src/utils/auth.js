export function userHasRole(role) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === role;
  }
  
  // Get the user's role
  export function getUserRole() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.role : null;
  }