import SearchBox from "../../components/SearchBox/SearchBox";
import "./SearchPage.scss";

import Popover from "../../components/Popover/Popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faChevronRight, faPeopleGroup, faPerson } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import RadioGroup from "../../components/RadioGroup/RadioGroup";
import Modal from "../../components/Modal/Modal";
import { Airport } from "../../global/types";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { AppContext } from "../../App";

const errorMessages = {
	flightNotFound: "Seçilen kriterlerde uçuş bulunamadı.",
	searchBoxEmpty: "Lütfen kalkış/varış noktalarını seçiniz.",
};

function SearchPage() {
	const navigate = useNavigate();

	const [seatClass, setSeatClass] = useState("0");
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMsg, setErrorMsg] = useState<null | string>(null);

	const appData = useContext(AppContext);
	const flights = appData?.flights;
	const airports = appData?.airports;

	const onSearch = () => {
		if (!appData?.origin || !appData?.destination) {
			setErrorMsg(errorMessages.searchBoxEmpty);
			setShowErrorModal(true);

			return;
		}

		let filteredFlights = flights?.filter(
			(flight) =>
				flight.originAirport.code === appData?.origin?.id && flight.destinationAirport.code === appData?.destination?.id
		);

		if (!filteredFlights?.length) {
			setErrorMsg(errorMessages.flightNotFound);
			setShowErrorModal(true);

			return;
		} else {
			navigate("/listed-flights", { state: filteredFlights });
		}
	};

	const handleModalClose = () => {
		setShowErrorModal(false);
	};

	const handleSelect = (option: Airport | null, target?: "origin" | "destination") => {
		switch (target) {
			case "origin":
				option ? localStorage.setItem("origin", JSON.stringify(option)) : localStorage.removeItem("origin");
				appData?.updateOrigin(option);
				break;

			case "destination":
				option ? localStorage.setItem("destination", JSON.stringify(option)) : localStorage.removeItem("destination");
				appData?.updateDestination(option);
				break;
		}
	};

	const handlePassengers = (amount: number) => {
		let current = appData?.passengers || 1;
		if (amount > 0) {
			current++;
		} else {
			if (current > 1) current--;
		}

		localStorage.setItem("passengers", String(current));
		appData?.updatePassengers(current);
	};

	useEffect(() => {
		const storedPassenger = localStorage.getItem("passengers");

		if (storedPassenger !== null) {
			appData?.updatePassengers(Number(storedPassenger));
		}
	}, []);

	const popoverContent = (
		<div className="container">
			<h5>Kabin ve yolcu seçimi</h5>
			<div className="row">
				<RadioGroup
					name="seat-class"
					options={[
						{ label: "Economy Class", value: "0" },
						{ label: "Business Class", value: "1" },
					]}
					selectedValue={seatClass}
					onSelectionChange={(value: string) => setSeatClass(value)}
				/>
			</div>
			<div className="row mb-2 justify-content-center">
				<div className="col-6 d-flex align-items-center">Yolcu</div>
				<div className="col-4">
					<div className="row">
						<button className="col btn btn-sm btn-secondary" onClick={() => handlePassengers(-1)}>
							-
						</button>
						<div className="col d-flex justify-content-center align-items-center">{appData?.passengers}</div>
						<button className="col btn btn-sm btn-secondary" onClick={() => handlePassengers(1)}>
							+
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	const modalContent = (
		<div className="container error-content">
			<div className="row">{errorMsg}</div>
			<div className="row my-2">
				<div className="divider"></div>
			</div>
			<div className="row">
				<button className="btn rounded-0 action-button" onClick={handleModalClose}>
					Kapat
				</button>
			</div>
		</div>
	);

	return (
		<div className="search-page container-fluid">
			<Header theme="dark" />
			<div className="container text-light text-center mt-5 mb-4">
				<h1 style={{ fontSize: "42px", fontWeight: 300, marginBottom: "0" }}>Merhaba</h1>
				<h5 style={{ fontSize: "28px", fontWeight: 200 }}>Nereyi keşfetmek istersiniz?</h5>
			</div>
			<div className="search-bar container">
				<div className="row">
					<div className="col-lg-4 col-md-4 my-1">
						<SearchBox options={airports} onSelect={handleSelect} placeholder="Nereden" task="origin" />
					</div>
					<div className="col-lg-4 col-md-4 my-1">
						<SearchBox options={airports} onSelect={handleSelect} placeholder="Nereye" task="destination" />
					</div>
					<div className="col-lg-4 col-md-4 my-1 d-flex date-passenger">
						<div className="button-box date">
							<span>Tarih</span>
							<FontAwesomeIcon color="#9a97a5" size="lg" icon={faCalendarDays} />
						</div>

						<Popover
							className="button-box passenger"
							content={popoverContent}
							trigger={
								<div className="popover-trigger">
									<span style={{ color: "#fff" }}>{appData?.passengers}</span>
									<div className="icon">
										<FontAwesomeIcon
											color="#9a97a5"
											size="lg"
											icon={appData && appData.passengers > 1 ? faPeopleGroup : faPerson}
										/>
									</div>
								</div>
							}
							showArrow
							width="300px"
							left="18%"
						/>

						<button className="action-button" onClick={onSearch}>
							<FontAwesomeIcon color="#fff" size="2x" icon={faChevronRight} />
						</button>
					</div>
				</div>

				{showErrorModal && (
					<Modal isOpen={showErrorModal} onClose={handleModalClose}>
						{modalContent}
					</Modal>
				)}
			</div>
		</div>
	);
}

export default SearchPage;
