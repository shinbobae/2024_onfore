import { ResultResponse } from './type';
import { notification } from 'antd';
import { useAdminUserStore } from '../store/user/user.ts';

const handleResponse = async <T>(response: ResultResponse<T>) => {
  console.log('handleResponse', response);
  switch (response.code) {
    case 'FAIL':
      notification['warning']({
        message: response.message,
      });
      return response;
    case 'INVALID_TOKEN': {
      notification['warning']({
        message: response.message,
      });
      useAdminUserStore.getState().logout();
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
      useAdminUserStore.getState().logout();
      return response;
    case 'INVALID_ID_PASSWORD':
      useAdminUserStore.getState().setLoginError(true);
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
// BOARD_ALREADY_USED("BOARD_ALREADY_USED", "해당 보드는 이미 사용 이력이 있습니다."),/**/
// 500
// INVALID_DATABASE("INVALID_DATABASE", "예기치 못한 오류가 발생했습니다. 나중에 다시 시도해 주세요."),

export default handleResponse;
