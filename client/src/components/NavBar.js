import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Log/Logout";
import { useContext } from "react";
import { UserContext } from "./AppContext";
// import axios from "axios";

const NavBar = () => {
	const userId = useContext(UserContext);

	// const getUserName = async () => {
	// 	await axios({
	// 		method: "get",
	// 		url: `${process.env.REACT_APP_API_URL}api/user/1`,
	// 		withCredentials: true,
	// 	})
	// 		.then((res) => {
	// 			console.log(res);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	// getUserName();

	return (
		<div className="nav-container">
			<ul></ul>
			<NavLink to="/">
				<img className="logo" src="./assets/logos/icon-left-font-monochrome-black.png" alt="logo" />
			</NavLink>
			{userId ? (
				<ul>
					<li></li>
					<li className="welcome">
						<NavLink to="/profil">
							<img className="profil-pic" src="./assets/img/default.jpg" alt="profil-pic" />
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
