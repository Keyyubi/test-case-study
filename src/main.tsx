import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./views/SearchPage/SearchPage.tsx";
import { Airport, Flight } from "./global/types.tsx";
import MockData from "../flights.json";
import ListPage from "./views/ListPage/ListPage.tsx";
import ResultPage from "./views/ResultPage/ResultPage.tsx";

interface SharedData {
	flights: Flight[];
	selectedOrigin?: Airport;
	selectedDestination?: Airport;
}

export const AppContext = createContext<null | SharedData>(null);

const sharedData: SharedData = {
	flights: MockData.flights,
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <SearchPage airports={MockData.airports} />,
	},
	{
		path: "/listed-flights",
		element: <ListPage />,
	},
	{
		path: "/result",
		element: <ResultPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AppContext.Provider value={sharedData}>
			<RouterProvider router={router} />
		</AppContext.Provider>
	</React.StrictMode>
);
