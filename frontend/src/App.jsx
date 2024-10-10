import { useState } from 'react'
import Home from './pages/Home.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <p>Page not found</p>,
  },
]);

function App() {
  // testing branch
  return (
    <RouterProvider router={router} />
  )
}

export default App
