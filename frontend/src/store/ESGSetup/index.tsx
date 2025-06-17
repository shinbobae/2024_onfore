import { create } from 'zustand';

import React from 'react';
import { DataCategoryType } from '../../type';
import {
  DeleteEsgSetupRequest,
  EditEsgSetupRequest,
  EsgSetupTypeResponse,
  SaveEsgSetupRequest,
} from '../../api/ESGSetup/type.ts';
import { ESGSetupApi } from '../../api/ESGSetup';

type ESGSetupType = ESGSetupStateType & ESGSetupActionType;
type ESGSetupStateType = {
  esgTypeResponse: EsgSetupTypeResponse;
  esgTypeDataSource: { siteId: string; siteName: string; dataSource: ESGSetupDataType[] }[];
  esgTypeLoading: boolean;
  esgTypeSuccess: boolean;
  esgTypeError: boolean;
  esgTypeSiteOptions: { label: string; value: string }[];
  esgTypeBoardOptions: { label: string; value: string; useYn: 'Y' | 'N' }[];
  saveEsgLoading: boolean;
  saveEsgSuccess: boolean;
  saveEsgError: boolean;
  editEsgLoading: boolean;
  editEsgSuccess: boolean;
  editEsgError: boolean;
  deleteEsgLoading: boolean;
  deleteEsgSuccess: boolean;
  deleteEsgError: boolean;
};
type ESGSetupActionType = {
  getEsgTypeData: (data: DataCategoryType) => void;
  getEsgSiteList: () => void;
  getEsgBoardList: (data: DataCategoryType) => void;
  saveEsgTypeData: (data: SaveEsgSetupRequest) => void;
  editEsgTypeData: (data: EditEsgSetupRequest) => void;
  deleteEsgTypeData: (data: DeleteEsgSetupRequest) => void;
  resetApiState: () => void;
  reset: () => void;
};

export type ESGSetupDataType = {
  key: React.Key;
  siteId: string | null;
  itemId: string;
  boardId: string;
  boardName: string;
  itemName: string; //인증항목명
  workYN: string; //연결상태
  formulaUnit: string;
  formulaStandard: string;
  formulaPer: string;
  certifiedBy: string;
  certifiedUrl: string;
};
export type ESGBaseDataType = Omit<ESGSetupDataType, 'itemName' | 'formulaPer' | 'certifiedBy' | 'certifiedUrl'>;

const esgSetupState: ESGSetupStateType = {
  esgTypeResponse: [],
  esgTypeDataSource: [],
  esgTypeLoading: false,
  esgTypeSuccess: false,
  esgTypeError: false,
  esgTypeSiteOptions: [],
  esgTypeBoardOptions: [],
  saveEsgLoading: false,
  saveEsgSuccess: false,
  saveEsgError: false,
  editEsgLoading: false,
  editEsgSuccess: false,
  editEsgError: false,
  deleteEsgLoading: false,
  deleteEsgSuccess: false,
  deleteEsgError: false,
};

export const useESGSetupStore = create<ESGSetupType>((set) => ({
  ...esgSetupState,

  getEsgTypeData: async (data) => {
    set({ esgTypeLoading: true });
    await ESGSetupApi.getEsgTypeData(data)
      .then((response) => {
        const dataSources: ESGSetupDataType[][] = [];
        const responseData = response.data;
        for (let i = 0; i < responseData.length; i++) {
          const dataSource: ESGSetupDataType[] = [];
          for (let j = 0; j < responseData[i].setup_list.length; j++) {
            const setupItem = responseData[i].setup_list[j];
            dataSource.push({
              key: setupItem.id,
              siteId: responseData[i].id,
              itemId: setupItem.id,
              boardId: setupItem.board_id,
              boardName: setupItem.board_name,
              itemName: setupItem.item_name,
              workYN: setupItem.work_yn,
              formulaUnit: JSON.parse(setupItem.formula).unit || '',
              formulaStandard: JSON.parse(setupItem.formula).standard || '',
              formulaPer: JSON.parse(setupItem.formula).per || '',
              certifiedBy: setupItem.certified_by,
              certifiedUrl: setupItem.certified_url,
            });
          }
          dataSources.push(dataSource);
        }
        set({
          esgTypeLoading: false,
          esgTypeSuccess: true,
          esgTypeError: false,
          esgTypeResponse: response.data,
          esgTypeDataSource: response.data.map((item) => {
            const dataSource: ESGSetupDataType[] = [];
            for (let i = 0; i < item.setup_list.length; i++) {
              const setupItem = item.setup_list[i];
              dataSource.push({
                key: setupItem.id,
                siteId: item.id,
                itemId: setupItem.id,
                boardId: setupItem.board_id,
                boardName: setupItem.board_name,
                itemName: setupItem.item_name,
                workYN: setupItem.work_yn,
                formulaUnit: JSON.parse(setupItem.formula).unit || '',
                formulaStandard: JSON.parse(setupItem.formula).standard || '',
                formulaPer: JSON.parse(setupItem.formula).per || '',
                certifiedBy: setupItem.certified_by,
                certifiedUrl: setupItem.certified_url,
              });
            }
            return {
              siteId: item.id,
              siteName: item.name,
              dataSource: dataSource,
            };
          }),
        });
      })
      .catch(() => {
        set({
          esgTypeLoading: false,
          esgTypeSuccess: false,
          esgTypeError: true,
        });
      });
  },
  getEsgSiteList: async () => {
    await ESGSetupApi.getEsgSiteList()
      .then((response) => {
        set({ esgTypeSiteOptions: response.data.map((item) => ({ label: item.name, value: item.id })) });
      })
      .catch();
  },
  getEsgBoardList: async (data) => {
    await ESGSetupApi.getEsgBoardList(data)
      .then((response) => {
        set({
          esgTypeBoardOptions: response.data.map((item) => ({
            label: item.name,
            value: item.id,
            useYn: item.use_yn,
          })),
        });
      })
      .catch();
  },
  saveEsgTypeData: async (data) => {
    set({ saveEsgLoading: true });
    await ESGSetupApi.saveEsgSetup(data)
      .then(() => {
        set({ saveEsgLoading: false, saveEsgSuccess: true, saveEsgError: false });
      })
      .catch(() => {
        set({ saveEsgLoading: false, saveEsgSuccess: false, saveEsgError: true });
      });
  },
  editEsgTypeData: async (data) => {
    set({ editEsgLoading: true });
    await ESGSetupApi.editEsgSetup(data)
      .then(() => {
        set({ editEsgLoading: false, editEsgSuccess: true, editEsgError: false });
      })
      .catch(() => {
        set({ editEsgLoading: false, editEsgSuccess: false, editEsgError: true });
      });
  },
  deleteEsgTypeData: async (data) => {
    set({ deleteEsgLoading: true });
    await ESGSetupApi.deleteEsgSetup(data)
      .then(() => {
        set({ deleteEsgLoading: false, deleteEsgSuccess: true, deleteEsgError: false });
      })
      .catch(() => {
        set({ deleteEsgLoading: false, deleteEsgSuccess: true, deleteEsgError: false });
      });
  },
  resetApiState: () => {
    set({
      esgTypeLoading: false,
      esgTypeSuccess: false,
      esgTypeError: false,
      saveEsgLoading: false,
      saveEsgSuccess: false,
      saveEsgError: false,
      editEsgLoading: false,
      editEsgSuccess: false,
      editEsgError: false,
      deleteEsgLoading: false,
      deleteEsgSuccess: false,
      deleteEsgError: false,
    });
  },
  reset: () => set({ ...esgSetupState }),
}));

export default useESGSetupStore;
