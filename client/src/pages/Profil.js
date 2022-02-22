import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const Profil = () => {
	const userId = useContext(UserContext);

	return (
		<div>
			{!userId ? (
				<>
					<Log />
				</>
			) : (
				<div className="profil-page">
					<div className="profil-picture-container">
						<div className="profil-img">
							<img src="./assets/img/default.jpg" alt="profil-pic" />
						</div>
						<div className="TODO">Changer la photo de profil</div>
					</div>
					<div className="infos-container">
						<h2>Profil</h2>
					</div>
				</div>
			)}
		</div>
	);
};

export default Profil;
