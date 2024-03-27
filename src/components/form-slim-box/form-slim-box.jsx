import React from 'react';
import styles from "@components/form-slim-box/form-slim-box.module.scss";

const FormSlimBox = ({children, title, handlerSubmit}) => {
	return (
		<form className={styles.container} onSubmit={handlerSubmit}>
			<div>{title}</div>
			{children}
		</form>
	);
};

export default FormSlimBox

