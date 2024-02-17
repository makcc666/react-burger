import React from 'react';
import styles from "./item.module.scss";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Item = () => {
	return (
		<article className={styles.container}>
			<Counter count={1} size="default" extraClass="m-1" />
			
			<img className={styles.image} src="https://code.s3.yandex.net/react/code/sauce-04.png"/>
			<div className={styles.price}>
				<span>20</span>
				<CurrencyIcon type="primary"/>
			</div>
			<p className={styles.title}>Краторная булка N-200i</p>
		</article>
	);
};

export default Item;
