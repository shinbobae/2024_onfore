// 관리자 페이지 보드 관리
import ApiCommon from '../api.ts';
import { ResultResponse } from '../type.ts';
import {
  DeleteBoardRequest,
  EditBoardRequest,
  OrganizationBoardResponse,
  OrganizationListResponse,
  RegisterBoardRequest,
  UnregisteredBoardResponse,
} from './type.ts';
import { toQueryString } from '../toQueryString.ts';

//조직목록조회
const getOrganization = async (): Promise<ResultResponse<OrganizationListResponse>> => {
  return await ApiCommon.get('/admin/board/organization');
};
//미등록보드조회
const getBoardUnregistered = async (): Promise<ResultResponse<UnregisteredBoardResponse>> => {
  return await ApiCommon.get('/admin/board/unregistered');
};
//조직 등록보드 조회
const getOrganizationBoard = async (organizationId: string): Promise<ResultResponse<OrganizationBoardResponse>> => {
  return await ApiCommon.get(`/admin/board/organization/${organizationId}/registered`);
};
//미등록 보드 등록
const registerBoard = async (data: RegisterBoardRequest): Promise<ResultResponse<null>> => {
  const { organizationId, ...bodyData } = data;
  return await ApiCommon.post(`/admin/board/organization/${organizationId}/registered`, bodyData);
};
//등록 보드 수정
const editBoard = async (data: EditBoardRequest): Promise<ResultResponse<null>> => {
  const { organizationId, boardId, ...bodyData } = data;
  return await ApiCommon.put(`/admin/board/organization/${organizationId}/registered/${boardId}`, bodyData);
};
//등록 보드 삭제
const deleteBoard = async (data: DeleteBoardRequest): Promise<ResultResponse<null>> => {
  const { organizationId, ...bodyData } = data;
  const queryString = toQueryString(bodyData);
  return await ApiCommon.delete(`/admin/board/organization/${organizationId}/registered${queryString}`);
};
export const BoardApi = {
  getOrganization,
  getBoardUnregistered,
  getOrganizationBoard,
  registerBoard,
  editBoard,
  deleteBoard,
};
