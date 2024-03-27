import {useState} from "react";

const useInputValue = (initState = "") => {
	const [state, setState] = useState(initState);
	
	const handler = event => setState(event.target.value);
	
	return {
		handler,
		value: state,
		setValue: setState
	}
}

export default useInputValue