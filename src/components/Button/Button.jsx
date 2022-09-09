import React from "react";
import "./button.css";

const Button = ({ type, handleClick, children }) => {
	return (
		<button className='button' type={type} onClick={handleClick}>
			{children}
			<svg
				focusable='false'
				preserveAspectRatio='xMidYMid meet'
				xmlns='http://www.w3.org/2000/svg'
				fill='currentColor'
				aria-hidden='true'
				width='16'
				height='16'
				viewBox='0 0 16 16'
				class='bx--btn__icon'>
				<path d='M9.3 3.7L13.1 7.5 1 7.5 1 8.5 13.1 8.5 9.3 12.3 10 13 15 8 10 3z'></path>
			</svg>
		</button>
	);
};

export default Button;
