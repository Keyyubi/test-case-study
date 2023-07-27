import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "./views/SearchPage/SearchPage.tsx";
import ListPage from "./views/ListPage/ListPage.tsx";
import ResultPage from "./views/ResultPage/ResultPage.tsx";
import App from "./App.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <SearchPage />,
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
		<App>
			<RouterProvider router={router} />
		</App>
	</React.StrictMode>
);
