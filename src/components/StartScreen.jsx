import React from "react";

const StartScreen = ({ questions, dispatch }) => {
	return (
		<div className="start">
			<h2>Welcome to the react quiz</h2>
			<h3>{questions?.length} question to test you react knowledge</h3>
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "start" })}
			>
				Let's Start
			</button>
		</div>
	);
};

export default StartScreen;
