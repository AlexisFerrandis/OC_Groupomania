import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import NotFound from "../../pages/NotFound";
import Log from "../../pages/Log";

const index = () => {
	return (
		<div>
			<Router>
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/connexion" exact element={<Log />} />
					<Route path="/profil" exact element={<Profil />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	);
};

export default index;
