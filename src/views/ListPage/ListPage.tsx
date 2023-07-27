import { useContext, useEffect, useMemo, useState } from "react";
import "./ListPage.style.scss";
import { Airport, Flight } from "../../global/types";
import { AppContext } from "../../App";
import FlightRow from "../../components/FlightRow/FlightRow";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "../../components/Switch/Switch";

type SortingOptions = "price" | "departure";

const sortByPrice = (flights: Flight[]) => {
	return flights?.sort(
		(a: Flight, b: Flight) =>
			a.fareCategories.ECONOMY.subcategories[0].price.amount - b.fareCategories.ECONOMY.subcategories[0].price.amount
	);
};

const sortByDeparture = (flights: Flight[]) => {
	return flights?.sort((a: Flight, b: Flight) => {
		const timeA = new Date(`1970-01-01T${a.departureDateTimeDisplay}:00Z`);
		const timeB = new Date(`1970-01-01T${b.departureDateTimeDisplay}:00Z`);

		if (isNaN(timeA.getTime()) || isNaN(timeB.getTime())) {
			return 0;
		}

		return timeA.getTime() - timeB.getTime();
	});
};

function ListPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const appData = useContext(AppContext);

	const [selectedClass, setSelectedClass] = useState<string | null>(null);
	const [promotion, setPromotion] = useState<boolean>(false);
	const [sorting, setSorting] = useState<SortingOptions>("price");

	useEffect(() => {
		const origin = localStorage.getItem("origin");
		const destination = localStorage.getItem("destination");
		const passengers = localStorage.getItem("passengers");

		if (!appData?.origin && origin) {
			appData?.updateOrigin(JSON.parse(origin) as Airport);
		}
		if (!appData?.destination && destination) {
			appData?.updateDestination(JSON.parse(destination) as Airport);
		}
		if (!appData?.passengers && passengers) {
			appData?.updatePassengers(Number(passengers));
		}
	}, []);

	const flights = location.state;

	const sortedFlights = useMemo(() => {
		if (sorting === "price") {
			return sortByPrice(flights);
		} else return sortByDeparture(flights);
	}, [sorting]);

	const handleSorting = (newOrder: SortingOptions) => {
		localStorage.setItem("sorting", newOrder);
		setSorting(newOrder);
	};

	return (
		<div className="listed-flights-page container-fluid">
			<Header theme="light" />
			<div className="container p-0 info">
				<button className="btn btn-sm mb-2 rounded-0 text-light" onClick={() => navigate("/")}>
					Uçuş
				</button>
				<div className="info-row">
					{`${appData?.origin?.title} - ${appData?.destination?.title}, ${appData?.passengers} Yolcu`}
				</div>
				<div className="promotion">
					<span>Promosyon Kodu</span>
					<Switch checked={promotion} onCheck={() => setPromotion(!promotion)} />
				</div>
				<div className={`promotion-info ${promotion ? "" : "d-none"}`}>
					<p>Promosyon Kodu seçeneği ile tüm Economy kabini Eco Fly paketlerini %50 indirimle satın alabilirsiniz.</p>
					<p>Promosyon Kodu seçeneği aktifken Eco Fly paketi haricinde seçim yapılmamaktadır.</p>
				</div>
			</div>
			<div className="container listed-flights p-0">
				<div className="list-header d-flex justify-content-end align-items-center gap-2 text-light">
					<span>Sıralama Kriteri</span>
					<button
						className={`btn btn-sm btn-outline-light ${sorting === "price" ? "active" : ""}`}
						onClick={() => handleSorting("price")}>
						Ekonomi Ücreti
					</button>
					<button
						className={`btn btn-sm btn-outline-light ${sorting === "departure" ? "active" : ""}`}
						onClick={() => handleSorting("departure")}>
						Kalkış Saati
					</button>
				</div>

				{sortedFlights?.map((flight: Flight, index: number) => (
					<FlightRow
						key={`flight-${index}`}
						flight={flight}
						rowIndex={index}
						selectedFlightClass={selectedClass}
						onFlightClassSelect={setSelectedClass}
						isPromoted={promotion}
					/>
				))}
			</div>
		</div>
	);
}

export default ListPage;
