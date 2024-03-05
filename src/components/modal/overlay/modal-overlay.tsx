import React from 'react';
import {PropsModalOverlay} from "./modal-overlay.types";
import styles from "./modal-overlay.module.scss"


const ModalOverlay = ({onClick}:PropsModalOverlay) => {
	return (
		<div onClick={onClick} className={styles.overlay}></div>
	);
};

export default ModalOverlay;
