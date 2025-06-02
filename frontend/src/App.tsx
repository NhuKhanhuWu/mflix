/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { lazy, Suspense } from "react";
import PageLoader from "./ui/PageLoader";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/theaters", element: <p>movies</p> },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movie/:slug",
        element: <MovieDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
