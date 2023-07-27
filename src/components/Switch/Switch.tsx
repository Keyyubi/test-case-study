import "./Switch.style.scss";

type SwithProps = {
	checked: boolean;
	onCheck?: () => void;
};
function Switch(props: SwithProps) {
	return (
		<label className="switch">
			<input type="checkbox" checked={props.checked} onChange={props.onCheck} />
			<span className="slider"></span>
		</label>
	);
}

export default Switch;
