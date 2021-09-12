import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {LogoutOutlined, SettingsOutlined} from '@material-ui/icons';
import {Box} from '@material-ui/system';
import {useContext, useState} from 'react';
import {AuthContext} from '../App';

function AccountMenu() {
  const {user, setUser} = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip title={'Akun JarvisLeave (' + user.name + ')'}>
          <IconButton onClick={handleClick} size="small">
            <Avatar alt={user.nama} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}>
        <Stack px={4} py={2} spacing={1} alignItems="center">
          <Avatar alt={user.name} sx={{width: 64, height: 64}} />
          <Typography variant="subtitle1">{user.name}</Typography>
          <Button variant="outlined">Kelola Akun JarvisBakery Anda</Button>
        </Stack>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SettingsOutlined fontSize="small" />
          </ListItemIcon>
          Setelan
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutOutlined fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default AccountMenu;
