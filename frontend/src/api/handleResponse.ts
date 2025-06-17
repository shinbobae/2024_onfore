import { ResultResponse } from './type';
import { notification } from 'antd';
import { useUserStore } from '../store/user/user.ts';
import { modal } from '@myThingsKr/emcore-js';
import useOrganizationStore from '../store/organization';

const handleResponse = async <T>(response: ResultResponse<T>) => {
  console.log('handleResponse', response);
  switch (response.code) {
    case 'FAIL':
      notification['warning']({
        message: response.message,
      });
      return response;
    case 'ACCESS_DENIED':
      modal.openAlert({
        title: '권한 없음',
        content: '해당 기능에 대한 권한이 없습니다.',
        icon: 'error',
      });
      return response;
    case 'SITE_HAS_ESG_SETUP':
      modal.openAlert({
        title: '시설 삭제 불가',
        content:
          '보드가 등록되어 있는 시설이 포함되어 있습니다.   \n ' +
          '데이터 관리에서 보드의 등록 시설을 변경한 후, 삭제해주세요.',
        icon: 'error',
      });
      return response;
    case 'INVALID_TOKEN': {
      notification['warning']({
        message: response.message,
      });
      useUserStore.getState().logout();
      break;
    }
    case 'EXPIRED_ACCESS_TOKEN': {
      notification['warning']({
        message: response.message,
      });
      return response;
    }
    case 'EXPIRED_REFRESH_TOKEN':
      notification['warning']({
        message: response.message,
      });
      useUserStore.getState().logout();
      return response;
    case 'INVALID_ID_PASSWORD':
      useUserStore.getState().setLoginError(true);
      return response;
    case 'DUPLICATE_USER_ACCOUNT':
      useOrganizationStore.getState().setDuplicateEmail(true);
      return response;
    default:
      notification['warning']({
        message: response.message,
      });
      return response;
  }
};
// 200
// SUCCESS("OK", "성공."),

// 400
// FAIL("FAIL", "예기치 못한 오류가 발생했습니다."),
// INVALID_PARAMETER("INVALID_PARAMETER", "필수 파라미터 누락 혹은 잘못된 파라미터가 존재 합니다."),

// 401
// INVALID_ACCOUNT("INVALID_ACCOUNT", "회원가입 되지 않은 사용자입니다."),
// INVALID_ID_PASSWORD("INVALID_ID_PASSWORD", "아이디 혹은 패스워드가 일치하지 않습니다."),
// LOGIN_LOCKED("LOGIN_LOCKED", "로그인 가능 횟수를 초과했습니다. 5분 뒤 다시 조회해주세요."),
// INVALID_TOKEN("INVALID_TOKEN", "잘못된 토큰 입니다."),
// EXPIRED_ACCESS_TOKEN("EXPIRED_ACCESS_TOKEN", "토큰이 만료 되었습니다."), // 1시간
// EXPIRED_REFRESH_TOKEN("EXPIRED_REFRESH_TOKEN", "토큰이 만료 되었습니다."), // 1일
//ACCESS_DENIED
// 500
// INVALID_DATABASE("INVALID_DATABASE", "예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요."),

export default handleResponse;
