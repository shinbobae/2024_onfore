import ApiCommon from '../api.ts';
import { ResultResponse } from '../type.ts';
import { DataCategoryType } from '../../type';

import { toQueryString } from '../toQueryString.ts';
import {
  DeleteEsgSetupRequest,
  EditEsgSetupRequest,
  EsgSetupBoardListResponse,
  EsgSetupSiteListResponse,
  EsgSetupTypeResponse,
  SaveEsgSetupRequest,
} from './type.ts';

const getEsgTypeData = async (data: DataCategoryType): Promise<ResultResponse<EsgSetupTypeResponse>> => {
  return await ApiCommon.get(`/esg-setup/${data}`);
};

const getEsgSiteList = async (): Promise<ResultResponse<EsgSetupSiteListResponse>> => {
  return await ApiCommon.get(`/esg-setup/site`);
};

const getEsgBoardList = async (esgType: DataCategoryType): Promise<ResultResponse<EsgSetupBoardListResponse>> => {
  return await ApiCommon.get(`/esg-setup/board/${esgType}`);
};

const saveEsgSetup = async (data: SaveEsgSetupRequest) => {
  const { esgType, ...reqData } = data;
  return await ApiCommon.post(`/esg-setup/${esgType}`, reqData);
};

const editEsgSetup = async (data: EditEsgSetupRequest) => {
  const { esgType, id, ...reqData } = data;
  return await ApiCommon.put(`/esg-setup/${esgType}/${id}`, reqData);
};

const deleteEsgSetup = async (data: DeleteEsgSetupRequest) => {
  const { esgType, ...reqData } = data;
  const queryString = toQueryString(reqData);
  return await ApiCommon.delete(`/esg-setup/${esgType}${queryString}`);
};

export const ESGSetupApi = {
  getEsgTypeData,
  getEsgSiteList,
  getEsgBoardList,
  saveEsgSetup,
  editEsgSetup,
  deleteEsgSetup,
};
