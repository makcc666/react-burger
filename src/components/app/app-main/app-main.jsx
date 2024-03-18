import React from 'react';
import styles from "./app-main.module.scss";
import {Route, Routes} from "react-router-dom";
import CreateBurger from "@pages/create-burger/create-burger";
import NotFound from "@pages/not-found/not-found";

const AppMain = () => {
	return (
		<main className={styles.main}>
			<Routes>
				<Route path="/" element={<CreateBurger/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</main>
	);
};

export default AppMain;
