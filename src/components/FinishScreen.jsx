import React, { useContext } from "react";
import { QuizContext } from "../context/quizContext";

const FinishScreen = () => {
	const quizCtx = useContext(QuizContext);
	const { points, maxPoints, highScore, dispatch } = quizCtx;
	const percentage = (points / maxPoints) * 100;
	return (
		<>
			<div className="result">
				<p>
					You Scored <strong>{points}</strong> our of{" "}
					<strong> {maxPoints}</strong>. ({Math.ceil(percentage)})
				</p>
				<p>High score {highScore}</p>
			</div>

			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: "restart" })}
			>
				Restart Quiz
			</button>
		</>
	);
};

export default FinishScreen;
