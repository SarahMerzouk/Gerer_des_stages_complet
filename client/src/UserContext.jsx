import { createContext } from "react";

const UserContext = createContext({
  token: null,
  role: "guess",
  userId: "",
  internshipsList: [],
  internship: [],
  handleUserId: () => {},
  handleRole: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  handleInternshipsList: () => {},
  handleInternship: () => {},
});

export default UserContext;