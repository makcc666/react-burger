import React from 'react';
import classNames from "classnames";
import styles from "./burger-ingredients.module.scss";
import TabsIngredients from "./tabs/tabs";
import GroupIngredients from "./group/group";
import {getGroupedItems} from "../../utils/data";



const BurgerIngredients = () => {
	const groupedIngredients = [...getGroupedItems().values()];
	// console.log(groupedIngredients)
	
	return (
		<section className={classNames(styles.burgerIngredients)}>
			<h2 className={styles.title}>Соберите бургер</h2>
			<TabsIngredients/>
			<ul className={styles.ingredientsList}>
				{groupedIngredients.map(record=> (
					<li key={record.title}>
						<GroupIngredients {...record}/>
					</li>
				))}
	
			</ul>
		</section>
	
	);
};

export default BurgerIngredients;
