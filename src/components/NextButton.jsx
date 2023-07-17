import React from "react";

function NextButton({ dispatch, answer, index, numQuestions }) {
	// const hasAnswerd = answer == null;

	// if (hasAnswerd) return;

	const handleNext = () => {
		dispatch({ type: "nextQuestion" });
	};

	if (index < numQuestions - 1)
		return (
			<button className="btn btn-ui" onClick={handleNext}>
				Next
			</button>
		);

	if (index === numQuestions - 1)
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
