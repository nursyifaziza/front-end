import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import router from "./routes/routes.jsx";
import globalStyles from "./themes/theme.jsx";

//Redux
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./state/index.jsx";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./state/api.jsx";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <ChakraProvider theme={globalStyles}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </RecoilRoot>
    </Provider>
  </React.StrictMode>
);
