import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./AppContext";
import axios from "axios";

const NavBar = () => {
	const userId = useContext(UserContext);
	const [userPic, setUserPic] = useState();
	const [userFirstName, setUserFirstName] = useState();

	useEffect(() => {
		const getPicAndNAme = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
				withCredentials: true,
			})
				.then((res) => {
					setUserFirstName(res.data.user_first_name);
					setUserPic(res.data.user_picture);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		getPicAndNAme();

		if (userFirstName && userPic);
	}, [userId, userFirstName, userPic]);

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
							{userPic ? <img className="profil-pic" src={userPic} alt="profil-pic" /> : <img className="profil-pic" src="./assets/img/default.jpg" alt="profil-pic" />}
							<h5>{userFirstName}</h5>
						</NavLink>
					</li>
				</ul>
			) : (
				<ul></ul>
			)}
		</div>
	);
};

export default NavBar;
