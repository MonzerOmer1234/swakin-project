import { Navigate, Outlet } from "react-router-dom";

// get the token from local storage
export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

// handlin logout of user
export function logout() {
  return localStorage.removeItem("token");
}


// protecting routes based on backend data
export default function ProtectedRoutes() {
  const token = getAuthToken();
  return <>{token ? <Outlet /> : <Navigate to={"/sign-up"} />}</>;
}
