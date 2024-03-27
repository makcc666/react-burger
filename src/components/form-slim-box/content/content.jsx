import React from 'react';
import styles from "@components/form-slim-box/form-slim-box.module.scss";

const ContentFormSlimBox = ({children}) => {
	return (
		<div className={styles.content}>
			{children}
		</div>
	);
};

export default ContentFormSlimBox;
