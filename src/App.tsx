import { createContext, useState } from "react";
import { Airport, Flight } from "./global/types";
import MockData from "../flights.json";

interface SharedData {
	flights: Flight[];
	airports: Airport[];
	origin: Airport | null;
	destination: Airport | null;
	passengers: number;
	updateOrigin: (airport: Airport | null) => void;
	updateDestination: (airport: Airport | null) => void;
	updatePassengers: (number: number) => void;
}

export const AppContext = createContext<null | SharedData>(null);

function App(props: any) {
	const [origin, setOrigin] = useState<Airport | null>(null);
	const [destination, setDestination] = useState<Airport | null>(null);
	const [passengers, setPassengers] = useState<number>(1);

	const updateOrigin = (newOrigin: Airport | null) => {
		setOrigin(newOrigin);
	};

	const updateDestination = (newDestination: Airport | null) => {
		setDestination(newDestination);
	};

	const updatePassengers = (newPassengers: number) => {
		setPassengers(newPassengers);
	};

	const sharedData: SharedData = {
		flights: MockData.flights,
		airports: MockData.airports,
		origin,
		destination,
		passengers,
		updateOrigin,
		updateDestination,
		updatePassengers,
	};

	return <AppContext.Provider value={sharedData}>{props.children}</AppContext.Provider>;
}

export default App;
