import React, {useState} from 'react';
import classNames from "classnames";
import styles from "./burger-ingredients.module.scss";
import TabsIngredients from "./tabs/tabs";
import GroupIngredients from "./group/group";
import {getGroupedItems} from "../../utils/data";
import DetailsPopup from "./details-popup/details-popup";

const groupedIngredients = [...getGroupedItems().values()];


const BurgerIngredients = () => {
	// console.log(groupedIngredients)
	const [detailsPopup, setDetailsPopup] = useState(null);
	const handlerChoseIngredient = (ingredient) => {
		setDetailsPopup(() => ({...ingredient}));
	}
	
	
	return (
		<>
			<DetailsPopup ingredient={detailsPopup}/>
			<section className={classNames(styles.burgerIngredients)}>
				<h2 className={styles.title}>Соберите бургер</h2>
				<TabsIngredients/>
				<ul className={styles.ingredientsList}>
					{groupedIngredients.map(record => (
						<li key={record.title}>
							<GroupIngredients title={record.title} list={record.list}
								handlerChoseIngredient={handlerChoseIngredient}/>
						</li>
					))}
				
				</ul>
			</section>
		</>
	
	);
};

export default BurgerIngredients;
