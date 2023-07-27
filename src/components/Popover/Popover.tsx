import { useState, useRef, useEffect, ReactNode } from "react";
import "./Popover.style.scss";

type PopoverProps = {
	className?: string;
	width?: string;
	left?: string;
	showArrow?: boolean;
	content: ReactNode;
	trigger: ReactNode;
};

function Popover(props: PopoverProps) {
	const { className, content, trigger, showArrow, width = "200px", left = "50%" } = props;
	const [showPopover, setShowPopover] = useState(false);
	const popoverRef = useRef<HTMLDivElement | null>(null);

	const handleTogglePopover = () => {
		setShowPopover((prevState) => !prevState);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
			setShowPopover(false);
		}
	};

	useEffect(() => {
		if (showPopover) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showPopover]);

	return (
		<div className={className}>
			<div onClick={handleTogglePopover} style={{ width: "100%", height: "100%" }}>
				{trigger}
			</div>
			{showPopover && (
				<div ref={popoverRef} className={`popover rounded-0 ${showArrow && "popover-arrow"}`} style={{ width, left }}>
					{content}
				</div>
			)}
		</div>
	);
}

export default Popover;
