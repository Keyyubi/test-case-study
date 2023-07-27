import { useEffect, useState } from "react";
import "./SearchBox.style.scss";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlaneArrival, faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { Airport } from "../../global/types";

type SearchBoxProps = {
	options: Airport[];
	placeholder: string;
	task: "origin" | "destination";
	onSelect: (option: Airport | null, target?: "origin" | "destination") => void;
};

function SearchBox(props: SearchBoxProps) {
	const { options, placeholder, task, onSelect } = props;
	const [search, setSearch] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
		setShowDropdown(true);
	};

	const handleMenuItemClick = (option: Airport) => {
		setSearch(option.title);
		setShowDropdown(false);
		onSelect(option, task);
	};

	const clearSearch = () => {
		setSearch("");
		localStorage.removeItem("origin");
		localStorage.removeItem("destination");
		onSelect(null);
	};

	useEffect(() => {
		const storedOption = localStorage.getItem(task);

		if (storedOption !== null) {
			const option = options.filter((option) => option.id === storedOption)[0];
			setSearch(option.title);
			onSelect(option, task);
		}
	}, []);

	const filteredOptions = options.filter((option: Airport) =>
		option.title.toLocaleLowerCase("tr").includes(search.toLocaleLowerCase("tr"))
	);

	return (
		<div className="search-box">
			<div className="icon">
				<FontAwesomeIcon color="#1f1f1f" size="lg" icon={task === "origin" ? faPlaneDeparture : faPlaneArrival} />
			</div>
			<input
				type="text"
				onFocus={() => setShowDropdown(true)}
				onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
				onChange={handleInputChange}
				placeholder={placeholder}
				value={search}
			/>
			{search.length > 0 && (
				<div className="icon icon-close" onClick={() => clearSearch()}>
					<FontAwesomeIcon color="#1f1f1f" size="1x" icon={faClose} />
				</div>
			)}
			{showDropdown && (
				<Menu>
					{filteredOptions.map((option: Airport) => (
						<MenuItem key={option.id} title={option.title} onClick={() => handleMenuItemClick(option)} />
					))}
				</Menu>
			)}
		</div>
	);
}

export default SearchBox;
