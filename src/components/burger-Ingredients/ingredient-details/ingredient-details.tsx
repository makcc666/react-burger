import React from 'react';
import styles from "./ingredient-details.module.scss";
import {IPropsDetailsPopup} from "./ingredient-details.types";

const IngredientDetails = ({ingredient}: IPropsDetailsPopup) => {
	return (
		<article className={styles.content}>
			<img src={ingredient.image} alt={ingredient.name} className={styles.image}/>
			<h3 className={styles.title}>{ingredient.name}</h3>
			<ul className={styles.nutritionalList}>
				<li className={styles.unit}>
					<span className={styles.nutritionalTitle}>Калории, ккал</span>
					<span className={styles.nutritionalValue}>{ingredient.calories}</span>
				</li>
				<li className={styles.unit}>
					<span className={styles.nutritionalTitle}>Белки, г</span>
					<span className={styles.nutritionalValue}>{ingredient.proteins}</span>
				</li>
				<li className={styles.unit}>
					<span className={styles.nutritionalTitle}>Жиры, г</span>
					<span className={styles.nutritionalValue}>{ingredient.fat}</span>
				</li>
				<li className={styles.unit}>
					<span className={styles.nutritionalTitle}>Углеводы, г</span>
					<span className={styles.nutritionalValue}>{ingredient.carbohydrates}</span>
				</li>
			</ul>
		</article>
	);
};

export default IngredientDetails;
