import React, {useEffect} from 'react';
import {createPortal} from "react-dom";
import {IPropsModal, MODAL_CONSTANTS} from "./modal.types";
import styles from "./modal.module.scss";
import ModalOverlay from "./overlay/modal-overlay";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import classNames from "classnames";

const elementModalContainer = document.querySelector(MODAL_CONSTANTS.CONTAINER_SELECTOR);


const Modal = ({onClose, title, children}: IPropsModal) => {
	if (!elementModalContainer) throw new Error("Cant find container for modal");

	useEffect(() => {
		const _handlerEscapeKey = (event: KeyboardEvent) => {
			if (event.key !== "Escape") return;
			onClose();
		}

		document.addEventListener("keydown", _handlerEscapeKey);
		return () => document.removeEventListener("keydown", _handlerEscapeKey);

	}, []);

	return createPortal(
		<>
			<div className={styles.container}>
				<section className={styles.content}>
					<button
						className={classNames(
							styles.closeButton,
							{
								[styles.default]: !!title,
								[styles.secondary]: !title,
							}
						)}
						onClick={onClose}
					>
						<CloseIcon type="primary"/>
					</button>
					{title && <h2 className={styles.title}>{title}</h2>}
					<div className={styles.children}>
						{children}
					</div>
				</section>
			</div>
			<ModalOverlay onClick={onClose}/>
		</>,
		elementModalContainer
	);
};

export default Modal;
