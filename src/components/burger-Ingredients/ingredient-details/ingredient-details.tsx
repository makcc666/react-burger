import React, {useMemo} from 'react';
import styles from "./ingredient-details.module.scss";
import {INGREDIENT_DETAILS_ERROR, IPropsDetailsPopup, IStoreMock} from "./ingredient-details.types";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import InfoBlock from "@components/info-block/info-block";
import {findIngredientFromList} from "@store/burger-ingredients/burger-ingredients.utils";


export const IngredientDetailsFromLocation = () => {
	const params = useParams();
	const id = params?.id ?? null;
	if (!id) throw new Error(INGREDIENT_DETAILS_ERROR.INVALID_ID);

	const ingredientsStoreData = useSelector((store: IStoreMock) => store.ingredients.list);
	const ingredientData = useMemo(
		() => findIngredientFromList(ingredientsStoreData, id),
		[id, ingredientsStoreData]
	);


	if (!ingredientData) return (
		<InfoBlock message={INGREDIENT_DETAILS_ERROR.NOT_FOUND_BY_ID} title="Детали ингредиента"/>
	)

	return (
		<IngredientDetails ingredient={ingredientData}/>
	)
}

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
