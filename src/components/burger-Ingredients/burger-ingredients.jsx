import React from 'react';
import classNames from "classnames";
import styles from "./burger-ingredients.module.scss";
import TabsIngredients from "./tabs/tabs";
import GroupIngredients from "./group/group";



const BurgerIngredients = () => {
	return (
		<section className={classNames(styles.burgerIngredients)}>
			<h2 className={styles.title}>Соберите бургер</h2>
			<TabsIngredients/>
			<ul className={styles.ingredientsList}>
				<li className={styles.group}>
					<GroupIngredients/>
				</li>
				<li className={styles.group}>
					<GroupIngredients/>
				</li>
				<li className={styles.group}>
					<GroupIngredients/>
				</li>
				<li className={styles.group}>
					<GroupIngredients/>
				</li>
				<li className={styles.group}>
					<GroupIngredients/>
				</li>
				<li className={styles.group}>
					<GroupIngredients/>
				</li>
			</ul>
		</section>
	
	);
};

export default BurgerIngredients;
