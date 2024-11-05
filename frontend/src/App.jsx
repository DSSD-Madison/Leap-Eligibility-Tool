import { useState } from 'react'
import Home from './pages/Home.jsx'
import Form from './pages/Form.jsx'
import IncentivesList from './pages/IncentivesList';
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
  }, {
    path: "/q/county/:countyID",
    element: <Form />
  }, 
  {
    path: "/incentives/:encodedAnswers",
    element: <IncentivesList/>, //added a route for IncentivesList
  },
];

const router = createBrowserRouter(
    allRoutes.map((route) => ({
        ...route,
        element: <Layout>{route.element}</Layout>,
    }))
);  

function App() {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
