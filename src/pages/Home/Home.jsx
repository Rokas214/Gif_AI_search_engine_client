import { useState } from "react";
import Button from "../../components/Button/Button";

function Home() {
	const [search, setSearch] = useState("");
	const [data, setData] = useState("");
	let APIKEY = "G44eknrY9zKPY4CJrkgqk3j0h0x6MGC9";
	return (
		<div className='App'>
			<form>
				<label for='search'>Search</label>
				<input
					id='search'
					type='search'
					onChange={(e) => setSearch(e.target.value)}
				/>
				<Button
					id='btnSearch'
					type={"submit"}
					handleClick={(e) => {
						e.preventDefault();
						let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
						url = url.concat(search);
						console.log(url);
						fetch(url)
							.then((res) => res.json())
							.then((data) => {
								console.log(data.data);
								setData(data.data[0].images.downsized.url);
							})
							.catch((err) => console.log(err));
					}}>
					Go
				</Button>
			</form>
			{data && <img src={data} />}
			{/* {data &&
				data.map((item) => {
					<img src={item} />;
				})} */}
		</div>
	);
}

export default Home;
