import { DataCategoryType } from '../../type';

export type EsgSetupSiteListResponse = EsgSetupSiteItem[];

export type EsgSetupSiteItem = {
  id: string;
  name: string;
  address: string;
  address_detail: string;
  phone: string;
  timezone: string;
  latitude: number;
  longitude: number;
  description: string;
  public_yn: string;
  country_code: string;
  country: string;
  state: string;
  city: string;
};

export type EsgSetupBoardListResponse = {
  id: string;
  name: string;
  use_yn: 'Y' | 'N';
}[];

export type EsgSetupTypeResponse = EsgSetupTypeItem[];
export type EsgSetupTypeItem = {
  id: string;
  name: string;
  setup_list: EsgSetupListItem[];
};
export type EsgSetupListItem = {
  id: string;
  board_id: string;
  board_name: string;
  item_name: string;
  formula: string;
  work_yn: 'Y' | 'N';
  certified_by: string;
  certified_url: string;
};

export type SaveEsgSetupRequest = {
  esgType: DataCategoryType;
  board_id: string;
  site_id: string;
  item_name?: string;
  formula: string;
  certified_by?: string; // 인증기관
};

export type EditEsgSetupRequest = SaveEsgSetupRequest & {
  id: string; // item id
};

export type DeleteEsgSetupRequest = {
  esgType: DataCategoryType;
  id_list: string[];
};
