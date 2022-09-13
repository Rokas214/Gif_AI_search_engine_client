import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import GifCard from "../../components/GifCard/GifCard";
import "./home.css";
import Nav from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";

function Home() {
	const navigate = useNavigate();
	const [search, setSearch] = useState();
	const [getData, setData] = useState();
	const [gifHistory, setGifHistory] = useState();
	const [historyData, setHistoryData] = useState();
	const [watsonResult, setWatsonResult] = useState();

	let APIKEY = "csKsuRSqPbfsq1N4F9nm9Sf8W20orNUJ";

	useEffect(() => {
		fetch("https://ibmtaskexample.azurewebsites.net/", {
			headers: {
				email: localStorage.getItem("email"),
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setGifHistory(data));
	}, []);

	const SaveData = () => {
		fetch("https://ibmtaskexample.azurewebsites.net/gifhistory", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				url: getData,
				email: localStorage.getItem("email"),
			}),
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

	const watsonGif = () => {
		let giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
		giphyUrl = giphyUrl.concat(watsonResult);
		fetch(giphyUrl)
			.then((res) => res.json())
			.then((data) => {
				setData(data.data[0].images.downsized.url);
				setHistoryData(data.data[0].images.downsized.url);
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='App'>
			{!localStorage.getItem("token") && navigate("/login")}
			<Nav />
			<form>
				<div className='search-input'>
					<input
						id='search'
						type='text'
						placeholder='Type phrase, sentence, article, url...'
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button
						id='btnSearch'
						type={"submit"}
						handleClick={(e) => {
							e.preventDefault();
							let giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;

							if (search.includes("https")) {
								fetch("https://ibmtaskexample.azurewebsites.net/watson-url", {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										url: search,
									}),
								})
									.then((res) => res.json())
									.then((data) => setWatsonResult(data))
									.catch((err) => console.log(err));
							} else if (search.split(" ").length > 3) {
								fetch("https://ibmtaskexample.azurewebsites.net/watson-text", {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										text: search,
									}),
								})
									.then((res) => res.json())
									.then((data) => setWatsonResult(data))
									.catch((err) => console.log(err));
							} else {
								giphyUrl = giphyUrl.concat(search);
								fetch(giphyUrl)
									.then((res) => res.json())
									.then((data) => {
										setData(data.data[0].images.downsized.url);
										setHistoryData(data.data[0].images.downsized.url);
									})
									.catch((err) => console.log(err));
							}
						}}>
						Search
					</Button>
				</div>
			</form>
			{historyData && SaveData()}
			{watsonResult && watsonGif()}
			{getData && (
				<div className='searched-gif'>
					<img src={getData} />
				</div>
			)}
			<div style={{ marginTop: "5rem" }}>
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
