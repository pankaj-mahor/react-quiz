import { useEffect, useReducer } from "react";
import "./App.css";
import Error from "./components/Error";
import Header from "./components/Header";
import Loader from "./components/Loader";
import MainPage from "./MainPage";
import Questions from "./components/Questions";
import StartScreen from "./components/StartScreen";
import NextButton from "./components/NextButton";
// import PrevButton from "./components/PrevButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import TImer from "./components/TImer";

const SECOND_PER_QUESTION = 30;

const initialState = {
	questions: [],
	//loading, error, ready, active, finished
	status: "loading",
	index: 0,
	answer: null,
	points: 0,
	highScore: 0,
	secondRemaning: null,
};

function reducer(state, action) {
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

function App() {
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

	return (
		<>
			<Header />
			<MainPage>
				{status === "loading" && <Loader />}

				{status === "error" && <Error />}

				{status === "ready" && (
					<StartScreen questions={questions} dispatch={dispatch} />
				)}

				{status === "active" && (
					<>
						<Progress
							index={index}
							numOfQuestions={numOfQuestions}
							points={points}
							maxPoints={maxPoints}
							answer={answer}
						/>
						<Questions
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						{/* <PrevButton dispatch={dispatch} answer={answer} /> */}
						<footer>
							<TImer secondRemaning={secondRemaning} dispatch={dispatch} />
							<NextButton
								dispatch={dispatch}
								answer={answer}
								index={index}
								numQuestions={numOfQuestions}
							/>
						</footer>
					</>
				)}

				{status === "finish" && (
					<>
						<FinishScreen
							points={points}
							maxPoints={maxPoints}
							highScore={highScore}
						/>
						<button onClick={() => dispatch({ type: "restart" })}>
							Restart Quiz
						</button>
					</>
				)}

				{/* <p>1/15 </p>
				<p>Questions?</p> */}
			</MainPage>
		</>
	);
}

export default App;
