module.exports = (err) => {
	let errors = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
	};
	if (err.sqlMessage.includes("firstname")) errors.firstname = "Prénom incorrect";
	if (err.sqlMessage.includes("lastname")) errors.lastname = "Nom incorrect";
	if (err.sqlMessage.includes("email")) errors.email = "Email incorrect";
	if (err.sqlMessage.includes("password")) errors.password = "Mot de passe incorrect";
	if (err.errno == 1062) errors.email = "Cet email est déjà pris";
	return errors;
};
