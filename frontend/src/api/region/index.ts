import ApiCommon from '../api.ts';
import { ResultResponse } from '../type.ts';
import { RegionItem } from './type.ts';
import { toQueryString } from '../toQueryString.ts';

const getState = async (): Promise<ResultResponse<RegionItem[]>> => {
  return await ApiCommon.get(`/region/state`);
};

const getCity = async (data: string): Promise<ResultResponse<RegionItem[]>> => {
  const queryString = toQueryString({ state: data });
  return await ApiCommon.get(`/region/city${queryString}`);
};

export const RegionApi = { getState, getCity };
