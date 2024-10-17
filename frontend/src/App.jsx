import { useState } from 'react';
import Home from './pages/Home.jsx';
import IncentivesList from './IncentivesList';
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
  {
    path: "/incentives",
    element: <IncentivesList />, //added a route for IncentivesList
  },
];

const router = createBrowserRouter(allRoutes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
