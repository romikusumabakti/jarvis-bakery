import {Tab, Tabs} from '@material-ui/core';
import { useContext } from 'react';
import {Link, useLocation} from 'react-router-dom';
import { AuthContext } from '../App';

const pages = [
  {
    title: 'Beranda',
    path: '/',
    restricted: false,
  },
  {
    title: 'Keranjang',
    path: '/cart',
    restricted: true,
  },
  {
    title: 'Pesanan',
    path: '/orders',
    restricted: true,
  },
  {
    title: 'Notifikasi',
    path: '/notifications',
    restricted: true,
  },
];

function NavTabs(props) {
  const {user} = useContext(AuthContext);

  return (
    <Tabs value={useLocation().pathname} {...props}>
      {pages.map((page) => (
        <Tab
          key={page.path}
          label={page.title}
          value={page.path}
          component={(user || !page.restricted) && Link}
          to={(user || !page.restricted) && page.path}
          onClick={!user && page.restricted && (() => props.setLoginOpen(true))}
        />
      ))}
    </Tabs>
  );
}

export default NavTabs;
