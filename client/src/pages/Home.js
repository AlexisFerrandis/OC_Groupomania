import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {
	const userId = useContext(UserContext);

	return (
		<div>
			{!userId ? (
				<Log />
			) : (
				<div className="home">
					<div className="main">
						<NewPostForm />
						<Thread />
					</div>
					<img className="logo" src="./assets/logos/icon-left-font-monochrome-black.png" alt="logo" />
				</div>
			)}
		</div>
	);
};

export default Home;
