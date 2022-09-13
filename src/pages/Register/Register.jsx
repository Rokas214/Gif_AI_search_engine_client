import React from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useState } from "react";
import Nav from "../../components/Nav/Nav";

const Register = () => {
	const [inputs, setInputs] = useState();
	const [email, setEmail] = useState();
	const [error, setError] = useState();
	const [notification, setNotification] = useState("");
	const navigate = useNavigate();

	return (
		<>
			<Nav />

			<Link to={"/home"}>Home</Link>
			<div className='register-form'>
				<h1>Register</h1>
				{error && <div className='register-error'>{error}</div>}
				{notification && <div className='register-success'>{notification}</div>}

				<form>
					<input
						type='email'
						placeholder='example@email.com'
						onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
					/>
					<input
						type='password'
						placeholder='Password'
						onChange={(e) =>
							setInputs({ ...inputs, passwordOne: e.target.value })
						}
					/>
					<input
						type='password'
						placeholder='Repeat Password'
						onChange={(e) =>
							setInputs({ ...inputs, passwordTwo: e.target.value })
						}
					/>
					<Button
						handleClick={(e) => {
							e.preventDefault();
							if (inputs.passwordOne !== inputs.passwordTwo) {
								return setError("Password should match!");
							}
							if (inputs.passwordOne.length < 6) {
								return setError(
									"Password should be atleast 6 characters long "
								);
							}
							fetch("https://ibmtaskexample.azurewebsites.net/auth/register", {
								method: "POST",
								headers: {
									"Content-Type": "Application/json",
								},
								body: JSON.stringify(inputs),
							})
								.then((res) => res.json())
								.then((data) => {
									if (data.err) {
										setError(data.err);
										return setTimeout(() => {
											setError(false);
										}, 6000);
									}
									setNotification("Registration success!");
									setError(false);
									setTimeout(() => {
										setNotification(false);
										navigate("/login");
									}, 2000);
								});
						}}>
						Register
					</Button>
					<h2>
						Already have an account? <Link to='/login'>Login here</Link>
					</h2>
				</form>
			</div>
		</>
	);
};

export default Register;
