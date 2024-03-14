import React, {useEffect, useState} from 'react';
import styles from './app.module.css';
import {useDispatch} from "react-redux";
import {ingredientsLoad} from "../../service/store/burger-ingredients/burger-ingredients.utils";
import LoaderPreview from "./preloader/preloader";
import AppContent from "./app-content/app-content";
import {LOADING_STATUSES} from "./preloader/preloader.types";


function App() {
	const dispatch = useDispatch();
	const [loadStatus, setLoadStatus] = useState(LOADING_STATUSES.START);


	useEffect(() => {
		const timerId = setTimeout(() => {
			setLoadStatus(LOADING_STATUSES.LONG_WAIT)
		}, 300);

		// @ts-ignore
		dispatch(ingredientsLoad()).then(() => {
			clearTimeout(timerId);
			setLoadStatus(LOADING_STATUSES.FINISH)
		});

	}, [dispatch]);


	return (
		<div className={styles.app}>
			<LoaderPreview status={loadStatus}/>
			{(loadStatus === "done") && <AppContent/>}
		</div>
	);
}

export default App;
