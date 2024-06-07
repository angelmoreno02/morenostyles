/**
 * Archivo principal de la aplicación.
 * 
 * Este archivo es responsable de renderizar la aplicación en el elemento con el id "root" del DOM.
 * También importa los componentes necesarios, establece el tema de la aplicación y provee los contextos
 * necesarios para el funcionamiento de la aplicación.
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserContextProvider from "./context/UserContext";
import BudgetContextProvider from "./context/BudgetContext";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

//MUI
import { ThemeProvider, createTheme } from "@mui/material/styles";


const theme = createTheme({
	palette: {
		primary: {
			main: "#2196f3",
		},
		secondary: {
			main: "#4caf50",
		},
	},
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<UserContextProvider>
			<BudgetContextProvider>
				<Router>
					<App />
				</Router>
			</BudgetContextProvider>
		</UserContextProvider>
	</ThemeProvider>,
	document.getElementById("root")
);
