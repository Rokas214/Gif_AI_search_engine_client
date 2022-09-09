import React, { useState } from "react";
import "./login.css";
import Button from "../../components/Button/Button";

const Login = () => {
	return (
		<>
			<div className='login-form'>
				<form>
					<input
						type='email'
						className='email'
						placeholder='example@email.com'
					/>
					<input type='password' placeholder='Password' />
					<Button className='btn'>Login</Button>
					<h2>Not a user?</h2>
				</form>
			</div>
		</>
	);
};

export default Login;
