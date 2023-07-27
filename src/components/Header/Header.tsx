import "./Header.style.scss";

type HeaderProps = {
	theme: "light" | "dark";
};
function Header(props: HeaderProps) {
	const { theme } = props;

	return (
		<div className={`${theme === "light" ? "header-light" : "header-dark"}`}>
			<a href="https://www.turkishairlines.com">
				<strong>turkishairlines.com</strong>
			</a>
			<span>
				search<strong>Flight challenge</strong>
			</span>
		</div>
	);
}

export default Header;
