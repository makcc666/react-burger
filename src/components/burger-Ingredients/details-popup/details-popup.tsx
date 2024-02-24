import React from 'react';
import {IPropsDetailsPopup} from "./details-popup.types";
import Popup from "../../popup/popup";
import styles from "./details-popup.module.scss"

const DetailsPopup = ({ingredient}: IPropsDetailsPopup) => {
	// console.log("DetailsPopup::ingredient::", ingredient);
	if (!ingredient) return (<></>);
	return (
			<Popup className={styles.popupContainer} isOpen={true} key={Math.random()} switchController={undefined}>
				<section>
					<h2 className={styles.sectionTitle}>Детали ингредиента</h2>
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
				</section>
			</Popup>
	);
};

export default DetailsPopup;
