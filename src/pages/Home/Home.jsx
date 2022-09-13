import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import GifCard from "../../components/GifCard/GifCard";
import "./home.css";
import Nav from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notification/Notification";

function Home() {
	const navigate = useNavigate();
	const [search, setSearch] = useState();
	const [getData, setData] = useState();
	const [gifHistory, setGifHistory] = useState();
	const [historyData, setHistoryData] = useState();
	const [watsonResult, setWatsonResult] = useState();
	const [notification, setNotification] = useState();

	let APIKEY = "csKsuRSqPbfsq1N4F9nm9Sf8W20orNUJ";

	useEffect(() => {
		fetch("https://ibmtaskexample.azurewebsites.net", {
			headers: {
				email: localStorage.getItem("email"),
				authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.length < 1) {
					return data;
				} else {
					setGifHistory(data);
				}
			})
			.catch((err) => setNotification(err));
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
			.then((data) => setHistoryData(false))
			.catch((err) => setNotification(err));
	};

	const watsonGif = () => {
		let giphyUrl = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
		giphyUrl = giphyUrl.concat(watsonResult);
		fetch(giphyUrl)
			.then((res) => res.json())
			.then((data) => {
				setData(data.data[0].images.downsized.url);
				setHistoryData(data.data[0].images.downsized.url);
				setWatsonResult(false);
			})
			.catch((err) => setNotification(err));
	};

	return (
		<div className='App'>
			{notification && <Notification children={"error"} />}
			{!localStorage.getItem("token") && navigate("/login")}
			<Nav />
			<form>
				<div className='gif-div'>
					<img
						className='gif-image'
						src={
							"https://upload.wikimedia.org/wikipedia/commons/8/82/Giphy-logo.svg"
						}
					/>
				</div>
				<div className='search-input'>
					<input
						type='text'
						placeholder='Type phrase, sentence, article, url...'
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button
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
									.catch((err) => setNotification(err));
							} else if (search.split(" ").length > 3) {
								let validatedSearch = search.replace((/['"]+/g, ""));
								fetch("https://ibmtaskexample.azurewebsites.net/watson-text", {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										text: validatedSearch,
									}),
								})
									.then((res) => res.json())
									.then((data) => setWatsonResult(data))
									.catch((err) => setNotification(err));
							} else {
								giphyUrl = giphyUrl.concat(search);
								fetch(giphyUrl)
									.then((res) => res.json())
									.then((data) => {
										setData(data.data[0].images.downsized.url);
										setHistoryData(data.data[0].images.downsized.url);
									})
									.catch((err) => setNotification(err));
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
				{gifHistory && <div className='history'>Last Searches</div>}
				<div className='gif-card'>
					{gifHistory &&
						gifHistory.map((item) => (
							<GifCard className='gif-card' url={item.url} key={item.url} />
						))}
				</div>
			</div>
		</div>
	);
}

export default Home;
