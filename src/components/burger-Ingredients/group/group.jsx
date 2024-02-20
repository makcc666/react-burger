import React from "react";
import styles from "./group.module.scss";
import Item from "../item/item";

const GroupIngredients = ({title,list,...props}) => {
	
	return (
		<aside>
			<h3 className={styles.title}>{title}</h3>
			<div className={styles.list}>
				{list.map(item=>(
					<Item {...item}/>
				))}
	
			</div>
		</aside>
	)
}
export default GroupIngredients