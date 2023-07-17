import React from "react";

const FinishScreen = ({ points, maxPoints, highScore }) => {
	const percentage = (points / maxPoints) * 100;
	return (
		<div className="result">
			<p>
				You Scored <strong>{points}</strong> our of{" "}
				<strong> {maxPoints}</strong>. ({Math.ceil(percentage)})
			</p>
			<p>High score {highScore}</p>
		</div>
	);
};

export default FinishScreen;
