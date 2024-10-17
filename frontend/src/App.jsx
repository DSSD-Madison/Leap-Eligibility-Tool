import { useState } from 'react'
import Home from './pages/Home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./layouts/Layout.jsx";

const allRoutes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <p>Page not found</p>,
  },
];

const router = createBrowserRouter(
  allRoutes.map((route) => ({
    ...route,
    element: <Layout>{route.element}</Layout>,
  }))
);

function App() {
  // testing branch
  return (
    <RouterProvider router={router} />  
  )
}

export default App
