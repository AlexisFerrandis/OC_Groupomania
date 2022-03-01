import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../AppContext";

const LikeButton = ({ post }) => {
	const [liked, setLiked] = useState(false);
	const [numberOfLike, setNumberOfLike] = useState();
	const userId = useContext(UserContext);

	// number of likes
	useEffect(() => {
		const numberOfLike = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/post/likes/${post.post_id}`,
				withCredentials: true,
			})
				.then((res) => {
					setNumberOfLike(res.data.length);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		numberOfLike();

		if (userId);
	}, [userId, post.post_id]);

	// does user already liked
	useEffect(() => {
		const alreadyLike = async () => {
			await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}api/post/likes/${post.post_id}`,
				withCredentials: true,
				data: {
					userId: userId,
				},
			})
				.then((res) => {
					if (!res.data) {
						setLiked(false);
					} else if (res.data) {
						setLiked(true);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		};
		alreadyLike();

		if (userId);
	}, [userId, post.post_id]);

	// check if it's a like or an unlike
	const handleLike = () => {
		axios({
			method: "post",
			baseURL: `${process.env.REACT_APP_API_URL}api/post/like-unlike/${post.post_id}`,
			withCredentials: true,
			data: {
				userId: userId,
			},
		})
			.then((res) => {
				if (res.err) {
					console.log(res.err);
				}
				if (!res.data) {
					setLiked(false);
					setNumberOfLike(numberOfLike - 1);
				} else if (res.data) {
					setLiked(true);
					setNumberOfLike(numberOfLike + 1);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="like-container">
			{liked === false && <img src="./assets/pictos/heart-empty.svg" onClick={handleLike} alt="like" />}
			{liked && <img src="./assets/pictos/heart-full.svg" onClick={handleLike} alt="unlike" />}
			<span>{numberOfLike}</span>
		</div>
	);
};

export default LikeButton;
