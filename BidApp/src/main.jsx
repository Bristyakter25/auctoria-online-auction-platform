import { StrictMode } from "react"; // Import once
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Route/Routes.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider";
import { WishlistProvider } from "./providers/wishListProvider.jsx";
import store from "./Redux/app/store.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
       <WishlistProvider>
       <Provider store={store}>
       <RouterProvider router={router} />
       </Provider>
       </WishlistProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
