import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { lazy, Suspense, useState, useEffect } from "react";
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

// const [isDarkMode, setIsDarkMode] = useState(false)


const Main = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const routes = createBrowserRouter([
    {
      element: <Background isDarkMode={isDarkMode}/>,
  
      children: [
        {
          element: <ErrorBoundary isDarkMode={isDarkMode}/>,
  
          children: [
            {
              element: <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />,
              children: [
                {
                  path: "/",
                  element: <Home isDarkMode={isDarkMode}/>,
                },
                {
                  path: "repolist",
                  children: [
                    {
                      index: true,
                      element: <RepoList isDarkMode={isDarkMode}/>,
                    },
                    {
                      path: ":repoid",
                      element: <Repo isDarkMode={isDarkMode}/>,
                    },
                  ],
                },
                {
                  path: "/errorpage",
                  element: <Errors isDarkMode={isDarkMode}/>,
                },
              ],
            },
          ],
        },
        {
          path: "*",
          element: <Err404 isDarkMode={isDarkMode}/>,
        },
      ],
    },
  ]);

  return (
    <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={routes} />
    </Suspense>
  </React.StrictMode>
  )
}



ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
