import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, StyleFunctionProps } from "@chakra-ui/react";
import App from "./App";
import "./index.css";

import { extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import formTheme from "./theme/components/form-theme";
import { buttonTheme } from "./theme/components/button-theme";
import { inputTheme } from "./theme/components/input-theme";

const theme = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: "",
      },
    }),
  },
  components: {
    Form: formTheme,
    Button: buttonTheme,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
