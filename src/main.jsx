import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../node_modules/modern-normalize/modern-normalize.css";
import Theme from "./styles/GlobalStyles";
import Root, { loader as shopLoader } from "./routes/root";
import ErrorPage from "./routes/ErrorPage";
import Shop from "./routes/Shop";
import Cart from "./routes/Cart";
import ShopItemPreview from "./routes/ShopItemPreview";
import Index from "./routes/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: shopLoader,
    children: [
      {
        index: true, element: <Index />
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "/shop/:itemId",
        element: <ShopItemPreview />
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>
);
