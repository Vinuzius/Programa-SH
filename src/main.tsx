import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CadastroEventoPage from "./pages/CadastroEvento/CadastroEventoPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import EventosPage from "./pages/EventosPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/evento/em-andamento" replace />,
      },
      {
        path: "/evento/:status",
        element: <EventosPage />,
      },
      {
        path: "/materiais",
        element: <h1>Materiais</h1>,
      },
      {
        path: "/calendario",
        element: <h1>Calendario</h1>,
      },
    ],
  },
  {
    path: "/cadastro-evento",
    element: <CadastroEventoPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
