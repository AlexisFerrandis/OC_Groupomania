import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../AppContext";
import { isEmpty, timestampParser } from "../Utils";
import DeleteComment from "./DeleteComment";

const CardComments = ({ post }) => {
	const userId = useContext(UserContext);

	const [message, setMessage] = useState("");
	const [allComments, setAllComments] = useState([]);
	const [getPosterInfo, setGetPosterInfo] = useState();

	// get userInfo
	useEffect(() => {
		const getCommenterInfo = async () => {
			await axios({
				method: "get",
				baseURL: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
				withCredentials: true,
			})
				.then((res) => {
					if (res.err) {
						console.log(res.err);
					}
					setGetPosterInfo(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getCommenterInfo();

		if (getPosterInfo);
	}, []);

	// handle comment post
	const handleComment = (e) => {
		e.preventDefault();

		if (message) {
			axios({
				method: "post",
				baseURL: `${process.env.REACT_APP_API_URL}api/comment/${post.post_id}`,
				withCredentials: true,
				data: {
					commentUserId: userId,
					commentUserFirstName: getPosterInfo.user_first_name,
					commentUserLastName: getPosterInfo.user_last_name,
					commentUserPicture: getPosterInfo.user_picture,
					message: message,
					timestamps: "1973-11-17",
				},
			})
				.then((res) => {
					if (res.err) {
						console.log(res.err);
					}
					// display the new comment
					setMessage("");
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert("Veuillez entrer un message");
		}
	};

	// get * comments
	useEffect(() => {
		const getCommentInfo = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/comment/${post.post_id}`,
				withCredentials: true,
			})
				.then((res) => {
					setAllComments(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getCommentInfo();

		if (allComments);
	}, []);

	return (
		<div className="comments-container">
			<h2>Commentaires</h2>
			<form action="" onSubmit={handleComment} className="comment-form">
				<input type="text" name="text" onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Laisser un commentaire" />
				<br />
				<input type="submit" value="Envoyer" />
			</form>
			{allComments.map((comment) => {
				return (
					<div className="comment-container" key={comment.comment_id} id={comment.comment_id}>
						<div className="up-part">
							<div className="infos">
								<img src={comment.comment_user_picture} alt="commenter-pic" />
								<div className="name">
									<h3>{comment.comment_user_first_name + " " + comment.comment_user_last_name}</h3>
								</div>
							</div>
							<span>{timestampParser(comment.comment_date)}</span>
						</div>
						<div className="bottom-part">
							<p>{comment.comment_message}</p>
							{userId === comment.comment_user_id && <DeleteComment comment={comment} />}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CardComments;
