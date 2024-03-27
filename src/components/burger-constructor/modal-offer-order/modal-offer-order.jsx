import React, {useCallback, useState} from 'react';
import OrderDetails from "../order-details/order-details";
import Modal from "../../modal/modal";
import {burgerOfferOrderSlice} from "../../../service/store/burger-offer-order/burger-offer-order.slice";
import {useDispatch, useSelector} from "react-redux";
import InfoBlock from "../../info-block/info-block";
import {ProtectedRouteForUser} from "@components/protected-route-element/protected-route-element";
import {Navigate} from "react-router-dom";
import {burgerConstructorSlice} from "@store/burger-constructor/burger-constructor.slice";

const ModalOfferOrder = ({onClose}) => {
	const dispatch = useDispatch();
	let {status, error, orderNumber} = useSelector(store => store.offerOrder)
	
	const handlerCloseModal = useCallback(
		() => {
			dispatch(burgerConstructorSlice.actions.resetStore());
			onClose(orderNumber);
		},
		[onClose,dispatch],
	);
	
	
	let modalBody;
	switch (status) {
		default: {
			console.log("modal-offer-SWITCH::case::1")
			modalBody = (
				<InfoBlock message="Попробуйте перезагрузить страницу" title="Что-то пошло не так"/>
			);
			break;
		}
		case "initiation":
		case "pending": {
			console.log("modal-offer-SWITCH::case::2")
			modalBody = (
				<InfoBlock message="Отправляем данные на космические сервера" title="Загрузка"/>
			);
			break;
		}
		case "error": {
			console.log("modal-offer-SWITCH::case::3")
			modalBody = (
				<InfoBlock message={error} title="Ошибка"/>
			);
			break;
		}
		case "ready": {
			console.log("modal-offer-SWITCH::case::4")
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
