import React from "react";
import styles from "./group.module.scss";
import Item from "../item/item";
import {IPropsGroup} from "./group.types";

const GroupIngredients = ({title, list, handlerChoseIngredient}: IPropsGroup) => {
	return (
		<aside>
			<h3 className={styles.title}>{title}</h3>
			<div className={styles.list}>
				{list.map(item => (
					<Item key={item._id} ingredient={item} handlerChoseIngredient={handlerChoseIngredient}/>
				))}
			</div>
		</aside>
	)
}
export default GroupIngredients