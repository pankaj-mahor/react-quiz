import React, { useContext } from "react";
import { QuizContext } from "../context/quizContext";

function Questions() {
	const quizCtx = useContext(QuizContext);
	const { questions, dispatch, answer, index } = quizCtx;

	const question = questions[index];
	const hasAnswerd = answer !== null;
	return (
		<div>
			<h4>{question.question}</h4>

			<div className="options">
				{question.options.map((option, i) => {
					return (
						<button
							className={`btn btn-option ${i === answer ? "answer" : ""} 
								${hasAnswerd ? (i === question.correctOption ? "correct" : "wrong") : ""}`}
							key={option}
							onClick={() => dispatch({ type: "newAnswer", payload: i })}
							disabled={hasAnswerd}
						>
							{option}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default Questions;
