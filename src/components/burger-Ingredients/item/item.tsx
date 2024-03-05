import React from 'react';
import styles from "./item.module.scss";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {IPropsItem} from "./item.types";

const Item = ({ingredient, handlerChoseIngredient}: IPropsItem) => {
	const count = null;
	return (
		<article className={styles.container} onClick={() => handlerChoseIngredient(ingredient)}>
			{count && <Counter count={count} size="default" extraClass="m-1"/>}

			<img className={styles.image} src={ingredient.image} alt={ingredient.name}/>
			<div className={styles.price}>
				<span>{ingredient.price}</span>
				<CurrencyIcon type="primary"/>
			</div>
			<p className={styles.title}>{ingredient.name}</p>
		</article>
	);
};

export default Item;
