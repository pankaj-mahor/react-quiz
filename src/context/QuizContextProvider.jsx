import { useEffect, useReducer } from "react";
import { initialState, QuizContext, reducer } from "./quizContext";

function QuizContextProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const {
		status,
		questions,
		index,
		answer,
		points,
		highScore,
		secondRemaning,
	} = state;
	// console.log(state);
	useEffect(() => {
		fetch("http://localhost:8000/questions")
			.then((res) => res.json())
			.then((data) => dispatch({ type: "dataReceived", payload: data }))
			.catch((error) => dispatch({ type: "dataFailed" }));
	}, []);

	const numOfQuestions = questions?.length;
	const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

	const value = {
		status,
		questions,
		index,
		answer,
		points,
		highScore,
		secondRemaning,
		numOfQuestions,
		maxPoints,
		dispatch,
	};

	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export default QuizContextProvider;
