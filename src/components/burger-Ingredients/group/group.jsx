import React from "react";
import styles from "./group.module.scss";
import Item from "../item/item";

const GroupIngredients = () => {
	
	return (
		<aside>
			<h3 className={styles.title}>Булки</h3>
			<div className={styles.list}>
				<Item/>
				<Item/>
				<Item/>
				<Item/>
				<Item/>
				<Item/>
				<Item/>
			</div>
		</aside>
	)
}
export default GroupIngredients