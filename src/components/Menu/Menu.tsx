import { MenuProps } from "./Menu.types";
import "./Menu.style.scss";

function Menu(props: MenuProps) {
	const { children } = props;
	return <div className="menu">{children}</div>;
}

export default Menu;
