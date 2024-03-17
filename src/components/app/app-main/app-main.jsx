import React from 'react';
import styles from "./app-main.module.scss";
import {Route, Routes} from "react-router-dom";
import CreateBurger from "@pages/create-burger/create-burger";

const AppMain = () => {
	return (
		<main className={styles.main}>
			<Routes>
				<Route element={<CreateBurger/>} path="/"/>
			</Routes>
		</main>
	);
};

export default AppMain;
