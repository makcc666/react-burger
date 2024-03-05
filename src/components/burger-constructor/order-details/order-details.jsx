import React from 'react';
import styles from "./order-details.module.scss";
import doneImage from "../../../images/done.png";

const OrderDetails = () => {
	return (
		<section className={styles.content}>
			<h1 className={styles.orderIdValue}>034536</h1>
			<span className={styles.orderIdDesc}>идентификатор заказа</span>
			<img src={doneImage} alt="Заказ создан" className={styles.doneImage}/>
			<span className={styles.doneDesc}>Ваш заказ начали готовить</span>
			<span className={styles.pointDesc}>Дождитесь готовности на орбитальной станции</span>
		</section>
	);
};

export default OrderDetails;
