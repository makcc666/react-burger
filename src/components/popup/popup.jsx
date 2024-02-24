import React, {useEffect, useRef, useState} from 'react';
import classNames from "classnames";
import styles from "./popup.module.scss"

const isClickInsideRectangle = (e, element) => {
	const r = element.getBoundingClientRect();
	
	return (
		e.clientX > r.left &&
		e.clientX < r.right &&
		e.clientY > r.top &&
		e.clientY < r.bottom
	);
};


const Popup = ({children, className, isOpen = false, typeCloseButton = "default", switchController}) => {
	const popupRef = useRef();
	
	const closePopup = () => {
		if (!popupRef.current) return;
		popupRef.current.close();
	}
	const openPopup = () => {
		if (!popupRef.current) return;
		popupRef.current.showModal();
	}
	
	const handlerBackdropClick = event => {
		// console.log("event::", event, event.target , popupRef.current);
		if (!popupRef.current || isClickInsideRectangle(event, popupRef.current)) return;
		closePopup();
		
	}
	
	useEffect(() => {
		if (!popupRef.current) return;
		
		if (typeof switchController === "function") {
			switchController({
				close: closePopup,
				open: openPopup,
			});
		}
		
		popupRef.current.addEventListener("click", handlerBackdropClick);
		if (isOpen) openPopup();
		
		return () => {
			if (!popupRef.current) return;
			
			popupRef.current.removeEventListener("click", handlerBackdropClick);
		}
	}, []);
	
	return (
		<dialog
			ref={popupRef}
			className={classNames(
				styles.container,
				className,
			)}
		>
			{typeCloseButton !== "disable" &&
				<button
					onClick={closePopup}
					className={classNames(
						styles.closeButton,
						{
							[styles.default]: typeCloseButton === "default",
							[styles.secondary]: typeCloseButton === "secondary",
						}
					)}
				>×</button>}
			{children}
		</dialog>
	);
};

export default Popup;
