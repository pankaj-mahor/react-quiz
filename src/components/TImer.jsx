import React, { useEffect } from "react";

const TImer = ({ dispatch, secondRemaning }) => {
	const mins = Math.floor(secondRemaning / 60);

	const seconds = secondRemaning % 60;
	useEffect(() => {
		const timer = setInterval(() => {
			dispatch({ type: "tick" });
		}, 1000);

		return () => clearInterval(timer);
	}, [dispatch]);

	return (
		<div className="timer">
			{mins < 10 && "0"} {mins} : {seconds < 10 && "0"} {seconds}
		</div>
	);
};

export default TImer;
