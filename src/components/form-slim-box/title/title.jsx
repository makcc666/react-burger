import React from 'react';
import styles from "@components/form-slim-box/form-slim-box.module.scss";
const TitleFormSlimBox = ({children}) => {
	return (
		<div className={styles.title}>
			{children}
		</div>
	);
};

export default TitleFormSlimBox;
