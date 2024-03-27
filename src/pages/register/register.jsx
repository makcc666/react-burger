import React, {useState} from 'react';
import FormSlimBox from "@components/form-slim-box/form-slim-box";

import ContentFormSlimBox from "@components/form-slim-box/content/content";
import TitleFormSlimBox from "@components/form-slim-box/title/title";
import FooterFormSlimBox from "@components/form-slim-box/footer/footer";
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import useInputValue from "@hooks/use-input-value/use-input-value.hook";
import {useDispatch} from "react-redux";
import { userActions, } from "@store/user/user.slice";
import useLockLoader from "@hooks/use-lock-loader/use-lock-loader.hook";

import {doReqAuthLogin, doReqAuthRegister} from "@utils/api-requests/user";
import {Link} from "react-router-dom";


const AuthRegister = () => {
	const dispatch = useDispatch();
	
	const nameInput = useInputValue();
	const emailInput = useInputValue();
	const passwordInput = useInputValue();
	
	const formLock = useLockLoader(false);
	
	const handlerSubmit = async (event) => {
		event.preventDefault();
		const formData = Object.fromEntries(new FormData(event.target));
		
		if (!formLock.doTry(true)) return;
		try {
			formLock.clearMessage();
			const res = await doReqAuthRegister(formData);
			dispatch(userActions.updateUser(res))
			formLock.clearMessage();
		} catch (e) {
			formLock.updateMessage(e);
			formLock.unLock();
		}
	}
	
	return (
		<FormSlimBox handlerSubmit={handlerSubmit}>
			<TitleFormSlimBox>Регистрация</TitleFormSlimBox>
			
			<ContentFormSlimBox>
				<Input
					type={'text'}
					placeholder={'Имя'}
					onChange={nameInput.handler}
					value={nameInput.value}
					name={'name'}
					error={nameInput.value.trim().length<3}
					errorText={'Имя должно быть больше трёх символов'}
					size={'default'}
					extraClass="ml-1"
				/>
				
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
				
				<Button htmlType="submit" type="primary" size="medium" disabled={formLock.isLock}>Зарегистрироваться</Button>
			</ContentFormSlimBox>
			
			<FooterFormSlimBox>
				<div>
					<span>Уже зарегистрированы?</span>
					<Link to="/login">Войти</Link>
				</div>
			</FooterFormSlimBox>
		</FormSlimBox>
	);
};

export default AuthRegister;
