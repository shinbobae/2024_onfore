/** @jsxImportSource @emotion/react */
import InputBox from '../../components/DataEntry/InputBox';
import useInput from '../../hooks/useInput.tsx';
import Flex from '../../components/Layout/Flex';
import { useNavigate } from 'react-router-dom';

import { Button } from '@myThingsKr/emcore-js';
import React, { useCallback, useEffect, useState } from 'react';
import useAdminUserStore from '../../store/user/user.ts';
import AdminLogo from '../../assets/logo/AdminLogo.tsx';

const Login = () => {
  const navigate = useNavigate();
  const [userId, onChangeUserId] = useInput<string>('');
  const [idError, setIdError] = useState<{ show: boolean; message: string }>({ show: false, message: '' });
  const [userPassword, onChangeUserPassword] = useInput<string>('');
  const { login, isLoggedIn, userInfo, loginError, setLoginError } = useAdminUserStore();

  useEffect(() => {
    if (userInfo || isLoggedIn) {
      navigate('/board');
    }
  }, [userInfo, isLoggedIn]);
  const regId = useCallback(() => {
    const reg = /^[a-zA-Z0-9]*$/;
    if (reg.test(userId)) setIdError({ show: false, message: '' });
    else setIdError({ show: true, message: '영어 및 숫자만 입력해 주세요' });
  }, [userId]);

  useEffect(() => {
    setLoginError(false);
  }, [userId, userPassword]);

  const onLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login({ user_account: userId, user_password: userPassword });
    },
    [userId, userPassword],
  );

  return (
    <>
      <form onSubmit={onLogin}>
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          width={'400px'}
          wrap={'wrap'}
          alignSelf={'stretch'}
          gap={'40px'}>
          <Flex align={'center'} justify={'center'}>
            <AdminLogo width={237} height={48} />
          </Flex>
          <Flex direction={'column'} width={'100%'} padding={'0 24px'}>
            <InputBox
              label="아이디"
              value={userId}
              status={idError.show ? 'error' : 'default'}
              errorMessage={idError.message}
              onBlur={regId}
              onChange={onChangeUserId}
            />
            <InputBox
              label="비밀번호"
              type="password"
              status={loginError ? 'error' : 'default'}
              errorMessage={'아이디 혹은 비밀번호가 일치하지 않습니다.'}
              value={userPassword}
              onChange={onChangeUserPassword}
            />
          </Flex>
          <Flex direction={'column'} align={'center'} width={'100%'} padding={'0 24px'} gap={'12px'}>
            <Button
              type="submit"
              block
              padding={'md'}
              color={'primary'}
              disabled={userId.length < 1 || userPassword.length < 1 || idError.show}>
              로그인
            </Button>
            <Flex justify={'center'} align={'center'} padding={'6px 12px'}>
              {/*<Button variant={'text'}>*/}
              {/*  <SubTitle level={2} color={black700}>*/}
              {/*    <Link to={'/'}>비밀번호를 잊으셨나요?</Link>*/}
              {/*  </SubTitle>*/}
              {/*</Button>*/}
            </Flex>
          </Flex>
        </Flex>
      </form>
    </>
  );
};
export default Login;
