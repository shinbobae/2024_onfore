import React from 'react';
import { GetProp, TablePaginationConfig, TableProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';

export type Children = { children: React.ReactNode };

export type DataCategoryType = 'carbon' | 'electricity' | 'water';
export type DataSiteType = 'region' | 'site';
export type MemberRoleType = 'ORGANIZATION_ADMIN' | 'DEPARTMENT_ADMIN' | 'MEMBER';

export interface TableParams<T> {
  pagination: TablePaginationConfig;
  sortField?: SorterResult<T>['field'];
  sortOrder?: SorterResult<T>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
  sorter?: SorterResult<T> | SorterResult<T>[];
}

export type OPTION = { label: string; value: string; disabled?: boolean };
