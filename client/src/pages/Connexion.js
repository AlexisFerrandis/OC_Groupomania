import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const Connexion = () => {
	const userId = useContext(UserContext);
	return <div>{!userId ? <Log /> : <h1>Already Connected</h1>}</div>;
};

export default Connexion;
