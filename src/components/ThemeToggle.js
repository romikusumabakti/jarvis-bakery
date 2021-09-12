import {ToggleButton, ToggleButtonGroup, Tooltip} from '@material-ui/core';
import {
  DarkModeOutlined,
  LightModeOutlined,
  SettingsBrightnessOutlined,
} from '@material-ui/icons';
import {useContext} from 'react';
import {ThemeContext} from '../App';

function ThemeToggle() {
  const {mode, setMode} = useContext(ThemeContext);

  const handleMode = (event, newMode) => {
    newMode && setMode(newMode);
  };

  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={handleMode}
      size="small">
      <ToggleButton value="light">
        <Tooltip title="Ubah ke tema terang">
          <LightModeOutlined />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="system">
        <Tooltip title="Ubah ke tema sistem">
          <SettingsBrightnessOutlined />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="dark">
        <Tooltip title="Ubah ke tema gelap">
          <DarkModeOutlined />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ThemeToggle;
