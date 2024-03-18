import React from 'react';
import styles from "./not-found.module.scss";
import InfoBlock from "@components/info-block/info-block";
import {Link} from "react-router-dom";
const NotFound = () => {
	return (
		<div className={styles.container}>
			<InfoBlock title="404 — Страница не найдена">
				<Link to="/" className={styles.link}>Перейти на главную</Link>
			</InfoBlock>
		</div>
	);
};

export default NotFound;
