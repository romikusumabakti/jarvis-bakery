import {Tab, Tabs} from '@material-ui/core';
import {Link, useLocation} from 'react-router-dom';

const pages = [
  {
    title: 'Beranda',
    path: '/',
  },
  {
    title: 'Keranjang',
    path: '/cart',
  },
  {
    title: 'Pesanan',
    path: '/orders',
  },
  {
    title: 'Notifikasi',
    path: '/notifications',
  },
];

function NavTabs(props) {
  return (
    <Tabs value={useLocation().pathname} {...props}>
      {pages.map((page) => (
        <Tab
          key={page.path}
          label={page.title}
          value={page.path}
          component={Link}
          to={page.path}
        />
      ))}
    </Tabs>
  );
}

export default NavTabs;
