import { useState } from "react";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layouts/Layout.jsx";

const allRoutes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
];

const router = createBrowserRouter(
  allRoutes.map((route) => ({
    ...route,
    element: <Layout>{route.element}</Layout>,
    errorElement: <Layout>{route.errorElement}</Layout>,
  }))
);

function App() {
  // testing branch
  return <RouterProvider router={router} />;
}

export default App;
