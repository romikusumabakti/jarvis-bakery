import {Stack, Typography, useTheme} from '@material-ui/core';
import {BakeryDiningRounded} from '@material-ui/icons';

function JarvisBakeryLogo(props) {
  const theme = useTheme();

  return (
    <Stack direction="row" spacing={.5} alignItems="flex-end">
      <BakeryDiningRounded color="primary" fontSize="large" />
      {/* <JarvisIcon size={props.size} /> */}
      <Typography variant="h6" fontSize={props.size}>
        <span style={{color: theme.palette.primary.main}}>Jarvis</span>
        <span style={{color: theme.palette.text.primary}}>Bakery</span>
      </Typography>
    </Stack>
  );
}

export default JarvisBakeryLogo;
