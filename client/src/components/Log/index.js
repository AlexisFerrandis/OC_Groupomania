import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const Log = () => {
	const [signUpModal, setSignUpModal] = useState(true);
	const [signInModal, setSignInModal] = useState(false);

	const handleModals = (e) => {
		if (e.target.id === "register") {
			setSignInModal(false);
			setSignUpModal(true);
		} else if (e.target.id === "login") {
			setSignUpModal(false);
			setSignInModal(true);
		}
	};

	return (
		<>
			<div className="connection-form">
				<div className="form-container">
					<ul>
						<li onClick={handleModals} id="register" className={signUpModal ? "active" : null}>
							S'inscrire
						</li>
						<li onClick={handleModals} id="login" className={signInModal ? "active" : null}>
							Se connecter
						</li>
					</ul>
					{signUpModal && <SignUpForm />}
					{signInModal && <SignInForm />}
				</div>
			</div>
			<img className="log-illustration" src="./assets/img/christina-wocintechchat-com-l6iKdDtkirk-unsplash.jpg" alt="Enceinte de l'entreprise" />
		</>
	);
};

export default Log;
