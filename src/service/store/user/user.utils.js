const LOCAL_STORAGE_KEY = "userTokens";
const initialValues = {
	access: null,
	refresh: null
}
export const getTokens = () => {
	const _fromStore = localStorage.getItem(LOCAL_STORAGE_KEY);
	if (!_fromStore) return initialValues;
	return JSON.parse(_fromStore);
}
export const clearTokens = () => {
	localStorage.removeItem(LOCAL_STORAGE_KEY);
}
export const setTokens = ({access, refresh}) => {
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({access, refresh}));
}


// Финальная обработка окончания авторизации/деавторизации
export const authFinisherHandler = (() => {
	
	// Вызывается при завершении деавторизации
	const logout = () => {
		clearTokens();
		authStageFlagsStore.clear("login");
	}
	
	// Вызывается при завершении авторизации
	const login = (tokens) => {
		setTokens(tokens);
		authStageFlagsStore.clear("logout");
	}
	
	return {
		logout, login,
	}
})();

export const authStageFlagsStore = (() => {
	// stage => "logout" | "login"
	
	const _separator = "|";
	const _keys = "authStageFlagsStore";
	const _getStorageKey = stage => _keys + "_" + stage;
	
	const _getCollectionFromStorage = (stage) => new Set(
		localStorage.getItem(_getStorageKey(stage))?.split(_separator)
	);
	
	const _saveCollectionToStorage = (stage, mapList) => {
		localStorage.setItem(
			_getStorageKey(stage),
			[...mapList].join(_separator)
		)
	}
	
	const add = (stage, flag) => {
		const storageArray = _getCollectionFromStorage(stage);
		if (storageArray.has(flag)) return false;
		storageArray.add(flag);
		_saveCollectionToStorage(stage, storageArray);
		return true;
	}
	
	const has = (stage, flag) => {
		const storageArray = _getCollectionFromStorage(stage);
		return storageArray.has(flag);
	}
	const remove = (stage, flag) => {
		const storageArray = _getCollectionFromStorage(stage);
		_saveCollectionToStorage(stage, storageArray.delete(flag));
	}
	
	const clear = stage => localStorage.removeItem(_getStorageKey(stage))
	
	return {
		add, has, clear, remove
	}
})();
