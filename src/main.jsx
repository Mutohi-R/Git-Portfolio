

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./Styles/index.css";

import Home from "./Pages/Home";
import NavBar from "./NavBar";
const RepoList = lazy(() => import("./Pages/RepoList"));
const Repo = lazy(() => import("./Pages/Repo"));
import Errors from "./Components/Error";
import ErrorBoundary from "./Components/ErrorBoundary";
import Err404 from "./Pages/Err404"
import Loading from "./Components/Loading";
import Background from "./Components/Background";

const routes = createBrowserRouter([
  {
    element: <Background />,

    children: [
      {
        element: <ErrorBoundary />,

        children: [
          {
            element: <NavBar />,
            children: [
              {
                path: "/",
                element: <Home />,
              },
              {
                path: "repolist",
                children: [
                  {
                    index: true,
                    element: <RepoList />,
                  },
                  {
                    path: ":repoid",
                    element: <Repo />,
                  },
                ],
              },
              {
                path: "/errorpage",
                element: <Errors />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <Err404 />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes} />
    </Suspense>
  </React.StrictMode>
);
