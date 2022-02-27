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
			<h4>Commentaires</h4>
			<form action="" onSubmit={handleComment} className="comment-form">
				<input type="text" name="text" onChange={(e) => setMessage(e.target.value)} value={message} placeholder="Laisser un commentaire" />
				<br />
				<input type="submit" value="envoyer" />
			</form>
			{allComments.map((comment) => {
				return (
					<div className="comment-container" key={comment.comment_id}>
						<div className="left-part">
							<img src={comment.comment_user_picture} alt="commenter-pic" />
						</div>
						<div className="right-part">
							<div className="comment-header">
								<div className="name">
									<h3>{comment.comment_user_first_name + " " + comment.comment_user_last_name}</h3>
								</div>
								<span>{timestampParser(comment.comment_date)}</span>
							</div>
							<p>{comment.comment_message}</p>
							<DeleteComment comment={comment} postId={post.post_id} />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default CardComments;
