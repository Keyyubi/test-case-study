import { Flight } from "../../global/types";
import "./FlightRow.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../Checkbox/Checkbox";
import FareBox from "../SeatClassBox/FareBox";

type FlightProps = {
	flight: Flight;
	flightClass: string | null;
	rowIndex: number;
	onSeatClassSelect: (value: string) => void;
};

function FlightRow(props: FlightProps) {
	const { flight, flightClass, rowIndex, onSeatClassSelect } = props;

	const getAvailableSeatClasses = () => {
		const fareClass = flightClass?.split("-")[0];
		const categories =
			fareClass === "economy"
				? flight.fareCategories.ECONOMY.subcategories
				: flight.fareCategories.BUSINESS.subcategories;

		return (
			<div className="col-lg-12 my-2">
				<div className="col-wrapper d-flex p-2">
					{categories.map((fare) => (
						<div key={fare.brandCode + fareClass} className="col-4 p-2">
							<FareBox fare={fare} onSelect={() => console.log("ok")} />
						</div>
					))}
				</div>
			</div>
		);
	};

	const handleSeatClassSelect = (value: string) => {
		onSeatClassSelect(value);
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

			<div className="col-lg-3 col-sm-12 col-md-12" onClick={() => handleSeatClassSelect(`economy-${rowIndex}`)}>
				<div className="col-wrapper  seat-class p-2">
					<Checkbox
						label="ECONOMY"
						checked={flightClass === `economy-${rowIndex}`}
						onCheck={() => handleSeatClassSelect(`economy-${rowIndex}`)}
					/>

					<div className="d-flex flex-column justify-content-center">
						<span>Yolcu Başına</span>
						<span>
							{flight.fareCategories.ECONOMY.subcategories[0].price.currency}{" "}
							{flight.fareCategories.ECONOMY.subcategories[0].price.amount}
						</span>
					</div>

					<div className="">
						<FontAwesomeIcon
							icon={flightClass === `economy-${rowIndex}` ? faChevronUp : faChevronDown}
							size="sm"
							color="#9a97a5"
						/>
					</div>
				</div>
			</div>

			<div className="col-lg-3 col-sm-12 col-md-12" onClick={() => handleSeatClassSelect(`business-${rowIndex}`)}>
				<div className="col-wrapper  seat-class p-2">
					<Checkbox
						label="BUSINESS"
						checked={flightClass === `business-${rowIndex}`}
						onCheck={() => handleSeatClassSelect(`business-${rowIndex}`)}
					/>
					<div className="d-flex flex-column justify-content-center">
						<span>Yolcu Başına</span>
						<span>
							{flight.fareCategories.BUSINESS.subcategories[0].price.currency}{" "}
							{flight.fareCategories.BUSINESS.subcategories[0].price.amount}
						</span>
					</div>
					<div className="icon">
						<FontAwesomeIcon
							icon={flightClass === `business-${rowIndex}` ? faChevronUp : faChevronDown}
							size="sm"
							color="#9a97a5"
						/>
					</div>
				</div>
			</div>

			{flightClass && getAvailableSeatClasses()}
		</div>
	);
}

export default FlightRow;
