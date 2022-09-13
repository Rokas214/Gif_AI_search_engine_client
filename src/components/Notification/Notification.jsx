import React from "react";
import "./notification.css";

const Notification = ({ children }) => {
	return (
		<div className='notification'>
			<h1>{children}</h1>
		</div>
	);
};

export default Notification;
