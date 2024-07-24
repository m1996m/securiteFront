interface MenuElement {
  text: string;
  icon: string;
  route: string;
  color: string;
  tooltipText?: string;
  tooltipRight?: boolean;
  matchRouter?: boolean;
  submenu?: MenuElement[];
}

const menuElements: MenuElement[] = [
  {
    text: 'Accueil',
    icon: 'home',
    route: '/',
    color: '',
    tooltipText: 'Accueil',
    tooltipRight: true,
    matchRouter: true,
  },
  {
    text: 'Declaration',
    icon: 'usergroup-add',
    route: '/declaration',
    color: '',
    tooltipText: 'Declaration Naissance',
    tooltipRight: true,
    matchRouter: true,
  },
  {
    text: 'Compagnie',
    icon: 'setting',
    route: '',
    color: '',
    submenu: [
      {
        text: 'Ecole',
        icon: 'read',
        route: '/company/school',
        color: '',
        matchRouter: true,
      },
      {
        text: 'Mensualité',
        icon: 'calendar',
        route: '/company/monthly',
        color: '',
        matchRouter: true,
      },
      {
        text: 'Paiement',
        icon: 'credit-card',
        route: '/company/paiement',
        color: '',
        matchRouter: true,
      },
      {
        text: 'Student',
        icon: 'user',
        route: '/company/student',
        color: '',
        matchRouter: true,
      },
    ],
  },

  {
    text: 'Adminitration',
    icon: 'setting',
    route: '',
    color: '',
    submenu: [
      {
        text: 'Hopital',
        icon: 'bank',
        route: '/administration/hopital',
        color: '',
        matchRouter: true,
      },
    ],
  },

  {
    text: 'Utilisateur',
    icon: 'usergroup-add',
    route: '/user',
    color: '',
  },

  {
    text: 'SerName',
    icon: 'user',
    route: '',
    color: '',
    submenu: [
      {
        text: 'Mes payement',
        icon: 'folder-view',
        route: '/payement',
        color: '',
        matchRouter: true,
      },
      {
        text: 'Profile',
        icon: 'user',
        route: '/user/profile',
        color: '',
        matchRouter: true,
      },
      {
        text: 'Déconnexion',
        icon: 'logout',
        route: '/login',
        color: 'red',
        matchRouter: true,
      },
    ],
  },

];
const defaultActiveMenuItem = menuElements[0];

export default menuElements;
export { defaultActiveMenuItem };
export type { MenuElement };
