import React, { useContext } from "react";
import { QuizContext } from "../context/quizContext";

function Progress() {
	const quizCtx = useContext(QuizContext);
	const { index, numOfQuestions, points, maxPoints, answer } = quizCtx;
	return (
		<header className="progress">
			<progress max={numOfQuestions} value={index + Number(answer !== null)} />

			<p>
				Question <strong>{index + 1}</strong> /{" "}
				<strong>{numOfQuestions}</strong>{" "}
			</p>
			<p>
				Points <strong>{points}</strong> / <strong>{maxPoints}</strong>{" "}
			</p>
		</header>
	);
}

export default Progress;
