import {useState} from "react";

const useLockLoader = (initState = false) => {
	const [isLock, setIsLock] = useState(initState);
	const [message, setMessage] = useState(null);
	
	const unLock = () => setIsLock(false);
	const lock = () => setIsLock(true);
	const doTry = (value = false) => {
		if (isLock === value) return false;
		setIsLock(value);
		return true;
	}
	
	const clearMessage = ()=>setMessage(null);
	const hasMessage = message !== null;
	const updateMessage = message=>setMessage(message);
	return {
		isUnlock: !isLock,
		isLock,
		unLock, lock,
		doTry,
		
		message,
		clearMessage, updateMessage,hasMessage,
	}
}

export default useLockLoader;