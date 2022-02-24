import { useEffect, useState } from "react";
import { UserContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";

function App() {
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		const fetchToken = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}jwtid`,
				withCredentials: true,
			})
				.then((res) => {
					setUserId(res.data.userId);
				})
				.catch((err) => {
					setUserId(false);
				});
		};
		fetchToken();

		if (userId);
	}, [userId]);

	return (
		<div className="app">
			<UserContext.Provider value={userId}>
				<Routes />
			</UserContext.Provider>
		</div>
	);
}

export default App;
