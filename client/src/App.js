import { useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";

function App() {
	const [uid, setUid] = useState(null);

	useEffect(() => {
		const fetchToken = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}jwtid`,
				withCredentials: true,
			})
				.then((res) => {
					console.log(res);
					setUid(res.data);
				})
				.catch((err) => console.log(err + "no token"));
		};
		fetchToken();
	}, [uid]);

	return (
		<div className="App">
			<h1>Groupomania</h1>
			<UidContext.Provider value={uid}>
				<Routes />
			</UidContext.Provider>
		</div>
	);
}

export default App;
