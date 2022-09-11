import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import GifCard from "../../components/GifCard/GifCard";
import "./home.css";

function Home() {
	const [search, setSearch] = useState("");
	const [getData, setData] = useState("");
	const [gifHistory, setGifHistory] = useState();
	const [historyData, setHistoryData] = useState();

	let APIKEY = "csKsuRSqPbfsq1N4F9nm9Sf8W20orNUJ";

	useEffect(() => {
		fetch("http://localhost:8080/")
			.then((res) => res.json())
			.then((data) => setGifHistory(data));
	}, []);

	const SaveData = () => {
		fetch("http://localhost:8080/gifhistory", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: getData,
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

	return (
		<div className='App'>
			<form>
				<div className='search-input'>
					<input
						id='search'
						type='text'
						placeholder='Search for a gif'
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button
						id='btnSearch'
						type={"submit"}
						handleClick={(e) => {
							e.preventDefault();
							let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
							url = url.concat(search);
							fetch(url)
								.then((res) => res.json())
								.then((data) => {
									setData(data.data[0].images.downsized.url);
									setHistoryData(data.data[0].images.downsized.url);
								})
								.catch((err) => console.log(err));
						}}>
						Search
					</Button>
				</div>
			</form>
			{historyData && SaveData()}
			{getData && <img src={getData} />}
			<div style={{ marginTop: "11rem" }}>
				<div className='history'>Last Searches</div>
				<div style={{ display: "flex", flexWrap: "wrap", marginLeft: "1rem" }}>
					{gifHistory &&
						gifHistory.map((item) => (
							<GifCard className='gif-card' url={item.url} />
						))}
				</div>
			</div>
		</div>
	);
}

export default Home;
