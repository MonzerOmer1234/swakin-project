import { Navigate, Outlet } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function logout(){
  return localStorage.removeItem('token')
}
export default function ProtectedRoutes() {
  const token = getAuthToken();
  return <>{token ? <Outlet /> : <Navigate to={"/sign-up"} />}</>;
}
