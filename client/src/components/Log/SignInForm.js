import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
	const [mail, setmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		const error = document.querySelector(".error");

		if (mail.length < 24 && (mail.length > 6) & /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mail)) {
			error.innerHTML = "";

			axios({
				method: "post",
				baseURL: `${process.env.REACT_APP_API_URL}api/user/login`,
				withCredentials: true,
				data: {
					mail,
					password,
				},
			})
				.then((res) => {
					if (res.data.error) {
						error.innerHTML = res.data.message;
					} else {
						window.location = "/";
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			error.innerHTML = "Email invalide";
		}
	};

	return (
		<div>
			<form action="" onSubmit={handleLogin} id="sign-up-form">
				<label htmlFor="mail">mail</label>
				<br />
				<input type="text" name="mail" id="mail" value={mail} onChange={(e) => setmail(e.target.value)} />
				<br />
				<label htmlFor="password">Mot de passe</label>
				<br />
				<input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				<div className="error"></div>
				<br />
				<input type="submit" value="Se connecter" />
			</form>
		</div>
	);
};

export default SignInForm;
