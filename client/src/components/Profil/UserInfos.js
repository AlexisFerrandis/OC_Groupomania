import axios from "axios";
import React from "react";
import Logout from "../Log/Logout";
import cookie from "js-cookie";

const UserInfos = ({ userFirstName, userLastName, userMail, userId }) => {
	// logout and delete account

	const removeCookie = (key) => {
		if (window !== "undefined") {
			cookie.remove(key);
		}
	};
	const deleteAccount = () => {
		axios({
			method: "patch",
			baseURL: `${process.env.REACT_APP_API_URL}api/user/delete-account/${userId}`,
			withCredentials: true,
		})
			.then(() => removeCookie("jwt"))
			.catch((err) => console.log(err));
		window.location = "/connexion";
	};

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
			<div
				id="deleteAccount"
				onClick={() => {
					if (window.confirm("Voulez vous désactiver votre compte?")) {
						deleteAccount();
					}
				}}
			>
				Supprimer le compte
			</div>
		</div>
	);
};

export default UserInfos;
