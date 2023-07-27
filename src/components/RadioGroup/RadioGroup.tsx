import { RadioGroupProps } from "./RadioGroup.types";
import "./RadioGroup.style.scss";

function RadioGroup(props: RadioGroupProps) {
	const { options, name, selectedValue, onSelectionChange } = props;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedOption = event.target.value;
		onSelectionChange(selectedOption);
	};

	return (
		<div className="radio-group-container">
			{options.map((option) => (
				<label key={option.value}>
					<input
						type="radio"
						name={name}
						value={option.value}
						checked={selectedValue === option.value}
						onChange={handleChange}
					/>
					{option.label}
				</label>
			))}
		</div>
	);
}

export default RadioGroup;
