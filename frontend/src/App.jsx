import Home from './pages/Home.jsx'
import Form from './pages/Form.jsx'
import IncentivesList from './pages/IncentivesList';
import { Suspense } from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/Layout.jsx";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="loading loading-spinner loading-lg text-primary"></div>
  </div>
);

const withLoadingState = (Component) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

const allRoutes = [
  {
    path: "/",
    element: <Home/>,
  }, {
    path: "/q/county/:countyID",
    element: <Form />
  }, 
  {
    path: "/incentives/:encodedAnswers",
    element: <IncentivesList/>,
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
    <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />
  );
}

export default App;