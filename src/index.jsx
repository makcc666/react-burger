import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import {Provider} from 'react-redux';

import reportWebVitals from './reportWebVitals';
import store from "./service/store";


const root = ReactDOM.createRoot(
	document.getElementById('root')
);


(async () => {
	await Promise.all([
		document.fonts.load("normal 2px Jet Brains Mono", "1aф"),
		document.fonts.load("bold 2px Jet Brains Mono", "1aф"),
		document.fonts.load("italic 2px Jet Brains Mono", "1aф"),
		document.fonts.load("2px Iceland", "1aф")
	]);
	
	root.render(
		<React.StrictMode>
			<Provider store={store}>
				<App/>
			</Provider>
		</React.StrictMode>
	);
	
	// If you want to start measuring performance in your app, pass a function
	// to log results (for example: reportWebVitals(console.log))
	// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
	reportWebVitals();
})();



