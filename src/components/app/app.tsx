import React from 'react';
import styles from './app.module.css';
import AppHeader from "../app-header/app-header";
import AppMain from "../app-main/app-main";

function App() {

	return (
		<div className={styles.app}>
			<AppHeader/>
			<AppMain/>
		</div>
	);
}

export default App;
