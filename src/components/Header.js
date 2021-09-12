import {AppBar, Button, IconButton, Stack, Toolbar, Tooltip} from '@material-ui/core';
import {MenuOutlined, ShoppingCartOutlined} from '@material-ui/icons';
import {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../App';
import AccountMenu from './AccountMenu';
import JarvisBakeryLogo from './JarvisBakeryLogo';
import Login from './Login';
import NavTabs from './NavTabs';
import ThemeToggle from './ThemeToggle';

function Header() {
  const {user} = useContext(AuthContext);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <MenuOutlined />
        </IconButton>
        <Button component={Link} to="/">
          <JarvisBakeryLogo />
        </Button>
        <NavTabs sx={{flexGrow: 1}} setLoginOpen={setLoginOpen} />
        <Stack direction="row" gap={2} alignItems="center">
          <ThemeToggle />
          <Tooltip title="Buka keranjang">
            <IconButton
              component={user && Link}
              to={user && '/cart'}
              onClick={!user && (() => setLoginOpen(true))}>
              <ShoppingCartOutlined />
            </IconButton>
          </Tooltip>
          {user ? (
            <AccountMenu />
          ) : (
            <Button variant="outlined" onClick={() => setLoginOpen(true)}>
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
      <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    </AppBar>
  );
}

export default Header;
