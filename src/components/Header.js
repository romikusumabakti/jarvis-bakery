import {AppBar, Button, IconButton, Stack, Toolbar} from '@material-ui/core';
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
  const {user, setUser} = useContext(AuthContext);
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
        <NavTabs sx={{flexGrow: 1}} />
        <Stack direction="row" gap={2} alignItems="center">
          <ThemeToggle />
          <IconButton component={Link} to="/cart">
            <ShoppingCartOutlined />
          </IconButton>
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
