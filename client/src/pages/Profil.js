import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";
import UpdateProfil from "../components/Profil/UpdateProfil";

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
					<UpdateProfil />
				</div>
			)}
		</div>
	);
};

export default Profil;
