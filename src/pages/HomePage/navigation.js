
const userManagementNav = () => {
  return {
    items: [
      {
        id: 1,
        name: 'User Management',
        url: '/user-management',
        icon: 'fa fa-user'
      }
    ]
  };
};

const getNavigation = () => {
  let routes = userManagementNav();
  return routes;

};

export default getNavigation;
