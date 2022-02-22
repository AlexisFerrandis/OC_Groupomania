module.exports.signInErrors = (err) => {
	let errors = {
		mail: "",
		password: "",
	};
	if (err.message.includes("mail")) errors.mail = "Email inconnu";
	if (err.message.includes("password")) errors.password = "Le mot de passe ne correspond pas";

	return errors;
};
