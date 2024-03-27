import React, {useState} from 'react';
import FormSlimBox from "@components/form-slim-box/form-slim-box";

import ContentFormSlimBox from "@components/form-slim-box/content/content";
import TitleFormSlimBox from "@components/form-slim-box/title/title";
import FooterFormSlimBox from "@components/form-slim-box/footer/footer";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import useInputValue from "@hooks/use-input-value/use-input-value.hook";
import {useDispatch} from "react-redux";
import { userActions, } from "@store/user/user.slice";
import useLockLoader from "@hooks/use-lock-loader/use-lock-loader.hook";

import {doReqAuthLogin} from "@utils/api-requests/user";
import {Link} from "react-router-dom";


const AuthLogin = () => {
	const dispatch = useDispatch();
	const emailInput = useInputValue("");
	const passwordInput = useInputValue("");
	
	const formLock = useLockLoader(false);
	
	const handlerSubmit = async (event) => {
		event.preventDefault();
		const formData = Object.fromEntries(new FormData(event.target));
		
		if (!formLock.doTry(true)) return;
		try {
			formLock.clearMessage();
			const res = await doReqAuthLogin(formData);
			dispatch(userActions.updateUser(res))
			formLock.clearMessage();
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
				<PasswordInput
					onChange={passwordInput.handler}
					value={passwordInput.value}
					name={'password'}
					extraClass="mb-2"
				/>
				{formLock.hasMessage && <p>{formLock.message}</p>}
				<Button htmlType="submit" type="primary" size="medium" disabled={formLock.isLock}>Войти</Button>
			</ContentFormSlimBox>
			<FooterFormSlimBox>
				<div>
					<span>Вы — новый пользователь?</span>
					<Link to="/register">Зарегистрироваться</Link>
				</div>
				<div>
					<span>Забыли пароль?</span>
					<Link to="/forgot-password">Восстановить пароль</Link>
				</div>
			</FooterFormSlimBox>
		</FormSlimBox>
	);
};

export default AuthLogin;
