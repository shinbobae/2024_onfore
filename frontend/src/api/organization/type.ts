import { MemberRoleType } from '../../type';

export type OrganizationResponse = {
  id: string;
  name: string;
  sub_name: string;
  address: string | null;
  address_detail: string | null;
  phone: string | null;
  business_number: string | null;
  department_list: OrgaDepartmentItem[] | null; // 부서 목록
  site_list: OrgaSiteItem[] | null; // 시설 목록
  img_url: string | null;
  country_code: string;
  country: string;
  state: string;
  city: string;
};

export type OrgaDepartmentItem = {
  id: string;
  name: string; // 부서명
  member_count: number;
  site_list: OrgaSiteItem[];
};

export type OrgaSiteItem = {
  id: string;
  name: string;
  address: string;
  address_detail: string | null;
  phone: string | null;
  latitude: number | undefined | null;
  longitude: number | undefined | null;
  timezone: string | undefined | null;
  description: string | null;
  public_yn: 'Y' | 'N';
  country_code: string;
  country: string;
  state: string;
  city: string;
};

export type EditOrgaInfoRequest = {
  organizationId: string;
  name: string;
  sub_name: string;
  address: string;
  address_detail: string;
  phone: string;
  business_number: string;
  country_code: string;
  country: string;
  state: string;
  city: string;
  img_url: string | null;
};

export type SaveDepartmentRequest = {
  organizationId: string;
  name: string;
  site_id_list: string[];
};

export type EditDepartmentRequest = SaveDepartmentRequest & { departmentId: string };

export type SiteListResponse = SiteResponseItem[];
export type SiteResponseItem = {
  id: string;
  name: string;
  address: string;
  address_detail: string;
  phone: string;
  timezone: string;
  latitude: number;
  longitude: number;
  description: string;
  public_yn: 'Y' | 'N';
};

export type DepartmentResponse = DepartmentItem[];

export type DepartmentItem = {
  id: string;
  name: string;
};

export type DeleteDepartmentRequest = {
  organizationId: string;
  id_list: string[];
};

export type SaveSiteRequest = {
  organizationId: string;
  name: string;
  address: string;
  address_detail: string | null;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  public_yn: string;
  country_code: string;
  country: string;
  state: string;
  city: string;
};

export type EditSiteRequest = SaveSiteRequest & { siteId: string };

export type DeleteSiteRequest = {
  organizationId: string;
  id_list: string[];
};

export type MemberListRequest = {
  organizationId: string;
  keyword?: string;
  role_list?: string[];
  department_id_list?: string[];
  page?: number;
  size?: number;
  sort?: [keyof MemberItem, 'asc' | 'desc']; //Record<keyof MemberItem, 'asc' | 'desc'>;
};

export type MemberListResponse = {
  page: number;
  size: number;
  total_page: number;
  total_elements: number;
  content: MemberItem[];
};
export type MemberItem = {
  id: string;
  name: string;
  department_id: string;
  department_name: string;
  role: MemberRoleType;
  user_account: string;
  phone: string;
  email: string;
};

export type SaveMemberRequest = {
  organizationId: string;
  department_id: string;
  name: string;
  role: MemberRoleType;
  user_account: string;
  phone: string;
  email: string;
};

export type EditMemberRequest = { userId: string } & SaveMemberRequest;
export type DeleteMemberRequest = {
  organizationId: string;
  id_list: string[];
};

export type UploadOrgaImageRequest = { organizationId: string; image: FormData };
