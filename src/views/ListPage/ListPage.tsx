import { useContext, useState } from "react";
import "./ListPage.style.scss";
import { AppContext } from "../../main";
import { Flight, SubFareCategory } from "../../global/types";
import FlightRow from "../../components/FlightRow/FlightRow";
import Header from "../../components/Header/Header";

function ListPage() {
	const [selectedClass, setSelectedClass] = useState<string | null>(null);

	const flights = useContext(AppContext)?.flights.filter(
		(flight: Flight) =>
			flight.originAirport.code === localStorage.getItem("origin") &&
			flight.destinationAirport.code === localStorage.getItem("destination")
	);

	return (
		<div className="listed-flights-page container-fluid">
			<Header theme="light" />
			<div className="container listed-flights">
				{flights?.map((flight: Flight, index) => (
					<FlightRow
						key={`flight-${index}`}
						flight={flight}
						rowIndex={index}
						selectedFlightClass={selectedClass}
						onFlightClassSelect={setSelectedClass}
					/>
				))}
			</div>
		</div>
	);
}

export default ListPage;
