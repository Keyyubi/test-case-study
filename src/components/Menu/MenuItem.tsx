import { MenuItemProps } from "./Menu.types";

function MenuItem(props: MenuItemProps) {
	const { title, onClick } = props;
	return (
		<div className="menu-item" onClick={onClick}>
			{title}
		</div>
	);
}

export default MenuItem;
