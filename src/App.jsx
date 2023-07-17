import { useContext } from "react";
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
import { QuizContext } from "./context/quizContext";

function App() {
	const ctx = useContext(QuizContext);
	const { status } = ctx;

	return (
		<>
			<Header />
			<MainPage>
				{status === "loading" && <Loader />}

				{status === "error" && <Error />}

				{status === "ready" && <StartScreen />}

				{status === "active" && (
					<>
						<Progress />
						<Questions />
						<footer>
							<TImer />
							<NextButton />
						</footer>
					</>
				)}

				{status === "finish" && <FinishScreen />}

				{/* <p>1/15 </p>
				<p>Questions?</p> */}
			</MainPage>
		</>
	);
}

export default App;
