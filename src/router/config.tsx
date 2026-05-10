import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Login from "../pages/login/page";
import EscolhaLogin from "../pages/escolha-login/page";
import Cardapio from "../pages/cardapio/page";
import Produto from "../pages/produto/page";
import Carrinho from "../pages/carrinho/page";
import Acompanhamento from "../pages/acompanhamento/page";
import Perfil from "../pages/perfil/page";
import Pedidos from "../pages/pedidos/page";
import Historia from "../pages/historia/page";
import Privacidade from "../pages/privacidade/page";
import Admin from "../pages/admin/page";
import AdminLogin from "../pages/admin-login/page";
import SplashScreen from "../pages/splash/page";
import RecuperarSenha from "../pages/recuperar-senha/page";
import PedidoConfirmado from "../pages/pedido-confirmado/page";
import Totem from "../pages/totem/page";

const routes: RouteObject[] = [
  {
    path: "/splash",
    element: <SplashScreen />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/recuperar-senha",
    element: <RecuperarSenha />,
  },
  {
    path: "/cardapio/:unitId",
    element: <Cardapio />,
  },
  {
    path: "/produto/:unitId/:productId",
    element: <Produto />,
  },
  {
    path: "/carrinho",
    element: <Carrinho />,
  },
  {
    path: "/acompanhamento/:orderId",
    element: <Acompanhamento />,
  },
  {
    path: "/pedido-confirmado/:orderId",
    element: <PedidoConfirmado />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/pedidos",
    element: <Pedidos />,
  },
  {
    path: "/historia",
    element: <Historia />,
  },
  {
    path: "/privacidade",
    element: <Privacidade />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/totem",
    element: <Totem />,
  },
  {
    path: "/escolha-login",
    element: <EscolhaLogin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;