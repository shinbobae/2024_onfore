/** @jsxImportSource @emotion/react */
import OrganizationInfo from './OrganizationInfo';
import DepartmentTable from './DepartmentTable';
import SiteTable from './SiteTable';

const OrganizationContent = () => {
  return (
    <>
      <OrganizationInfo />
      <DepartmentTable />
      <SiteTable />
    </>
  );
};

export default OrganizationContent;
