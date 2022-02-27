import axios from "axios";
import React from "react";

// TODO DELETE ASSOCIATE COMMENTS

const DeleteCard = (props) => {
	const deleteQuote = () => {
		axios({
			method: "delete",
			baseURL: `${process.env.REACT_APP_API_URL}api/post/${props.id}`,
			withCredentials: true,
		})
			.then((res) => {
				if (res.err) {
					console.log(res.err);
				}
				const post = document.getElementById(`${props.id}`);
				post.style.display = "none";
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			onClick={() => {
				if (window.confirm("Voulez vous supprimer cet article ?")) {
					deleteQuote();
				}
			}}
		>
			<img src="./assets/pictos/trash.svg" alt="delete" />
		</div>
	);
};

export default DeleteCard;
