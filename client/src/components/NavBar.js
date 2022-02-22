import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import { useContext } from "react";
import { UserContext } from "./AppContext";

const NavBar = () => {
	const userConnexion = useContext(UserContext);

	return (
		<div className="nav-container">
			<NavLink to="/">
				<img className="logo" src="./assets/logos/icon-left-font-monochrome-black.png" alt="logo" />
			</NavLink>
			{userConnexion ? (
				<ul>
					<li></li>
					<li className="welcome">
						<NavLink to="/profil">
							<h5>Bienvenue UTILISATEUR</h5>
						</NavLink>
					</li>
					<Logout />
				</ul>
			) : (
				<ul></ul>
			)}
		</div>
	);
};

export default NavBar;
