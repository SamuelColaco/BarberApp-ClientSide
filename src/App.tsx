
import {  AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes";

export function App(){
  return (
    <div>
      <AuthProvider>
          <AppRoutes />
      </AuthProvider>
     
    </div>
  )
}