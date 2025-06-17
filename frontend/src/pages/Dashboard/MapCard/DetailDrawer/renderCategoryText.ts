import { DataCategoryType } from '../../../../type';

export const renderCategoryText = (category: DataCategoryType): string => {
  switch (category) {
    case 'carbon':
      return '탄소 절감';
    case 'electricity':
      return '재생에너지 생산';
    case 'water':
      return '물 정수';
  }
};
