import React, { useContext, useEffect, useState } from "react";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";
import CardComments from "./CardComments";
import { dateParser } from "../Utils";
import { UserContext } from "../AppContext";
import axios from "axios";

const Card = ({ post }) => {
	const userId = useContext(UserContext);

	const [posterPic, setPosterPic] = useState();
	const [posterFirstName, setPosterFirstName] = useState();

	const [isUpdated, setIsUpdated] = useState(false);
	const [textUpdate, setTextUpdate] = useState(null);
	const [showComments, setShowComments] = useState(false);

	useEffect(() => {
		const getPosterInfo = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/user/${post.poster_id}`,
				withCredentials: true,
			})
				.then((res) => {
					setPosterPic(res.data.user_picture);
					setPosterFirstName(res.data.user_first_name);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getPosterInfo();

		if (posterPic);
	}, [posterPic, post.poster_id]);

	const updateItem = () => {
		if (textUpdate) {
			// TODO Mettre a jour le post
		}
		setIsUpdated(false);
	};

	return (
		<div>
			<li className="card-container" key={post._id}>
				<div className="header-card">
					<div className="poster">
						<img className="poster-pic" src={posterPic} alt="poster-pic" />
						<h3>{posterFirstName}</h3>
					</div>
					<span>{post.post_date}</span>
				</div>
				{isUpdated === false && <p>{post.post_message}</p>}
				{isUpdated && (
					<div className="update-post">
						<textarea defaultValue={post.post_message} onChange={(e) => setTextUpdate(e.target.value)} />
						<div className="button-container">
							<button className="btn" onClick={updateItem}>
								Valider modification
							</button>
						</div>
					</div>
				)}
				{post.post_picture && <img src={post.post_picture} alt="card-pic" className="card-pic" />}
				{post.post_video && <iframe width="500" height="300" src={post.post_video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title={post.poster_id}></iframe>}
				{userId === post.poster_id && (
					<div className="button-container">
						<div onClick={() => setIsUpdated(!isUpdated)}>
							<img src="./assets/pictos/edit.svg" alt="edit" />
						</div>
						<DeletePost id={post._id} />
					</div>
				)}
				<div className="card-footer">
					<div className="comment-icon">
						<img onClick={() => setShowComments(!showComments)} src="./assets/pictos/comment.svg" alt="comment" />
						<span>NOMBRE DE COMMENTAIRES</span>
					</div>
					<LikeButton post={post} />
				</div>
				{showComments && <CardComments post={post} />}
			</li>
		</div>
	);
};

export default Card;
