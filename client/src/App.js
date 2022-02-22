import { useEffect, useState } from "react";
import { UserContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";

function App() {
	const [userConnexion, setUserConnexion] = useState(null);

	useEffect(() => {
		const fetchToken = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}jwtid`,
				withCredentials: true,
			})
				.then((res) => {
					setUserConnexion(true);
				})
				.catch((err) => {
					setUserConnexion(false);
				});
		};
		fetchToken();
	}, [userConnexion]);

	return (
		<div className="app">
			<UserContext.Provider value={userConnexion}>
				<Routes />
			</UserContext.Provider>
		</div>
	);
}

export default App;
