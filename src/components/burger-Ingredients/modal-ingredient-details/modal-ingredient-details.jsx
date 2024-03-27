import React, {useCallback} from 'react';
import {
	IngredientDetailsFromLocation
} from "@components/burger-Ingredients/ingredient-details/ingredient-details";
import Modal from "@components/modal/modal";
import {useNavigate} from "react-router-dom";

const ModalIngredientDetails = () => {
	const navigate = useNavigate();
	const handlerCloseModal = useCallback(
		() => {
			navigate(-1);
		},
		[navigate],
	);
	
	
	return (
		<Modal onClose={handlerCloseModal} title="Детали ингредиента">
			<IngredientDetailsFromLocation/>
		</Modal>
	);
};

export default ModalIngredientDetails;
