/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./ui/layouts/AppLayout.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import { lazy, Suspense } from "react";
import PageLoader from "./ui/common/PageLoader.tsx";
import SignUp from "./pages/SignUp";

// fetch user after open app
import { useEffect } from "react";
import { fetchUserInfo } from "./redux/authSlide";
import { useAppDispatch } from "./redux/store";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import("./pages/Home"));
const Movies = lazy(() => import("./pages/Movies"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ProfileLayout = lazy(() => import("./ui/layouts/ProfileLayout.tsx"));
const Profile = lazy(() => import("./pages/Profile"));
const ChangeEmail = lazy(() => import("./pages/ChangeEmail.tsx"));
const ChangeEmailResult = lazy(() => import("./pages/ChangeEmailResult.tsx"));
const ChangePassword = lazy(() => import("./pages/ChangePassword.tsx"));

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
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
      {
        element: <ProfileLayout />,
        children: [
          { path: "profile", element: <Profile /> },
          { path: "change-email", element: <ChangeEmail /> },
          { path: "change-password", element: <ChangePassword /> },
        ],
      },
      {
        path: "change-email-result/:token",
        element: <ChangeEmailResult />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

function App() {
  // fetch user after open app
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        toastStyle={{
          background: "#303030",
          color: "white",
          border: "1px solid #868686",
          fontFamily: "Parkinsans, sans-serif",
        }}></ToastContainer>

      {/* <ReactQueryDevtools initialIsOpen={false} /> */}

      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
