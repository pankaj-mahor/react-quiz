import React, { useContext } from "react";
import { QuizContext } from "../context/quizContext";

function NextButton() {
	const quizCtx = useContext(QuizContext);
	const { index, dispatch, numOfQuestions } = quizCtx;
	// const hasAnswerd = answer === null;

	// if (hasAnswerd) return;

	// console.log(index);
	const handleNext = () => {
		dispatch({ type: "nextQuestion" });
	};

	if (index < numOfQuestions - 1)
		return (
			<button className="btn btn-ui" onClick={handleNext}>
				Next
			</button>
		);

	if (index === numOfQuestions - 1)
		return (
			<button
				className="btn btn-ui"
				onClick={() => {
					dispatch({ type: "finish" });
				}}
			>
				Finish
			</button>
		);
}

export default NextButton;
