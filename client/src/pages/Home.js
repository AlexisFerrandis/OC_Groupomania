import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const Home = () => {
	const userConnexion = useContext(UserContext);

	return <div>{userConnexion ? <h1>POSTS</h1> : <Log />}</div>;
};

export default Home;
