import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Nav from "../../components/Nav/Nav";

const Login = () => {
	const [inputs, setInputs] = useState();
	const [getNotification, setNotification] = useState(false);

	let navigate = useNavigate();

	return (
		<>
			<Nav />
			<div>
				<Link to={"/home"}>Home</Link>
			</div>
			<div className='login-form'>
				<h1>Login</h1>
				{getNotification && (
					<div className='login-error'>{getNotification}</div>
				)}
				<form
					onSubmit={(e) => {
						e.preventDefault();
						fetch("http://localhost:8080/auth/login", {
							method: "POST",
							headers: {
								"Content-Type": "Application/json",
							},
							body: JSON.stringify(inputs),
						})
							.then((res) => res.json())
							.then((data) => {
								if (!data.token) {
									setNotification(data.err);
								} else {
									localStorage.setItem("token", data.token);
									localStorage.setItem("email", inputs.email);
									navigate("/");
								}
							});
					}}>
					<input
						type='email'
						className='email'
						placeholder='example@email.com'
						onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
					/>
					<input
						type='password'
						placeholder='Password'
						onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
					/>
					<Button>Login</Button>
					<h2>
						Not a user? <Link to='/register'>Register here</Link>
					</h2>
				</form>
			</div>
		</>
	);
};

export default Login;
