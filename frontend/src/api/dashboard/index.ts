import { DashboardResponse, RegionDrawerResponse, SiteDrawerResponse } from './type.ts';
import ApiCommon from '../api.ts';
import { ResultResponse } from '../type.ts';

const getDashboard = async (): Promise<ResultResponse<DashboardResponse>> => {
  return await ApiCommon.get('/dashboard');
};
const getDashboardRegion = async (regionId: string): Promise<ResultResponse<RegionDrawerResponse>> => {
  return await ApiCommon.get(`/dashboard/region/${regionId}`);
};
const getDashboardSite = async (siteId: string): Promise<ResultResponse<SiteDrawerResponse>> => {
  return await ApiCommon.get(`/dashboard/site/${siteId}`);
};

export const DashboardApi = { getDashboard, getDashboardRegion, getDashboardSite };
