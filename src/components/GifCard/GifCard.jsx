import React from "react";
import "./gifCard.css";

const GifCard = ({ url }) => {
	return (
		<div className='gif-card'>
			<img src={url} />
		</div>
	);
};

export default GifCard;
