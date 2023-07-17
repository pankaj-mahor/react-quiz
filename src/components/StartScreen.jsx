import React, { useContext } from "react";
import { QuizContext } from "../context/quizContext";

const StartScreen = () => {
	const quizCtx = useContext(QuizContext);
	const { questions, dispatch } = quizCtx;

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
