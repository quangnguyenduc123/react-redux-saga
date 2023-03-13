import Loadable from 'react-loadable';
import loading from '../components/LoadingSpinner';

const UserManagement = Loadable({
  loader: () => import('../../src/pages/UserManagement'),
  loading,
});
const linkRoutes = [
  {
    id: 1,
    path: '/user-management',
    component: UserManagement,
    exact: true,
  },
];

export default linkRoutes;
