import { createContext } from "react";

export const initialState = {
	questions: [],
	//loading, error, ready, active, finished
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	secondRemaning: null,
};
const SECOND_PER_QUESTION = 30;

export const QuizContext = createContext(initialState);

export function reducer(state, action) {
	switch (action.type) {
		case "dataReceived":
			return { ...state, questions: action.payload, status: "ready" };
		case "dataFailed":
			return { ...state, status: "error" };
		case "start":
			return {
				...state,
				status: "active",
				secondRemaning: state.questions.length * SECOND_PER_QUESTION,
			};
		case "newAnswer":
			//get current state
			const question = state.questions.at(state.index);
			const addPoint =
				action.payload === question.correctOption
					? state.points + question.points
					: state.points;
			return { ...state, answer: action.payload, points: addPoint };
		case "nextQuestion":
			return { ...state, index: state.index + 1, answer: null };
		case "prevQuestion":
			return {
				...state,
				index: state.index < 0 ? state.index : state.index - 1,
			};
		case "finish":
			return {
				...state,
				status: "finish",
				highScore:
					state.points > state.highScore ? state.points : state.highScore,
			};
		case "restart":
			return { ...initialState, questions: state.questions, status: "ready" };

		case "tick":
			return {
				...state,
				secondRemaning: state.secondRemaning - 1,
				status: state.secondRemaning === 0 ? "finish" : state.status,
			};
		default:
			throw new Error("Action Unknown");
	}
}

// PROVIDER
