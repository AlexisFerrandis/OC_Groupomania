import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import NotFound from "../../pages/NotFound";
import Connexion from "../../pages/Connexion";
import NavBar from "../NavBar";

const index = () => {
	return (
		<div>
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/connexion" exact element={<Connexion />} />
					<Route path="/profil" exact element={<Profil />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
};

export default index;
