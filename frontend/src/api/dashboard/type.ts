import {
  DashboardAccumType,
  MapItemType,
  RegionGraphType,
  RegionRankType,
  SiteDrawerCategoryDataType,
} from '../../store/dashboard/type.ts';
import { DataCategoryType } from '../../type';

export type DashboardResponse = {
  accumulate: DashboardAccumType;
  region: MapItemType[];
  site: MapItemType[];
};
export type RegionDrawerResponse = {
  graph: RegionGraphType;
  rank: RegionRankType;
};
export type SiteDrawerResponse = {
  id: string;
  title: string;
  address: string;
  address_detail: string;
  organization_id: string;
  organization_name: string;
  category: DataCategoryType[];
} & SiteDrawerCategoryDataType;
