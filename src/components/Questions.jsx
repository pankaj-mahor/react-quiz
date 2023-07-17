import React from "react";

function Questions({ question, dispatch, answer }) {
	console.log(question);
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
