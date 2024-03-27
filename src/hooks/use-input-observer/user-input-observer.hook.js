import useInputValue from "@hooks/use-input-value/use-input-value.hook";
import {useState} from "react";

export const useInputObserver = (initValue = "") => {
	const customHook = useInputValue(initValue);
	const [prevInitValue, setPrevInitValue] = useState(initValue);
	const [isHasBeenChanged, setHasBeenChanged] = useState(false);
	
	const updateInitValue = (value) => {
		setHasBeenChanged(value !== customHook.value);
		setPrevInitValue(value);
	}
	
	const handlerInputChange = (event) => {
		customHook.handler(event);
		
		const inputValue = event.target.value;
		console.log("handlerInputChange::", [inputValue]);
		const newValue = prevInitValue !== inputValue;
		if (newValue === isHasBeenChanged) return;
		
		setHasBeenChanged(newValue);
	};
	
	const rollBack = () => {
		customHook.setValue(prevInitValue);
		setHasBeenChanged(false);
	}
	
	return {
		hasChanges: isHasBeenChanged,
		value: customHook.value,
		setValue:customHook.setValue,
		rollBack, updateInitValue, handlerInputChange,
		
	}
}

export default useInputObserver