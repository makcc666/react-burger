import React from 'react';
import Popup from "../../popup/popup";
import styles from "./order-popup.module.scss"
import {IPropsOrderPopup} from "./order-popup.types";
import doneImage from "../../../images/done.png"
const OrderPopup = ({switchController}: IPropsOrderPopup) => {
	// console.log("DetailsPopup::ingredient::", ingredient);
	return (
		<>
			<Popup className={styles.popupContainer} switchController={switchController} typeCloseButton="secondary">
				<section className={styles.popupContext}>
					<h1 className={styles.orderIdValue}>034536</h1>
					<span className={styles.orderIdDesc}>идентификатор заказа</span>
					<img src={doneImage} alt="Заказ создан" className={styles.doneImage}/>
					<span className={styles.doneDesc}>Ваш заказ начали готовить</span>
					<span className={styles.pointDesc}>Дождитесь готовности на орбитальной станции</span>
				</section>
			</Popup>
		</>
	);
};

export default OrderPopup;
