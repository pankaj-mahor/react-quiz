import React from "react";

function PrevButton({ dispatch, answer }) {
	const hasAnswerd = answer == null;

	if (hasAnswerd) return;

	const handlePrev = () => {
		dispatch({ type: "prevQuestion" });
	};

	return (
		<button className="btn btn-ui" onClick={handlePrev}>
			Prev
		</button>
	);
}

export default PrevButton;
