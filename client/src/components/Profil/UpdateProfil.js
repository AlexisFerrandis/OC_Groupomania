import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../AppContext";
import axios from "axios";
import UploadImg from "./UploadImg";
import UserInfos from "./UserInfos";

// container for profil
const UpdateProfil = () => {
	const userId = useContext(UserContext);
	const [userPic, setUserPic] = useState();
	const [userFirstName, setUserFirstName] = useState();
	const [userLastName, setUserLastName] = useState();
	const [userMail, setUserMail] = useState();

	// user info
	useEffect(() => {
		const getUserInfo = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
				withCredentials: true,
			})
				.then((res) => {
					setUserFirstName(res.data.user_first_name);
					setUserLastName(res.data.user_last_name);
					setUserMail(res.data.user_mail);
					setUserPic(res.data.user_picture);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		getUserInfo();

		if (userFirstName && userPic);
	}, [userId, userFirstName, userPic]);

	return (
		<>
			{" "}
			<div className="profil-container">
				<UploadImg img={userPic} userId={userId} userFirstName={userFirstName} />
				<UserInfos userFirstName={userFirstName} userLastName={userLastName} userMail={userMail} userId={userId} />
			</div>
		</>
	);
};

export default UpdateProfil;
