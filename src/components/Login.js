import { Button, Dialog, Stack, TextField, Typography } from '@material-ui/core';
import { useContext, useState } from 'react';
import { AuthContext, NotificationContext } from '../App';
import { jsonApi } from '../utils/api';
import JarvisBakeryLogo from './JarvisBakeryLogo';

function Login(props) {
  const {setUser} = useContext(AuthContext);
  const setNotification = useContext(NotificationContext);
  const [loginData, setLoginData] = useState({});
  const [loginErrors, setLoginErrors] = useState({});

  const handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    setLoginData({...loginData, [key]: value});
  };

  const login = async (event) => {
    event.preventDefault();
    const response = await jsonApi('/auth/signin', 'POST', loginData)
    if (response.ok) {
      const json = await response.json();
      setUser(json.data);
      localStorage.setItem('token', json.data.token);
      setNotification('Login berhasil');
      handleClose();
    } else {
      const json = await response.json();
      if (json.messages === 'User tidak terdaftar') {
        setLoginErrors({email: 'Email tidak terdaftar.'});
      } else if (json.messages === 'Password tidak valid') {
        setLoginErrors({password: 'Kata sandi salah.'});
      }
    }
  };

  const handleClose = () => {
    props.onClose();
    setLoginErrors({});
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={props.open} onClose={handleClose}>
      <Stack p={4} gap={3} component="form" onSubmit={login}>
        <Stack gap={1} alignItems="center">
          <JarvisBakeryLogo />
          <Typography variant="h5">Login</Typography>
        </Stack>
        <TextField
          autoFocus
          type="email"
          label="Email"
          fullWidth
          required
          spellCheck="false"
          name="email"
          onChange={handleChange}
          error={loginErrors.email}
          helperText={loginErrors.email}
        />
        <TextField
          type="password"
          label="Kata sandi"
          fullWidth
          required
          name="password"
          onChange={handleChange}
          error={loginErrors.password}
          helperText={loginErrors.password}
        />
        <Stack direction="row" justifyContent="space-between">
          <Button type="reset" onClick={handleClose}>
            Batal
          </Button>
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default Login;
