import React, {useState} from 'react';
import FormSlimBox from "@components/form-slim-box/form-slim-box";

import ContentFormSlimBox from "@components/form-slim-box/content/content";
import TitleFormSlimBox from "@components/form-slim-box/title/title";
import FooterFormSlimBox from "@components/form-slim-box/footer/footer";
import {Button, EmailInput, Input, PasswordInput,} from "@ya.praktikum/react-developer-burger-ui-components";
import useInputValue from "@hooks/use-input-value/use-input-value.hook";
import useLockLoader from "@hooks/use-lock-loader/use-lock-loader.hook";

import {doReqAuthResetPassword} from "@utils/api-requests/user";
import {Link, useNavigate} from "react-router-dom";
import {authStageFlagsStore} from "@store/user/user.utils";


const AuthResetPassword = () => {
	const navigate = useNavigate()
	
	const passwordInput = useInputValue("");
	const tokenInput = useInputValue("");
	const formLock = useLockLoader(false);
	
	const handlerSubmit = async (event) => {
		event.preventDefault();
		const formData = Object.fromEntries(new FormData(event.target));
		
		if (!formLock.doTry(true)) return;
		try {
			formLock.clearMessage();
			const res = await doReqAuthResetPassword(formData);
			navigate("/login", {replace: true})
			formLock.clearMessage();
		} catch (e) {
			formLock.updateMessage(e);
			formLock.unLock();
		}
	}
	
	return (
		<FormSlimBox handlerSubmit={handlerSubmit}>
			<TitleFormSlimBox>Восстановление пароля</TitleFormSlimBox>
			<ContentFormSlimBox>
				<PasswordInput
					onChange={passwordInput.handler}
					value={passwordInput.value}
					name={'password'}
					extraClass="mb-2"
					placeholder="Введите новый пароль"
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					onChange={tokenInput.handler}
					value={tokenInput.value}
					name={'token'}
					size={'default'}
					extraClass="ml-1"
				
				/>
				{formLock.hasMessage && <p>{formLock.message}</p>}
				<Button htmlType="submit" type="primary" size="medium" disabled={formLock.isLock}>Восстановить</Button>
			</ContentFormSlimBox>
			<FooterFormSlimBox>
				<div>
					<span>Вспомнили пароль?</span>
					<Link to="/login">Войти</Link>
				</div>
			</FooterFormSlimBox>
		</FormSlimBox>
	);
};

export default AuthResetPassword;
