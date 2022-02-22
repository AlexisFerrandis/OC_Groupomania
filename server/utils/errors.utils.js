module.exports.signUpErrors = (err) => {
	let errors = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	};
	if (err.message.includes("firstname")) errors.firstname = "Prénom incorrect ";
	if (err.message.includes("lastname")) errors.lastname = "Nom incorrect ";
	if (err.message.includes("email")) errors.email = "Email incorrect";
	if (err.message.includes("password")) errors.password = "Mot de passe incorrect";
	if (err.code == 11000 && Object.keys(err.keyValue)[0].includes("email")) errors.email = "Cet email est déjà pris";
	return errors;
};
