import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import Log from "../components/Log";

const Connexion = () => {
	const userConnexion = useContext(UserContext);
	return <div>{!userConnexion ? <Log /> : <h1>Already Connected</h1>}</div>;
};

export default Connexion;
