import { create } from 'zustand';
import { OrganizationApi } from '../../api/organization';
import {
  DeleteDepartmentRequest,
  DeleteMemberRequest,
  DeleteSiteRequest,
  DepartmentResponse,
  EditDepartmentRequest,
  EditMemberRequest,
  EditOrgaInfoRequest,
  EditSiteRequest,
  MemberItem,
  MemberListRequest,
  OrganizationResponse,
  OrgaSiteItem,
  SaveDepartmentRequest,
  SaveMemberRequest,
  SaveSiteRequest,
  SiteListResponse,
  UploadOrgaImageRequest,
} from '../../api/organization/type.ts';
import React from 'react';

type OrganizationType = OrganizationStateType & OrganizationActionType;
type OrganizationStateType = {
  organizationId: string;
  organizationData: OrganizationResponse | null;
  organizationInfo: Pick<OrganizationResponse, 'name' | 'id' | 'country' | 'state' | 'city'> & {
    phone: string;
    address: string;
    subName: string;
    addressDetail: string;
    businessNumber: string;
    imageUrl: string | null;
    countryCode: string;
  };
  departmentDataSource: DepartmentDataType[];
  siteDataSource: SiteDataType[];
  siteList: SiteListResponse;
  departmentList: DepartmentResponse;
  memberList: MemberItem[];
  memberListTotal: number;
  memberDataSource: MemberDataType[];
  organizationLoading: boolean;
  orgaImageUrl: string | null;
  uploadOrgaImageLoading: boolean;
  uploadOrgaImageSuccess: boolean;
  uploadOrgaImageError: boolean;
  infoSaveLoading: boolean;
  infoSaveSuccess: boolean;
  infoSaveError: boolean;
  departmentSaveLoading: boolean;
  departmentSaveSuccess: boolean;
  departmentSaveError: boolean;
  departmentDeleteLoading: boolean;
  departmentDeleteSuccess: boolean;
  departmentDeleteError: boolean;
  siteSaveLoading: boolean;
  siteSaveSuccess: boolean;
  siteSaveError: boolean;
  siteDeleteLoading: boolean;
  siteDeleteSuccess: boolean;
  siteDeleteError: boolean;
  memberListLoading: boolean;
  memberListSuccess: boolean;
  memberListError: boolean;
  saveMemberLoading: boolean;
  saveMemberSuccess: boolean;
  saveMemberError: boolean;
  editMemberLoading: boolean;
  editMemberSuccess: boolean;
  editMemberError: boolean;
  deleteMemberLoading: boolean;
  deleteMemberSuccess: boolean;
  deleteMemberError: boolean;
  duplicateEmail: boolean;
};
type OrganizationActionType = {
  getOrganization: () => void;
  editOrganization: (data: EditOrgaInfoRequest) => void;
  uploadOrgaImage: (data: UploadOrgaImageRequest) => void;
  getSiteList: (orgaId: string) => void;
  getDepartmentList: (orgaId: string) => void;
  saveDepartment: (data: SaveDepartmentRequest) => void;
  editDepartment: (data: EditDepartmentRequest) => void;
  deleteDepartment: (data: DeleteDepartmentRequest) => void;
  saveSite: (data: SaveSiteRequest) => void;
  editSite: (data: EditSiteRequest) => void;
  deleteSite: (data: DeleteSiteRequest) => void;
  getMemberList: (data: MemberListRequest) => void;
  saveMember: (data: SaveMemberRequest) => void;
  editMember: (data: EditMemberRequest) => void;
  deleteMember: (data: DeleteMemberRequest) => void;
  setDuplicateEmail: (state: boolean) => void;
  resetApiState: () => void;
  reset: () => void;
};

export type DepartmentDataType = {
  key: React.Key;
  id: string;
  name: string;
  memberCount: number;
  siteList: OrgaSiteItem[];
};
export type SiteDataType = {
  key: React.Key;
  id: string;
  name: string;
  fullAddress: string;
  address: string;
  addressDetail: string | null;
  latitude: number | undefined | null;
  longitude: number | undefined | null;
  timezone: string | null | undefined;
  publicYn: 'Y' | 'N';
  countryCode: string;
  country: string;
  state: string;
  city: string;
};
export type MemberDataType = {
  key: React.Key;
  name: string;
  id: string;
  departmentId: string;
  departmentName: string;
  role: string;
  userAccount: string;
  phone: string;
  email: string;
};
const organizationState: OrganizationStateType = {
  organizationId: '',
  organizationData: null,
  organizationInfo: {
    id: '',
    name: '',
    subName: '',
    businessNumber: '',
    phone: '',
    address: '',
    addressDetail: '',
    imageUrl: null,
    countryCode: '',
    country: '',
    state: '',
    city: '',
  },
  departmentDataSource: [],
  siteDataSource: [],
  siteList: [],
  departmentList: [],
  memberList: [],
  memberListTotal: 0,
  memberDataSource: [],
  organizationLoading: false,
  orgaImageUrl: null,
  uploadOrgaImageLoading: false,
  uploadOrgaImageSuccess: false,
  uploadOrgaImageError: false,
  infoSaveLoading: false,
  infoSaveSuccess: false,
  infoSaveError: false,
  departmentSaveLoading: false,
  departmentSaveSuccess: false,
  departmentSaveError: false,
  departmentDeleteLoading: false,
  departmentDeleteSuccess: false,
  departmentDeleteError: false,
  siteSaveLoading: false,
  siteSaveSuccess: false,
  siteSaveError: false,
  siteDeleteLoading: false,
  siteDeleteSuccess: false,
  siteDeleteError: false,
  memberListLoading: false,
  memberListSuccess: false,
  memberListError: false,
  saveMemberLoading: false,
  saveMemberSuccess: false,
  saveMemberError: false,
  editMemberLoading: false,
  editMemberSuccess: false,
  editMemberError: false,
  deleteMemberLoading: false,
  deleteMemberSuccess: false,
  deleteMemberError: false,
  duplicateEmail: false,
};

export const useOrganizationStore = create<OrganizationType>((set) => ({
  ...organizationState,

  getOrganization: async () => {
    set({ ...organizationState, organizationLoading: true });
    await OrganizationApi.getOrganizationInfo()
      .then((response) => {
        const responseData = response.data;
        set({
          ...organizationState,
          organizationId: responseData.id,
          organizationData: responseData,
          organizationInfo: {
            id: responseData.id,
            name: responseData.name,
            subName: responseData.sub_name,
            businessNumber: responseData.business_number ?? '',
            address: responseData.address ?? '',
            addressDetail: responseData.address_detail ?? '',
            phone: responseData.phone ?? '',
            imageUrl: responseData.img_url,
            countryCode: responseData.country_code,
            country: responseData.country,
            state: responseData.state,
            city: responseData.city,
          },
          departmentDataSource: responseData.department_list
            ? responseData.department_list.map((item) => ({
                key: item.id,
                id: item.id,
                name: item.name,
                memberCount: item.member_count,
                siteList: item.site_list,
              }))
            : [],
          siteDataSource: responseData.site_list
            ? responseData.site_list.map((item) => ({
                key: item.id,
                id: item.id,
                name: item.name,
                fullAddress: item.address + ' ' + (item.address_detail ?? ''),
                address: item.address,
                addressDetail: item.address_detail,
                longitude: item.longitude,
                latitude: item.latitude,
                timezone: item.timezone,
                publicYn: item.public_yn,
                countryCode: item.country_code,
                country: item.country,
                state: item.state,
                city: item.city,
              }))
            : [],
        });
      })
      .catch((error) => {
        console.error(error);
        set({ ...organizationState });
      });
    set({ organizationLoading: false });
  },
  editOrganization: async (data) => {
    set({ infoSaveLoading: true });
    await OrganizationApi.editOrganizationInfo(data)
      .then(() => set({ infoSaveLoading: false, infoSaveSuccess: true, infoSaveError: false }))
      .catch(() => set({ infoSaveLoading: false, infoSaveError: true, infoSaveSuccess: false }));
  },
  uploadOrgaImage: async (data) => {
    set({ uploadOrgaImageLoading: true });
    await OrganizationApi.uploadImage(data)
      .then((response) => {
        set({
          uploadOrgaImageLoading: false,
          uploadOrgaImageSuccess: true,
          uploadOrgaImageError: false,
          orgaImageUrl: response.data.image_url,
        });
      })
      .catch(() => {
        set({
          uploadOrgaImageLoading: false,
          uploadOrgaImageSuccess: false,
          uploadOrgaImageError: true,
          orgaImageUrl: null,
        });
      });
  },
  getSiteList: async (orgaId) => {
    await OrganizationApi.getSiteList(orgaId)
      .then((response) => {
        set({ siteList: response.data });
      })
      .catch();
  },
  getDepartmentList: async (orgaId) => {
    await OrganizationApi.getDepartmentList(orgaId)
      .then((response) => {
        set({ departmentList: response.data });
      })
      .catch();
  },
  saveDepartment: async (data) => {
    set({ departmentSaveLoading: true });
    await OrganizationApi.saveDepartment(data)
      .then(() => {
        set({ departmentSaveLoading: false, departmentSaveSuccess: true, departmentSaveError: false });
      })
      .catch(() => {
        set({ departmentSaveLoading: false, departmentSaveSuccess: false, departmentSaveError: true });
      });
  },
  editDepartment: async (data) => {
    set({ departmentSaveLoading: true });
    await OrganizationApi.editDepartment(data)
      .then(() => {
        set({ departmentSaveLoading: false, departmentSaveSuccess: true, departmentSaveError: false });
      })
      .catch(() => {
        set({ departmentSaveLoading: false, departmentSaveSuccess: false, departmentSaveError: true });
      });
  },
  deleteDepartment: async (data) => {
    set({ departmentDeleteLoading: true });
    await OrganizationApi.deleteDepartment(data)
      .then(() => {
        set({ departmentDeleteLoading: false, departmentDeleteSuccess: true, departmentDeleteError: false });
      })
      .catch(() => {
        set({ departmentDeleteLoading: false, departmentDeleteSuccess: false, departmentDeleteError: true });
      });
  },
  saveSite: async (data) => {
    set({ siteSaveLoading: true });
    await OrganizationApi.saveSite(data)
      .then(() => {
        set({ siteSaveLoading: false, siteSaveSuccess: true, siteSaveError: false });
      })
      .catch(() => {
        set({ siteSaveLoading: false, siteSaveSuccess: false, siteSaveError: true });
      });
  },
  editSite: async (data) => {
    set({ siteSaveLoading: true });
    await OrganizationApi.editSite(data)
      .then(() => {
        set({ siteSaveLoading: false, siteSaveSuccess: true, siteSaveError: false });
      })
      .catch(() => {
        set({ siteSaveLoading: false, siteSaveSuccess: false, siteSaveError: true });
      });
  },
  deleteSite: async (data) => {
    set({ siteDeleteLoading: true });
    await OrganizationApi.deleteSite(data)
      .then(() => {
        set({ siteDeleteLoading: false, siteDeleteSuccess: true, siteDeleteError: false });
      })
      .catch(() => {
        set({ siteDeleteLoading: false, siteDeleteSuccess: false, siteDeleteError: true });
      });
  },
  getMemberList: async (data) => {
    set({ memberListLoading: true, memberListSuccess: false, memberListError: false });
    await OrganizationApi.getMemberList(data)
      .then((response) => {
        set({
          memberListLoading: false,
          memberListSuccess: true,
          memberListError: false,
          memberList: response.data.content,
          memberListTotal: response.data.total_elements,
          memberDataSource: response.data.content.map((item) => ({
            key: item.id,
            id: item.id,
            departmentId: item.department_id,
            departmentName: item.department_name,
            name: item.name,
            userAccount: item.user_account,
            phone: item.phone,
            email: item.email,
            role: item.role,
          })),
        });
      })
      .catch(() => {
        set({ memberListLoading: false, memberListSuccess: false, memberListError: true });
      });
  },
  saveMember: async (data) => {
    set({ saveMemberLoading: true, saveMemberSuccess: false, saveMemberError: false });
    await OrganizationApi.saveMember(data)
      .then(() => {
        set({ saveMemberLoading: false, saveMemberSuccess: true, saveMemberError: false });
      })
      .catch(() => {
        set({ saveMemberLoading: false, saveMemberSuccess: false, saveMemberError: true });
      });
  },
  editMember: async (data) => {
    set({ editMemberLoading: true, editMemberSuccess: false, editMemberError: false });
    await OrganizationApi.editMember(data)
      .then(() => {
        set({ editMemberLoading: false, editMemberSuccess: true, editMemberError: false });
      })
      .catch(() => {
        set({ editMemberLoading: false, editMemberSuccess: false, editMemberError: true });
      });
  },
  deleteMember: async (data) => {
    set({ deleteMemberLoading: true, deleteMemberSuccess: false, deleteMemberError: false });
    await OrganizationApi.deleteMember(data)
      .then(() => {
        set({ deleteMemberLoading: false, deleteMemberSuccess: true, deleteMemberError: false });
      })
      .catch(() => {
        set({ deleteMemberLoading: false, deleteMemberSuccess: false, deleteMemberError: true });
      });
  },
  setDuplicateEmail: (state) => {
    set({ duplicateEmail: state });
  },
  resetApiState: () => {
    set({
      organizationLoading: false,
      infoSaveLoading: false,
      infoSaveSuccess: false,
      infoSaveError: false,
      departmentSaveLoading: false,
      departmentSaveSuccess: false,
      departmentSaveError: false,
      departmentDeleteLoading: false,
      departmentDeleteSuccess: false,
      departmentDeleteError: false,
      siteSaveLoading: false,
      siteSaveSuccess: false,
      siteSaveError: false,
      siteDeleteLoading: false,
      siteDeleteSuccess: false,
      siteDeleteError: false,
      memberListLoading: false,
      memberListSuccess: false,
      memberListError: false,
      saveMemberLoading: false,
      saveMemberSuccess: false,
      saveMemberError: false,
      editMemberLoading: false,
      editMemberSuccess: false,
      editMemberError: false,
      deleteMemberLoading: false,
      deleteMemberSuccess: false,
      deleteMemberError: false,
    });
  },
  reset: () => set({ ...organizationState }),
}));

export default useOrganizationStore;
