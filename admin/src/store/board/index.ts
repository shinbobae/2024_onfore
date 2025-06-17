import { create } from 'zustand';
import {
  DeleteBoardRequest,
  EditBoardRequest,
  OrganizationBoardResponse,
  OrganizationListResponse,
  RegisterBoardRequest,
} from '../../api/board/type.ts';
import { BoardApi } from '../../api/board';
import React from 'react';

type BoardStoreType = BoardStateType & BoardActionType;
type BoardStateType = {
  selectedOrgaId: string | null;
  organizationData: OrganizationListResponse;
  organizationList: { id: string; name: string; fullAddress: string }[];
  unregiBoardDataSource: UnregiBoardDataType[];
  unregiBoardList: { id: string }[];
  regiBoardDataSource: RegiBoardDataType[];
  regiBoardList: OrganizationBoardResponse;
  orgaListLoading: boolean;
  orgaListSuccess: boolean;
  orgaListError: boolean;
  unregiListLoading: boolean;
  unregiListSuccess: boolean;
  unregiListError: boolean;
  regiListLoading: boolean;
  regiListSuccess: boolean;
  regiListError: boolean;
  registerLoading: boolean;
  registerSuccess: boolean;
  registerError: boolean;
  editLoading: boolean;
  editSuccess: boolean;
  editError: boolean;
  deleteLoading: boolean;
  deleteSuccess: boolean;
  deleteError: boolean;
};
type BoardActionType = {
  setSelectedOrgaId: (selectedOrgaId: string | null) => void;
  getOrganizationList: () => void;
  getUnregisteredBoardList: () => void;
  getRegisteredBoardList: (organizationId: string) => void;
  registerBoard: (data: RegisterBoardRequest) => void;
  editBoard: (data: EditBoardRequest) => void;
  deleteBoard: (data: DeleteBoardRequest) => void;
  resetStatus: () => void;
  reset: () => void;
};

const boardState: BoardStateType = {
  selectedOrgaId: null,
  organizationData: [],
  organizationList: [],
  unregiBoardDataSource: [],
  unregiBoardList: [],
  regiBoardList: [],
  regiBoardDataSource: [],
  orgaListLoading: false,
  orgaListSuccess: false,
  orgaListError: false,
  unregiListLoading: false,
  unregiListSuccess: false,
  unregiListError: false,
  regiListLoading: false,
  regiListSuccess: false,
  regiListError: false,
  registerLoading: false,
  registerSuccess: false,
  registerError: false,
  editLoading: false,
  editSuccess: false,
  editError: false,
  deleteLoading: false,
  deleteSuccess: false,
  deleteError: false,
};

export type UnregiBoardDataType = {
  key: React.Key;
  no: number;
  id: string;
  name: string | null;
};
export type RegiBoardDataType = {
  key: React.Key;
  id: string;
  name: string;
  useYn: 'Y' | 'N';
};

export const useBoardStore = create<BoardStoreType>((set) => ({
  ...boardState,
  setSelectedOrgaId: (id) => set({ selectedOrgaId: id }),
  getOrganizationList: async () => {
    set({ orgaListLoading: true });
    BoardApi.getOrganization()
      .then((response) => {
        set({
          orgaListLoading: false,
          orgaListSuccess: true,
          orgaListError: false,
          organizationData: response.data,
          organizationList: response.data.map((item) => ({
            id: item.id,
            name: item.name,
            fullAddress: item.address + ' ' + item.address_detail,
          })),
        });
      })
      .catch(() => {
        set({
          orgaListLoading: false,
          orgaListSuccess: false,
          orgaListError: true,
        });
      });
    // get 완료후 초기화 set({ ...boardState, organizationData: response.data })
  },
  getUnregisteredBoardList: async () => {
    set({ unregiListLoading: true, unregiListSuccess: false, unregiListError: false });
    await BoardApi.getBoardUnregistered()
      .then((response) => {
        set({
          unregiListLoading: false,
          unregiListSuccess: true,
          unregiListError: false,
          unregiBoardList: response.data,
          unregiBoardDataSource: response.data.map((item, index) => ({
            key: item.id,
            id: item.id,
            name: null,
            no: index + 1,
          })),
        });
      })
      .catch(() => {
        set({
          unregiListLoading: false,
          unregiListSuccess: false,
          unregiListError: true,
        });
      });
  },
  getRegisteredBoardList: async (organizationId: string) => {
    set({ regiListLoading: true, regiListSuccess: false, regiListError: false });
    await BoardApi.getOrganizationBoard(organizationId)
      .then((response) => {
        set({
          regiListLoading: false,
          regiListSuccess: true,
          regiListError: false,
          regiBoardList: response.data,
          regiBoardDataSource: response.data.map((item) => ({
            key: item.id,
            id: item.id,
            name: item.name,
            useYn: item.used_yn,
          })),
        });
      })
      .catch(() => {
        set({ regiListLoading: false, regiListSuccess: false, regiListError: true });
      });
  },
  registerBoard: async (data) => {
    set({ registerLoading: true, registerSuccess: false, registerError: false });
    await BoardApi.registerBoard(data)
      .then(() => {
        set({ registerLoading: false, registerSuccess: true, registerError: false });
      })
      .catch(() => {
        set({ registerLoading: false, registerSuccess: false, registerError: true });
      });
  },
  editBoard: async (data) => {
    set({ editLoading: true, editSuccess: false, editError: false });
    await BoardApi.editBoard(data)
      .then(() => {
        set({ editLoading: false, editSuccess: true, editError: false });
      })
      .catch(() => {
        set({ editLoading: false, editSuccess: false, editError: true });
      });
  },
  deleteBoard: async (data) => {
    set({ deleteLoading: true, deleteSuccess: false, deleteError: false });
    await BoardApi.deleteBoard(data)
      .then(() => {
        set({ deleteLoading: false, deleteSuccess: true, deleteError: false });
      })
      .catch(() => {
        set({ deleteLoading: false, deleteSuccess: false, deleteError: true });
      });
  },
  resetStatus: () =>
    set({
      orgaListLoading: false,
      orgaListSuccess: false,
      orgaListError: false,
      unregiListLoading: false,
      unregiListSuccess: false,
      unregiListError: false,
      regiListLoading: false,
      regiListSuccess: false,
      regiListError: false,
      registerLoading: false,
      registerSuccess: false,
      registerError: false,
      editLoading: false,
      editSuccess: false,
      editError: false,
      deleteLoading: false,
      deleteSuccess: false,
      deleteError: false,
    }),
  reset: () => set({ ...boardState }),
}));

export default useBoardStore;
