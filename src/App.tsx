import { HashRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { LgpdBanner } from "./components/LgpdBanner";

function App() {
  const baseName = import.meta.env.PROD ? "/raizes_do_nordeste" : "";
  return (
    <AuthProvider>
      <CartProvider>
        <HashRouter basename={baseName}>
          <AppRoutes />
          <LgpdBanner />
        </HashRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;