import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const NotFound = () => {
	const userConnexion = useContext(UserContext);

	return <div>{userConnexion ? <h1>NOT FOUND</h1> : <Log />}</div>;
};

export default NotFound;
