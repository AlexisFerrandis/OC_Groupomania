import React from "react";
import Logout from "../Log/Logout";

const UserInfos = ({ userFirstName, userLastName, userMail }) => {
	return (
		<div className="infos-container">
			<h1>
				Profil de <span>{userFirstName}</span>
			</h1>
			<div className="info">
				<div>
					<p>
						Prenom :<span>{userFirstName}</span>
					</p>
				</div>
				<div>
					<p>
						Nom :<span>{userLastName}</span>
					</p>
				</div>
				<div>
					<p>
						Email:
						<span>{userMail}</span>
					</p>
				</div>
			</div>
			<Logout />
			<div id="deleteAccount">Supprimer le compte</div>
		</div>
	);
};

export default UserInfos;
