//GET /board/unregistered
export type UnregisteredBoardResponse = { id: string }[];
//GET /board/organization
export type OrganizationListResponse = OrganizationItemType[];
export type OrganizationItemType = {
  id: string;
  name: string;
  sub_name: string;
  address: string;
  address_detail: string;
  phone: string;
  business_number: string;
};
//GET /board/organization/{organizationId}/registered
export type OrganizationBoardResponse = OrganizationBoardItem[];
export type OrganizationBoardItem = { id: string; name: string; used_yn: 'Y' | 'N' };

export type RegisterBoardRequest = { organizationId: string; id: string; name: string };
export type EditBoardRequest = { organizationId: string; boardId: string; name: string };
export type DeleteBoardRequest = { organizationId: string; id_list: string[] };
