import {
  DeleteDepartmentRequest,
  DeleteMemberRequest,
  DeleteSiteRequest,
  DepartmentResponse,
  EditDepartmentRequest,
  EditMemberRequest,
  EditOrgaInfoRequest,
  EditSiteRequest,
  MemberListRequest,
  MemberListResponse,
  OrganizationResponse,
  SaveDepartmentRequest,
  SaveMemberRequest,
  SaveSiteRequest,
  SiteListResponse,
  UploadOrgaImageRequest,
} from './type.ts';
import ApiCommon from '../api.ts';
import { ResultResponse } from '../type.ts';
import { toQueryString } from '../toQueryString.ts';
import useUserStore from '../../store/user/user.ts';

const getOrganizationInfo = async (): Promise<ResultResponse<OrganizationResponse>> => {
  return await ApiCommon.get('/organization');
};

const editOrganizationInfo = async (data: EditOrgaInfoRequest): Promise<ResultResponse<null>> => {
  const { organizationId, ...bodyData } = data;
  return await ApiCommon.put(`/organization/${organizationId}`, bodyData);
};

const saveDepartment = async (data: SaveDepartmentRequest): Promise<ResultResponse<null>> => {
  const { organizationId, ...bodyData } = data;
  return await ApiCommon.post(`/organization/${organizationId}/department`, bodyData);
};
const editDepartment = async (data: EditDepartmentRequest): Promise<ResultResponse<null>> => {
  const { organizationId, departmentId, ...bodyData } = data;
  return await ApiCommon.put(`/organization/${organizationId}/department/${departmentId}`, bodyData);
};

const deleteDepartment = async (data: DeleteDepartmentRequest): Promise<ResultResponse<null>> => {
  const { organizationId, ...bodyData } = data;
  const queryString = toQueryString(bodyData);
  return await ApiCommon.delete(`/organization/${organizationId}/department${queryString}`);
};

const saveSite = async (data: SaveSiteRequest): Promise<ResultResponse<null>> => {
  const { organizationId, ...bodyData } = data;
  return await ApiCommon.post(`/organization/${organizationId}/site`, bodyData);
};
const editSite = async (data: EditSiteRequest): Promise<ResultResponse<null>> => {
  const { organizationId, siteId, ...bodyData } = data;
  return await ApiCommon.put(`/organization/${organizationId}/site/${siteId}`, bodyData);
};

const deleteSite = async (data: DeleteSiteRequest): Promise<ResultResponse<null>> => {
  const { organizationId, ...bodyData } = data;
  const queryString = toQueryString(bodyData);
  return await ApiCommon.delete(`/organization/${organizationId}/site${queryString}`);
};

const getSiteList = async (organizationId: string): Promise<ResultResponse<SiteListResponse>> => {
  return await ApiCommon.get(`/organization/${organizationId}/site`);
};
const getDepartmentList = async (organizationId: string): Promise<ResultResponse<DepartmentResponse>> => {
  return await ApiCommon.get(`/organization/${organizationId}/department`);
};

const getMemberList = async (data: MemberListRequest): Promise<ResultResponse<MemberListResponse>> => {
  const { organizationId, ...searchParam } = data;
  const queryString = toQueryString(searchParam);
  return await ApiCommon.get(`/organization/${organizationId}/member${queryString}`);
};

const saveMember = async (data: SaveMemberRequest): Promise<ResultResponse<{ id: string }>> => {
  const { organizationId, ...bodyData } = data;
  return await ApiCommon.post(`/organization/${organizationId}/member`, bodyData);
};

const editMember = async (data: EditMemberRequest): Promise<ResultResponse<null>> => {
  const { organizationId, userId, ...bodyData } = data;
  return await ApiCommon.put(`/organization/${organizationId}/member/${userId}`, bodyData);
};

const deleteMember = async (data: DeleteMemberRequest): Promise<ResultResponse<null>> => {
  const { organizationId, ...bodyData } = data;
  const queryString = toQueryString(bodyData);
  return await ApiCommon.delete(`/organization/${organizationId}/member${queryString}`);
};

const uploadImage = async (
  data: UploadOrgaImageRequest,
): Promise<
  ResultResponse<{
    image_url: 'string';
  }>
> => {
  const { organizationId, ...bodyData } = data;

  return await ApiCommon.post(`/organization/${organizationId}/image-upload`, bodyData.image, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + useUserStore.getState().accessToken,
    },
  });
};

export const OrganizationApi = {
  getOrganizationInfo,
  editOrganizationInfo,
  saveDepartment,
  editDepartment,
  deleteDepartment,
  saveSite,
  editSite,
  deleteSite,
  getSiteList,
  getDepartmentList,
  getMemberList,
  saveMember,
  editMember,
  deleteMember,
  uploadImage,
};
