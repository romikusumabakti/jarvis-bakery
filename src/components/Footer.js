import {Stack, Typography} from '@material-ui/core';
import JarvisBakeryLogo from './JarvisBakeryLogo';

function Footer() {
  return (
    <Stack p={3} gap={1} alignItems="center">
      <JarvisBakeryLogo />
      <Typography variant="subtitle2">
        © 2021 Romi Kusuma Bakti
      </Typography>
    </Stack>
  );
}

export default Footer;
