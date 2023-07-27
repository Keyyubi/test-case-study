import { useEffect, useRef, useState } from "react";
import "./Modal.style.scss";

type ModalProps = {
	children: string | JSX.Element | JSX.Element[];
	isOpen: boolean;
	onClose: () => void;
};

function Modal(props: ModalProps) {
	const { isOpen, onClose, children } = props;
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(isOpen);
	}, [isOpen]);

	const closeModal = () => {
		setIsVisible(false);
		onClose();
	};

	const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (event.target === modalRef.current) {
			closeModal();
		}
	};

	return (
		<div className={`modal ${isVisible ? "visible" : ""}`} onClick={handleModalClick} ref={modalRef}>
			<div className="modal-content rounded-0">{children}</div>
		</div>
	);
}

export default Modal;
