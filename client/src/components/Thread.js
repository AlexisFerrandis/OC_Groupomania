import React, { useEffect, useState } from "react";
import Card from "./Post/Card";
import axios from "axios";
import { isEmpty } from "./Utils";

const Thread = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getAllPosts = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/post/`,
				withCredentials: true,
			})
				.then((res) => {
					setPosts(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getAllPosts();
	}, []);

	return (
		<div className="thread-container">
			<ul>
				{!isEmpty(posts[0]) &&
					posts.map((post) => {
						return <Card post={post} key={post.post_id} />;
					})}
			</ul>
		</div>
	);
};

export default Thread;
