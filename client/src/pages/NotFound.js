import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const NotFound = () => {
	const userId = useContext(UserContext);

	return <div className="not-found">{userId ? <h1>Page introuvable :'(</h1> : <Log />}</div>;
};

export default NotFound;
