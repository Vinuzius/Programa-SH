import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroEventoPage from "./CadastroEventoPage.tsx";
import NotFoundPage from "./NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/cadastro-evento",
    element: <CadastroEventoPage />,
  },
  {
    path: "/materiais",
    element: <h1>Materiais</h1>,
  },
  {
    path: "/calendario",
    element: <h1>Calendario</h1>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
