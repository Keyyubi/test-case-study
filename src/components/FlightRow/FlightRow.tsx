import { Flight, SubFareCategory } from "../../global/types";
import "./FlightRow.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../Checkbox/Checkbox";
import FareBox from "../FareBox/FareBox";
import { useNavigate } from "react-router-dom";

type FlightProps = {
	flight: Flight;
	selectedFlightClass: string | null;
	rowIndex: number;
	isPromoted: boolean;
	onFlightClassSelect: (value: string) => void;
};

function FlightRow(props: FlightProps) {
	const { flight, isPromoted, selectedFlightClass, rowIndex, onFlightClassSelect } = props;
	const navigate = useNavigate();

	const handleFlightClassSelect = (value: string) => {
		onFlightClassSelect(value);
	};

	const handleFareSelect = (fare: SubFareCategory) => {
		const totalAmount = isPromoted ? fare.price.amount / 2 : fare.price.amount;
		navigate("/result", {
			state: { status: fare.status, totalAmount, currency: fare.price.currency },
		});
	};

	const renderClassOptions = () => {
		let categories: SubFareCategory[];

		if (selectedFlightClass === `economy-${rowIndex}`) categories = flight.fareCategories.ECONOMY.subcategories;
		else if (selectedFlightClass === `business-${rowIndex}`) categories = flight.fareCategories.BUSINESS.subcategories;
		else categories = [];

		if (isPromoted)
			categories = categories.map((category) => {
				return {
					...category,
					price: {
						currency: category.price.currency,
						amount: category.price.amount / 2,
					},
				};
			});

		return categories.map((fare) => (
			<div key={fare.brandCode + selectedFlightClass} className="col-4 p-2">
				<FareBox fare={fare} disabled={isPromoted && fare.brandCode !== "ecoFly"} onSelect={handleFareSelect} />
			</div>
		));
	};

	return (
		<div className="row flight-row">
			<div className="col-lg-6 col-md-12">
				<div className="col-wrapper d-flex p-2">
					<div className="legs">
						<div className="origin">
							<span className="time">{flight.departureDateTimeDisplay}</span>
							<span className="code">{flight.originAirport.city.code}</span>
							<span className="city">{flight.originAirport.city.name}</span>
						</div>
						<div className="line"></div>
						<div className="destination">
							<span className="time">{flight.arrivalDateTimeDisplay}</span>
							<span className="code">{flight.destinationAirport.city.code}</span>
							<span className="city">{flight.destinationAirport.city.name}</span>
						</div>
					</div>
					<div className="flight-info">
						<span className="title">Uçuş Süresi</span>
						<span className="time">{flight.flightDuration}</span>
					</div>
				</div>
			</div>

			<div className="col-lg-3 col-sm-12 col-md-12" onClick={() => handleFlightClassSelect(`economy-${rowIndex}`)}>
				<div className="col-wrapper flight-class p-2">
					<Checkbox
						label="ECONOMY"
						checked={selectedFlightClass === `economy-${rowIndex}`}
						onCheck={() => handleFlightClassSelect(`economy-${rowIndex}`)}
					/>

					<div className="d-flex flex-column justify-content-center">
						<span>Yolcu Başına</span>
						<span>
							{flight.fareCategories.ECONOMY.subcategories[0].price.currency}{" "}
							{isPromoted
								? flight.fareCategories.ECONOMY.subcategories[0].price.amount / 2
								: flight.fareCategories.ECONOMY.subcategories[0].price.amount}
						</span>
					</div>

					<div className="">
						<FontAwesomeIcon
							icon={selectedFlightClass === `economy-${rowIndex}` ? faChevronUp : faChevronDown}
							size="sm"
							color="#9a97a5"
						/>
					</div>
				</div>
			</div>

			<div className="col-lg-3 col-sm-12 col-md-12" onClick={() => handleFlightClassSelect(`business-${rowIndex}`)}>
				<div className="col-wrapper flight-class p-2">
					<Checkbox
						label="BUSINESS"
						checked={selectedFlightClass === `business-${rowIndex}`}
						onCheck={() => handleFlightClassSelect(`business-${rowIndex}`)}
					/>
					<div className="d-flex flex-column justify-content-center">
						<span>Yolcu Başına</span>
						<span>
							{flight.fareCategories.BUSINESS.subcategories[0].price.currency}{" "}
							{isPromoted
								? flight.fareCategories.BUSINESS.subcategories[0].price.amount / 2
								: flight.fareCategories.BUSINESS.subcategories[0].price.amount}
						</span>
					</div>
					<div className="icon">
						<FontAwesomeIcon
							icon={selectedFlightClass === `business-${rowIndex}` ? faChevronUp : faChevronDown}
							size="sm"
							color="#9a97a5"
						/>
					</div>
				</div>
			</div>

			{renderClassOptions()}
		</div>
	);
}

export default FlightRow;
