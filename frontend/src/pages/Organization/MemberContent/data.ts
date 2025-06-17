import { MemberRoleType } from '../../../type';

export const ROLE_OPTION: { label: string; value: MemberRoleType }[] = [
  { label: '조직 관리자', value: 'ORGANIZATION_ADMIN' },
  { label: '부서 관리자', value: 'DEPARTMENT_ADMIN' },
  { label: '일반 사용자', value: 'MEMBER' },
];
