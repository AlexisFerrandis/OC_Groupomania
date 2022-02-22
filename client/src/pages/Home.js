import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const Home = () => {
	const userId = useContext(UserContext);

	return <div>{!userId ? <Log /> : <h1>POSTS</h1>}</div>;
};

export default Home;
