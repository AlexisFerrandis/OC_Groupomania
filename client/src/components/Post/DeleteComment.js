import axios from "axios";
import React from "react";

const DeleteComment = ({ comment }) => {
	const deleteComment = () => {
		axios({
			method: "delete",
			baseURL: `${process.env.REACT_APP_API_URL}api/comment/${comment.comment_id}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.err) {
					console.log(res.err);
				}
				document.getElementById(comment.comment_id).style.display = "none";
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className="delete-btn"
			onClick={() => {
				if (window.confirm("Voulez vous supprimer cet article ?")) {
					deleteComment();
				}
			}}
		>
			<img src="./assets/pictos/trash.svg" alt="delete" />
		</div>
	);
};

export default DeleteComment;
