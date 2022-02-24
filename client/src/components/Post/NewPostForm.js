import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../AppContext";
import { isEmpty, timestampParser } from "../Utils";

const NewPostForm = () => {
	const userId = useContext(UserContext);
	const [userPic, setUserPic] = useState();
	const [userFirstName, setUserFirstName] = useState();

	useEffect(() => {
		const getUserInfo = async () => {
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

		getUserInfo();

		if (userFirstName && userPic);
	}, [userId, userFirstName, userPic]);

	const [message, setMessage] = useState("");
	const [postPicture, setPostPicture] = useState(null);
	const [video, setVideo] = useState("");
	const [file, setFile] = useState();
	const userData = 2;
	const error = 2;

	const handlePost = async () => {
		if (message || postPicture || video) {
			const formData = new FormData();
			formData.append("posterId", userId);
			formData.append("message", message);
			if (file) formData.append("file", file);
			formData.append("video", video);
			formData.append("timestamps", "1973-11-17");

			axios({
				method: "post",
				baseURL: `${process.env.REACT_APP_API_URL}api/post/`,
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: formData,
			})
				.then((res) => {
					if (res.err) {
						console.log(res.err);
					}
					// TODO thread append post
				})
				.catch((err) => {
					console.log(err);
				});

			cancelPost();
		} else {
			alert("Veuillez entrer un message");
		}
	};

	const handlePicture = (e) => {
		setPostPicture(URL.createObjectURL(e.target.files[0]));
		setFile(e.target.files[0]);
		setVideo("");
	};

	const cancelPost = () => {
		setMessage("");
		setPostPicture("");
		setVideo("");
		setFile("");
	};

	useEffect(() => {
		const handleVideo = () => {
			let findLink = message.split(" ");
			for (let i = 0; i < findLink.length; i++) {
				if (findLink[i].includes("https://www.yout") || findLink[i].includes("https://yout")) {
					let embed = findLink[i].replace("watch?v=", "embed/");
					setVideo(embed.split("&")[0]);
					findLink.splice(i, 1);
					setMessage(findLink.join(" "));
					setPostPicture("");
				}
			}
		};

		handleVideo();
	}, [userData, message, video]);

	return (
		<div className="post-container">
			<NavLink to="/profil">
				<div className="user-info">
					<img src={userPic} alt="user-img" className="user-img" />
					<h3>{userFirstName}</h3>
				</div>
			</NavLink>
			<div className="post-form">
				<textarea name="message" id="message" placeholder="Quoi de neuf ?" onChange={(e) => setMessage(e.target.value)} value={message} />

				{message || postPicture || video.length > 20 ? (
					<li className="card-container">
						<div className="card-header">
							<img src={userPic} alt="user-img" className="user-img" />{" "}
							<div className="poster-name">
								<h3>{userFirstName}</h3>
							</div>
							<span>{timestampParser(Date.now())}</span>
						</div>
						<div className="card-preview">
							<div className="content">
								<p>{message}</p>
								{postPicture && <img src={postPicture} alt="" className="img-preview" />}
								{video && <iframe src={video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={video}></iframe>}
							</div>
						</div>
					</li>
				) : null}

				<div className="footer-form">
					<div className="icon">
						{!video && (
							<>
								<img src="./assets/pictos/image.svg" alt="add pic" />
								<input type="file" id="fileUpload" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => handlePicture(e)} />
							</>
						)}
						{video && <button onClick={() => setVideo("")}>Supprimer vidéo</button>}
					</div>
					{!isEmpty(error.format) && <p>{error.format}</p>}
					{!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
					<div className="btn-send">
						{message || postPicture || video.length > 20 ? (
							<button className="cancel" onClick={cancelPost}>
								Annuler message
							</button>
						) : null}

						<button className="send" onClick={handlePost}>
							Envoyer
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewPostForm;
