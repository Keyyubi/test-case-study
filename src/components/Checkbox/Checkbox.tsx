import "./Checkbox.style.scss";

type CheckboxProps = {
	label: string;
	checked: boolean;
	onCheck: () => void;
};

const Checkbox = (props: CheckboxProps) => {
	const { checked, label, onCheck } = props;
	const handleChange = () => {
		onCheck();
	};

	return (
		<label className="checkbox-container">
			<input type="checkbox" checked={checked} onChange={handleChange} className="hidden-checkbox" />
			<div className={`custom-checkbox ${checked ? "checked" : ""}`}></div>
			{label}
		</label>
	);
};

export default Checkbox;
