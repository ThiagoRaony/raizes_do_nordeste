import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { LgpdBanner } from "./components/LgpdBanner";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter>
          <AppRoutes />
          <LgpdBanner />
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;