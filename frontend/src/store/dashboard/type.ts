import { DataCategoryType } from '../../type';

export type DashboardAccumType = {
  carbon: DashboardAccumItemType;
  electricity: DashboardAccumItemType;
  water: DashboardAccumItemType;
};

export type DashboardAccumItemType = {
  amount: number; // 누적량
  increase: number; // 증람량
  unit: string;
};

export type MapItemType = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
} & MapDataType;

export type MapDataType = {
  carbon: MapItemDataType | null;
  electricity: MapItemDataType | null;
  water: MapItemDataType | null;
};

export type MapItemDataType = {
  amount: number; // 데이터값
  percent: number; // 전체 대비 비중
  wow_percent: number; // 지난주 대비 증감률
  dod_amount: number; // 어제 대비 증감량
  unit: string;
};

export type SiteDrawerDataType = {
  title: string;
  address: string;
  organization_name: string;
  category: DataCategoryType[];
} & SiteDrawerCategoryDataType;

export type SiteDrawerPeriodTableType = Record<'month' | 'quarter' | 'year', SiteDrawerAnalysisType>;
export type SiteDrawerPeriodGraphType = Record<'month' | 'quarter' | 'year', any[]>;
export type SiteDrawerCategoryDataType = Record<DataCategoryType, SiteDrawerCategoryType | null>;
export type SiteDrawerCategoryType = {
  amount: number;
  unit: string;
  time_at: number;
  rank: number;
  rank_change: number;
  accumulate_total: number; // 전체 누적
  accumulate_today: number; // 오늘 누적
  month: SiteDrawerAnalysisType;
  quarter: SiteDrawerAnalysisType;
  year: SiteDrawerAnalysisType;
};
export type SiteDrawerAnalysisType = {
  period: string[];
  amount: number[];
  accumulate: number[];
  growth_rate: number[];
};

export type RegionGraphType = Record<
  'all' | 'month' | 'year',
  Record<DataCategoryType, number[]> & { period: string[] }
>;
export type RegionRankType = Record<DataCategoryType, RegionRankItemType> & { category: DataCategoryType[] };

export type RegionRankItemType = Omit<SiteDrawerCategoryType, 'month' | 'quarter' | 'year' | 'amount'> & {
  site_list: (RegionRankSiteItemType & { unit: string })[];
};
export type RegionRankSiteItemType = { accumulate: number; id: string; title: string; today: number; week: number };
