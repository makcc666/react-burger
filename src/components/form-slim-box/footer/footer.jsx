import React from 'react';
import styles from "@components/form-slim-box/form-slim-box.module.scss";
const FooterFormSlimBox = ({children}) => {
	return (
		<div className={styles.footer}>
			{children}
		</div>
	);
};

export default FooterFormSlimBox;
