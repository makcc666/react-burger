import React from 'react';
import styles from "./item.module.scss";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {getRandomInt} from "../../../utils/data";

const Item = ({image, price, name, ...props}) => {
	const count = getRandomInt(0, 3) === 0 ? getRandomInt(1, 3) : null;
	return (
		<article className={styles.container}>
			{count && <Counter count={count} size="default" extraClass="m-1"/>}
			
			<img className={styles.image} src={image}/>
			<div className={styles.price}>
				<span>{price}</span>
				<CurrencyIcon type="primary"/>
			</div>
			<p className={styles.title}>{name}</p>
		</article>
	);
};

export default Item;
