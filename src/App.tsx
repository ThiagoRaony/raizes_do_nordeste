import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { LgpdBanner } from "./components/LgpdBanner";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter basename={__BASE_PATH__}>
            <AppRoutes />
            <LgpdBanner />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default App;
