import React, {useCallback} from 'react';
import OrderDetails from "../order-details/order-details";
import Modal from "../../modal/modal";
import {burgerOfferOrderSlice} from "../../../service/store/burger-offer-order/burger-offer-order.slice";
import {useDispatch, useSelector} from "react-redux";
import InfoBlock from "../../info-block/info-block";

const ModalOfferOrder = () => {
	const dispatch = useDispatch();
	const {status, error, orderNumber} = useSelector(store => store.offerOrder)
	
	const handlerCloseModal = useCallback(
		() => {
			dispatch(burgerOfferOrderSlice.actions.closeModal());
		},
		[dispatch],
	);
	
	
	let modalBody;
	switch (status) {
		default: {
			modalBody = (
				<InfoBlock message="Попробуйте перезагрузить страницу" title="Что-то пошло не так"/>
			);
			break;
		}
		case "initiation":
		case "pending": {
			modalBody = (
				<InfoBlock message="Отправляем данные на космические сервера" title="Загрузка"/>
			);
			break;
		}
		case "error": {
			modalBody = (
				<InfoBlock message={error} title="Ошибка"/>
			);
			break;
		}
		case "ready": {
			modalBody = (
				<OrderDetails orderNumber={orderNumber}/>
			);
			break;
		}
	}
	
	return (
		<Modal onClose={handlerCloseModal}>
			{modalBody}
		</Modal>
	);
};

export default ModalOfferOrder;
