import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  DashboardAccumType,
  MapItemType,
  RegionRankItemType,
  SiteDrawerDataType,
  SiteDrawerPeriodGraphType,
  SiteDrawerPeriodTableType,
} from './type.ts';
import { DataCategoryType, DataSiteType } from '../../type';
import { DashboardApi } from '../../api/dashboard';

type DashboardStateType = {
  accumulate: DashboardAccumType;
  region: MapItemType[] | null;
  site: MapItemType[] | null;
  mainDataCategory: DataCategoryType;
  mainSiteFilter: DataSiteType;
  mapCharFilter: { main: 'percent' | 'wow_percent'; sub: 'amount' };
  drawerData: { open: boolean; data: { id: string; title: string; type: DataSiteType } | null };
  siteDrawerData: SiteDrawerDataType | null;
  siteDrawerTableData: Record<DataCategoryType, SiteDrawerPeriodTableType | null> | null;
  siteDrawerGraphData: Record<DataCategoryType, SiteDrawerPeriodGraphType | null> | null;
  regionDataCategory: DataCategoryType[];
  regionDrawerRankData: Record<DataCategoryType, RegionRankItemType> | null;
  regionDrawerGraphData: Record<
    'month' | 'year' | 'all',
    { name: string; carbon?: number; electricity?: number; water?: number }[]
  >;
  // api state
  dashboardLoading: boolean;
  dashboardSuccess: boolean;
  dashboardError: boolean;
  siteDrawerLoading: boolean;
  siteDrawerSuccess: boolean;
  siteDrawerError: boolean;
  regionDrawerLoading: boolean;
  regionDrawerSuccess: boolean;
  regionDrawerError: boolean;
};

type DashboardActionType = {
  setMainDataCategory: (state: DataCategoryType) => void;
  setMainSiteFilter: (state: DataSiteType) => void;
  setMapCharFilter: (state: { main: 'percent' | 'wow_percent'; sub: 'amount' }) => void;
  setDrawerData: (state: { open: boolean; data: { id: string; title: string; type: DataSiteType } | null }) => void;
  // api
  getDashboardData: () => void;
  getSiteDrawerData: (siteId: string) => void;
  getRegionDrawerData: (regionId: string) => void;
};

const dashboardState: DashboardStateType = {
  accumulate: {
    carbon: { amount: 0, unit: '', increase: 0 },
    electricity: { amount: 0, unit: '', increase: 0 },
    water: { amount: 0, unit: '', increase: 0 },
  },
  region: null,
  site: null,
  mainDataCategory: 'carbon',
  mainSiteFilter: 'region',
  mapCharFilter: { main: 'percent', sub: 'amount' },
  drawerData: { open: false, data: null },
  siteDrawerData: null,
  siteDrawerTableData: null,
  siteDrawerGraphData: null,
  regionDataCategory: [],
  regionDrawerRankData: null,
  regionDrawerGraphData: { month: [], year: [], all: [] },
  // api state
  dashboardLoading: false,
  dashboardSuccess: false,
  dashboardError: false,
  siteDrawerLoading: false,
  siteDrawerSuccess: false,
  siteDrawerError: false,
  regionDrawerLoading: false,
  regionDrawerSuccess: false,
  regionDrawerError: false,
};

export const useDashboardStore = create(
  persist<DashboardStateType & DashboardActionType>(
    (set) => ({
      ...dashboardState,
      setMainDataCategory: (state) => {
        set({ mainDataCategory: state, drawerData: { open: false, data: null } });
      },
      setMainSiteFilter: (state) => {
        set({ mainSiteFilter: state, drawerData: { open: false, data: null } });
      },
      setMapCharFilter: (state) => {
        set({ mapCharFilter: state, drawerData: { open: false, data: null } });
      },
      setDrawerData: (state) => {
        set({ drawerData: state });
      },
      getDashboardData: async () => {
        set({ dashboardLoading: true, dashboardSuccess: false, dashboardError: false, region: [], site: [] });
        try {
          const response = await DashboardApi.getDashboard();
          const responseData = response.data;
          set({
            ...dashboardState,
            dashboardLoading: false,
            dashboardSuccess: true,
            dashboardError: false,
            accumulate: responseData.accumulate,
            region: responseData.region,
            site: responseData.site,
          });
        } catch (error) {
          console.error(error);
          set({ ...dashboardState, dashboardSuccess: false, dashboardError: true });
        }
      },
      getSiteDrawerData: async (siteId: string) => {
        set({ siteDrawerLoading: true });
        try {
          const response = await DashboardApi.getDashboardSite(siteId);
          const responseData = response.data;

          const generateGraphData = (category: DataCategoryType, period: 'month' | 'quarter' | 'year') => {
            const temp = [];
            if (responseData[category] === null) return [];
            for (let i = 0; i < responseData[category][period].period.length; i++) {
              const obj = Object();
              obj.name = responseData[category][period].period[i];
              obj[category] = responseData[category][period].amount[i];
              temp.push(obj);
            }
            return temp;
          };

          set({
            siteDrawerLoading: false,
            siteDrawerSuccess: true,
            siteDrawerError: false,
            siteDrawerData: {
              title: responseData.title || '',
              address: responseData.address + responseData.address_detail,
              organization_name: responseData.organization_name || '',
              category: responseData.category || [],
              carbon: responseData.carbon || null,
              electricity: responseData.electricity || null,
              water: responseData.water || null,
            },
            siteDrawerTableData: {
              carbon: responseData.carbon
                ? {
                    month: responseData.carbon.month,
                    quarter: responseData.carbon.quarter,
                    year: responseData.carbon.year,
                  }
                : null,
              electricity: responseData.electricity
                ? {
                    month: responseData.electricity.month,
                    quarter: responseData.electricity.quarter,
                    year: responseData.electricity.year,
                  }
                : null,
              water: responseData.water
                ? {
                    month: responseData.water.month,
                    quarter: responseData.water.quarter,
                    year: responseData.water.year,
                  }
                : null,
            },
            siteDrawerGraphData: {
              carbon: responseData
                ? {
                    month: generateGraphData('carbon', 'month'),
                    quarter: generateGraphData('carbon', 'quarter'),
                    year: generateGraphData('carbon', 'year'),
                  }
                : null,
              electricity: responseData
                ? {
                    month: generateGraphData('electricity', 'month'),
                    quarter: generateGraphData('electricity', 'quarter'),
                    year: generateGraphData('electricity', 'year'),
                  }
                : null,
              water: responseData
                ? {
                    month: generateGraphData('water', 'month'),
                    quarter: generateGraphData('water', 'quarter'),
                    year: generateGraphData('water', 'year'),
                  }
                : null,
            },
          });
        } catch (error) {
          console.error(error);
          set({ siteDrawerLoading: false, siteDrawerError: true });
        }
      },
      getRegionDrawerData: async (regionId: string) => {
        set({ regionDrawerLoading: true });
        try {
          const response = await DashboardApi.getDashboardRegion(regionId);
          const responseData = response.data;

          const generateGraphData = (period: 'month' | 'year' | 'all') => {
            const temp = [];
            if (responseData.graph[period].period.length === 0 || responseData.graph[period].period.length === null)
              return [];
            for (let i = 0; i < responseData.graph[period].period.length; i++) {
              const obj: { name: string; carbon?: number; electricity?: number; water?: number } = Object();
              obj.name = responseData.graph[period].period[i];
              if (responseData.graph[period].carbon) obj.carbon = responseData.graph[period].carbon[i];
              if (responseData.graph[period].electricity) obj.electricity = responseData.graph[period].electricity[i];
              if (responseData.graph[period].water) obj.water = responseData.graph[period].water[i];
              temp.push(obj);
            }
            return temp;
          };

          set({
            regionDrawerLoading: false,
            regionDrawerSuccess: false,
            regionDataCategory: responseData.rank.category,
            regionDrawerRankData: responseData
              ? {
                  carbon: {
                    ...responseData.rank.carbon,
                    site_list: responseData.rank.carbon.site_list
                      .sort((a, b) => a.accumulate - b.accumulate)
                      .map((item) => ({ ...item, unit: responseData.rank.carbon.unit })),
                  },
                  electricity: {
                    ...responseData.rank.electricity,
                    site_list: responseData.rank.electricity.site_list
                      .sort((a, b) => a.accumulate - b.accumulate)
                      .map((item) => ({ ...item, unit: responseData.rank.electricity.unit })),
                  },
                  water: {
                    ...responseData.rank.water,
                    site_list: responseData.rank.water.site_list
                      .sort((a, b) => a.accumulate - b.accumulate)
                      .map((item) => ({ ...item, unit: responseData.rank.water.unit })),
                  },
                }
              : null,
            regionDrawerGraphData: {
              month: generateGraphData('month'),
              year: generateGraphData('year'),
              all: generateGraphData('all'),
            },
          });
        } catch (error) {
          console.error(error);
          set({ regionDrawerLoading: false, regionDrawerError: true });
        }
      },
    }),
    {
      name: 'onliDashboardStorage',
      // storage: createJSONStorage(() => localStorage),
    },
  ),
);
