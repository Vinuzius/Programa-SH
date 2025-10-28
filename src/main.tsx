import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CalendarPage from "./pages/CalendarPage.tsx";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventosPage from "./components/Event/EventosPage.tsx";
import MaterialPage from "./components/Material/MaterialPage.tsx";
import CadastroEventoPage from "./pages/CadastroEventoPage.tsx";
import CadastroMaterialPage from "./pages/CadastroMaterialPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

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
        path: "/evento",
        children: [
          {
            index: true,
            element: <Navigate to="/evento/em-andamento" replace />,
          },
          {
            path: ":status",
            element: <EventosPage />,
          },
        ],
      },

      {
        path: "/material",
        children: [
          {
            index: true,
            element: <Navigate to="/material/stock" replace />,
          },
          {
            path: ":status",
            element: <MaterialPage />,
          },
        ],
      },

      {
        path: "/calendario",
        element: <CalendarPage />,
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
