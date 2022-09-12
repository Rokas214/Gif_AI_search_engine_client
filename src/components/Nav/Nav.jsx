import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

const Nav = () => {
	const SignOut = () => {
		localStorage.removeItem("token");
	};

	return (
		<div className='nav'>
			<div className='links-block'>
				<div className='links'>
					<Link to={"/"} className='link'>
						Home
					</Link>
				</div>
				<div className='links logout'>
					<Link to={"/login"} onClick={() => SignOut()} className='link logout'>
						Logout
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Nav;
