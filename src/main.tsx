import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CadastroEventoPage from "./pages/Event/CadastroEventoPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import EventosPage from "./pages/Event/EventosPage.tsx";
import MaterialPage from "./pages/Material/MaterialPage.tsx";
import CadastroMaterialPage from "./pages/Material/CadastroMaterialPage.tsx";

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
        path: "/material/:status",
        element: <MaterialPage />,
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
  {
    path: "/cadastro-material",
    element: <CadastroMaterialPage />,
  },
  {
    path: "/editar/:id",
    element: <CadastroEventoPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
