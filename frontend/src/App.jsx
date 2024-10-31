import {useState} from 'react';
import Home from './pages/Home.jsx';
import IncentivesList from './pages/IncentivesList';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Layout from "./layouts/Layout.jsx";

const allRoutes = [
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/incentives",
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
