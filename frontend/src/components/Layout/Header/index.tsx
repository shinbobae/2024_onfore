/** @jsxImportSource @emotion/react */
import { Row } from 'antd';
import { gnbWrapStyle, headerWrapStyle } from './style.ts';
import { Link, useNavigate } from 'react-router-dom';
import OnliGNB from '../GNB';
import { useUserStore } from '../../../store/user/user.ts';
import { menuProfile, menuWrapStyle } from '../GNB/style.ts';
import SvgIcProfile from '../../../assets/icon/IcProfile.tsx';
import { useEffect, useRef, useState } from 'react';
import Flex from '../Flex';
import Caption from '../../Typography/Caption.tsx';
import { black100, black700, black800, black900, Button, useConfirm } from '@myThingsKr/emcore-js';
import SubTitle from '../../Typography/SubTitle';
import OnforeLogo from '../../../assets/logo/OnforeLogo.tsx';

const OnliHeader = () => {
  const { isLoggedIn, logout, getUserInfo, userInfo } = useUserStore();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const { openConfirm } = useConfirm();
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isLoggedIn === false) {
      setProfileOpen(false);
      navigate('/dashboard');
    } else {
      getUserInfo();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const getSelectOutside = (e: globalThis.MouseEvent) => {
      if (!profileRef.current?.contains(e.target as HTMLDivElement)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener('mouseup', getSelectOutside);
    return () => {
      window.removeEventListener('mouseup', getSelectOutside);
    };
  }, [profileRef]);

  return (
    <header id={'onli_header'} css={headerWrapStyle}>
      <Row justify="space-between" align="middle">
        <div css={gnbWrapStyle}>
          <Link to={'/dashboard'}>
            <Flex justify={'center'} align={'center'} style={{ width: '118px', height: '28px' }}>
              <OnforeLogo width={118} />
            </Flex>
          </Link>

          {isLoggedIn ? (
            <OnliGNB />
          ) : (
            <div css={menuWrapStyle}>
              <Link to={'/dashboard'}>
                <Button
                  variant={'text'}
                  color={location.pathname === '/dashboard' ? 'primary' : 'default'}
                  fontSize={16}
                  style={location.pathname !== '/dashboard' ? { color: black900 } : {}}>
                  온포레 지도
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div css={menuWrapStyle}>
          {isLoggedIn ? (
            <>
              <Link to={'/alarm'}>
                <Button variant={'text'} fontSize={16} fontWeight={500} style={{ color: black900 }}>
                  알림
                </Button>
              </Link>
              <Link to={'/help'}>
                <Button variant={'text'} fontSize={16} fontWeight={500} style={{ color: black900 }}>
                  도움말
                </Button>
              </Link>
              <div ref={profileRef}>
                <button onClick={() => setProfileOpen((state) => !state)}>
                  <SvgIcProfile width={32} />
                </button>
                {profileOpen && (
                  <div css={menuProfile}>
                    <Flex width={'280px'} padding={'20px 20px 16px'} direction={'column'}>
                      <Flex align={'center'} alignSelf={'stretch'}>
                        <Caption color={black700}>계정 정보</Caption>
                      </Flex>
                      <Flex padding={'16px 0'} align={'center'} alignSelf={'stretch'} gap={'12px'}>
                        <SvgIcProfile width={32} />
                        <Flex direction={'column'} gap={'2px'}>
                          <SubTitle level={1} color={black800}>
                            {userInfo ? userInfo.name : '-'}
                          </SubTitle>
                          <Caption color={black800}>{userInfo ? userInfo.email : '-'}</Caption>
                        </Flex>
                      </Flex>
                      <Flex padding={'16px 0'} align={'center'} alignSelf={'stretch'}>
                        <SubTitle level={1} color={black800}>
                          <Link to={'/profile'} onClick={() => setProfileOpen(false)}>
                            계정 관리
                          </Link>
                        </SubTitle>
                      </Flex>
                    </Flex>
                    <Flex
                      padding={'16px 20px'}
                      align={'center'}
                      alignSelf={'stretch'}
                      style={{ borderTop: `1px solid ${black100}` }}>
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          openConfirm({
                            title: '로그아웃 하시겠습니까?',
                            ok: logout,
                            okText: '로그아웃',
                            okColor: 'primary',
                          });
                        }}>
                        <SubTitle level={1} color={black800}>
                          로그아웃
                        </SubTitle>
                      </button>
                    </Flex>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to={'/service'}>
                <Button variant={'text'} fontSize={16} fontWeight={500} style={{ color: black900 }}>
                  서비스 소개
                </Button>
              </Link>

              <Link to={'/login'}>
                <Button color={'primary'} fontSize={16}>
                  시작하기
                </Button>
              </Link>
            </>
          )}
        </div>
      </Row>
    </header>
  );
};

export default OnliHeader;
