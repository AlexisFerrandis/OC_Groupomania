import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
	const [formSubmit, setFormSubmit] = useState(false);
	const [firstname, setfirstname] = useState("");
	const [lastname, setlastname] = useState("");
	const [mail, setmail] = useState("");
	const [password, setPassword] = useState("");
	const [controlPassword, setControlPassword] = useState("");

	const handleRegister = async (e) => {
		e.preventDefault();

		const firstnameError = document.querySelector(".firstname.error");
		const lastnameError = document.querySelector(".lastname.error");
		const mailError = document.querySelector(".mail.error");
		const passwordError = document.querySelector(".password.error");
		const passwordConfirmError = document.querySelector(".password-confirm.error");

		firstnameError.innerHTML = "";
		lastnameError.innerHTML = "";
		mailError.innerHTML = "";
		passwordError.innerHTML = "";
		passwordConfirmError.innerHTML = "";

		if (password !== controlPassword) {
			passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
		} else {
			await axios({
				method: "post",
				url: `${process.env.REACT_APP_API_URL}api/user/register`,
				data: {
					firstname,
					lastname,
					mail,
					password,
				},
			})
				.then((res) => {
					if (res.data.errors) {
						firstnameError.innerHTML = res.data.errors.firstname;
						lastnameError.innerHTML = res.data.errors.lastname;
						mailError.innerHTML = res.data.errors.mail;
						passwordError.innerHTML = res.data.errors.password;
					} else {
						setFormSubmit(true);
					}
				})
				.catch((err) => console.log(err));
		}
	};

	return (
		<>
			{formSubmit ? (
				<>
					<SignInForm />
					<span></span>
					<h4 className="success">Enregistrement réussi, veuillez vous connecter</h4>
				</>
			) : (
				<form action="" onSubmit={handleRegister} id="sign-up-form">
					<label htmlFor="firstname">Prénom</label>
					<br />
					<input type="text" name="firstname" id="firstname" onChange={(e) => setfirstname(e.target.value)} value={firstname} />
					<div className="firstname error"></div>
					<br />

					<label htmlFor="lastname">Nom</label>
					<br />
					<input type="text" name="lastname" id="lastname" onChange={(e) => setlastname(e.target.value)} value={lastname} />
					<div className="lastname error"></div>
					<br />

					<label htmlFor="mail">mail</label>
					<br />
					<input type="text" name="mail" id="mail" onChange={(e) => setmail(e.target.value)} value={mail} />
					<div className="mail error"></div>
					<br />

					<label htmlFor="password">Mot de passe</label>
					<br />
					<input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
					<div className="password error"></div>
					<br />

					<label htmlFor="password-conf">Confirmer le mot de passe</label>
					<br />
					<input type="password" name="password" id="password-conf" onChange={(e) => setControlPassword(e.target.value)} value={controlPassword} />
					<div className="password-confirm error"></div>
					<br />
					<br />

					<input type="submit" value="valider l'inscription"></input>
				</form>
			)}
		</>
	);
};

export default SignUpForm;
