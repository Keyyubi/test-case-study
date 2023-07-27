export type MenuProps = {
	children: string | JSX.Element | JSX.Element[];
};

// Maybe it's better to use it as interface to express object model
export type MenuItemProps = {
	title: string;
	onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
};
