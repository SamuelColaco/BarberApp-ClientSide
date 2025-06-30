import { Home } from "./components/Home/Home";
import { AuthContext, AuthProvider } from "./contexts/AuthContext";
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