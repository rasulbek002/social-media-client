// External dependencies
import React from "react";
import { Container } from "@material-ui/core";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Local dependencies
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Company from "./components/Company/Company";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/:id",
    element: <Company />,
  },
]);

function App() {
  return (
    <Container maxWidth="lg">
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
