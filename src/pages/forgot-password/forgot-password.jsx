import React, {useState} from 'react';
import FormSlimBox from "@components/form-slim-box/form-slim-box";

import ContentFormSlimBox from "@components/form-slim-box/content/content";
import TitleFormSlimBox from "@components/form-slim-box/title/title";
import FooterFormSlimBox from "@components/form-slim-box/footer/footer";
import {Button, EmailInput,} from "@ya.praktikum/react-developer-burger-ui-components";
import useInputValue from "@hooks/use-input-value/use-input-value.hook";
import useLockLoader from "@hooks/use-lock-loader/use-lock-loader.hook";

import {doReqAuthForgotPassword} from "@utils/api-requests/user";
import {Link, useNavigate} from "react-router-dom";
import {authStageFlagsStore} from "@store/user/user.utils";


const AuthForgotPassword = () => {
	const navigate = useNavigate()
	
	const emailInput = useInputValue("qsglxy82on@gonetor.com");
	const formLock = useLockLoader(false);
	
	const handlerSubmit = async (event) => {
		event.preventDefault();
		const formData = Object.fromEntries(new FormData(event.target));
		
		if (!formLock.doTry(true)) return;
		try {
			formLock.clearMessage();
			const res = await doReqAuthForgotPassword(formData);
			authStageFlagsStore.add("logout", "reset-password");
			formLock.clearMessage();
			navigate("/reset-password")
		} catch (e) {
			formLock.updateMessage(e);
			formLock.unLock();
		}
	}
	
	return (
		<FormSlimBox handlerSubmit={handlerSubmit}>
			<TitleFormSlimBox>Вход</TitleFormSlimBox>
			<ContentFormSlimBox>
				<EmailInput
					onChange={emailInput.handler}
					value={emailInput.value}
					name={'email'}
					isIcon={false}
				/>
				{formLock.hasMessage && <p>{formLock.message}</p>}
				<Button htmlType="submit" type="primary" size="medium" disabled={formLock.isLock}>Восстановить</Button>
			</ContentFormSlimBox>
			<FooterFormSlimBox>
				<div>
					<span>Вспомнили пароль?</span>
					<Link to="Да/login">Войти</Link>
				</div>
			</FooterFormSlimBox>
		</FormSlimBox>
	);
};

export default AuthForgotPassword;
