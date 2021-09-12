import {createTheme, useMediaQuery} from '@material-ui/core';
import {useEffect, useState} from 'react';
import GoogleSansRegular from '../fonts/GoogleSans-Regular2.woff2';
import GoogleSansMedium from '../fonts/GoogleSans-Medium2.woff2';

const useTheme = () => {
  const [mode, setMode] = useState(window.localStorage.getItem('mode') || 'system');

  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const dark = mode === 'system' ? systemDark : mode === 'dark';

  const baseTheme = {
    palette: {
      mode: dark ? 'dark' : 'light',
      background: {
        paper: dark ? '#333' : 'white',
        default: dark ? '#111' : '#eee',
      },
    },
  };

  let theme = createTheme(baseTheme);

  theme = createTheme({
    palette: {
      ...baseTheme.palette,
    },
    shape: {
      borderRadius: 32,
    },
    typography: {
      fontFamily: 'Google Sans, sans-serif',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Google Sans';
          font-style: normal;
          font-weight: 400;
          src: local('Google Sans Regular'), local('GoogleSans-Regular'), url(${GoogleSansRegular}) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Google Sans';
          font-style: normal;
          font-weight: 500;
          src: local('Google Sans Medium'), local('GoogleSans-Medium'), url(${GoogleSansMedium}) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `,
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            alignSelf: 'stretch',
          },
          scroller: {
            display: 'flex',
          },
          indicator: {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            height: 4,
          },
          '& .MuiTabsindicatorSpan': {
            maxWidth: 64,
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            height: 4,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          },
        },
        defaultProps: {
          TabIndicatorProps: {
            children: (
              <span
                style={{
                  maxWidth: 64,
                  width: '100%',
                  backgroundColor: theme.palette.primary.main,
                  height: 4,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                }}
              />
            ),
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            textTransform: 'unset !important',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            paddingRight: 8,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderTopRightRadius: 24,
            borderBottomRightRadius: 24,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: theme.palette.background.paper,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            paddingInline: 32,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 4,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          InputLabelProps: {required: false},
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 18,
            paddingInline: 18,
          },
        },
        defaultProps: {
          disableElevation: true,
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: 24,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: 24,
            gap: 8,
          },
        },
      },
    },
    shadows: [
      'none',
      '0 0 4px #0001',
      '0 0 8px #0001',
      '0 0 12px #0001',
      '0 0 16px #0001',
    ],
  });

  useEffect(() => {
    if (mode === 'system') {
      window.localStorage.removeItem('mode');
    } else {
      window.localStorage.setItem('mode', mode);
    }
  }, [mode]);

  return {theme, mode, setMode};
};

export default useTheme;
