import { faCheckCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultPage.style.scss";
import Header from "../../components/Header/Header";

function ResultPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { status, totalAmount, currency } = location.state;

	return (
		<div className="container-fluid result-page">
			<Header theme="light" />
			<div className="container result mt-3">
				<div className="row">
					<div className="col d-flex align-items-center">
						<FontAwesomeIcon icon={status ? faCheckCircle : faCircleXmark} color={status ? "green" : "red"} size="2x" />
						<b style={{ marginLeft: "16px" }}>Kabin seçiminiz {status ? "tamamlandı" : "tamamlanamadı"}.</b>
					</div>
				</div>
				<hr />
				<div className="row summary">
					{status ? (
						<div className="col d-flex justify-content-between align-items-center">
							<h5>Toplam Tutar</h5>
							<span>{currency + " " + totalAmount}</span>
						</div>
					) : (
						<div className="col d-flex justify-content-end">
							<button className="btn btn-sm rounded-0 text-light px-3" onClick={() => navigate("/")}>
								Başa Dön
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ResultPage;
