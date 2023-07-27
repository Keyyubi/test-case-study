import { SubFareCategory } from "../../global/types";
import "./FareBox.style.scss";

type FareBoxProps = {
	fare: SubFareCategory;
	disabled?: boolean;
	onSelect: () => void;
};

const camelCaseToSeparatedWords = (input: string) => {
	return input.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
};

function FareBox(props: FareBoxProps) {
	const { fare, disabled, onSelect } = props;

	return (
		<div className="seat-box-wrapper">
			<div className="header">
				<b>{camelCaseToSeparatedWords(fare.brandCode)}</b>
				<div className="d-flex align-items-start">
					<small>{fare.price.currency}</small>
					<b>{fare.price.amount}</b>
				</div>
			</div>

			<div className="content">
				{fare.rights.map((right, index) => (
					<div key={`${fare.brandCode}-right-${index}`} className="content-item">
						{right}
					</div>
				))}
			</div>

			<button disabled={disabled} onClick={onSelect}>
				Uçuşu Seç
			</button>
		</div>
	);
}

export default FareBox;
