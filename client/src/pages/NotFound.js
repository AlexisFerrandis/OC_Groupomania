import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const NotFound = () => {
	const userId = useContext(UserContext);

	return <div>{userId ? <h1>NOT FOUND</h1> : <Log />}</div>;
};

export default NotFound;
