import { create } from 'zustand';
import { OPTION } from '../../type';
import { RegionApi } from '../../api/region';

type RegionType = RegionStateType & RegionActionType;
type RegionStateType = {
  stateOptions: OPTION[];
  cityOptions: OPTION[];
};
type RegionActionType = {
  getRegionState: () => void;
  getRegionCity: (data: string) => void;
  reset: () => void;
};

const regionState: RegionStateType = { stateOptions: [], cityOptions: [] };

export const useRegionStore = create<RegionType>((set) => ({
  ...regionState,

  getRegionState: async () => {
    await RegionApi.getState()
      .then((response) => {
        set({
          stateOptions: response.data.map((item) => ({
            label: item.state,
            value: JSON.stringify({ countryCode: item.country_code, country: item.country, state: item.state }),
          })),
        });
      })
      .catch(() => {});
  },
  getRegionCity: async (data) => {
    await RegionApi.getCity(data)
      .then((response) => {
        set({
          cityOptions: response.data.map((item) => ({
            label: item.city,
            value: item.city,
          })),
        });
      })
      .catch(() => {
        set({});
      });
  },
  reset: () => set({ ...regionState }),
}));

export default useRegionStore;
