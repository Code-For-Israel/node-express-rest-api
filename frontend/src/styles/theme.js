import { Box, SvgIcon, createTheme } from '@mui/material'

export const primaryColor = '#4563CD'
export const secondaryColor = '#ff8e00'

export const theme = createTheme({
  direction: 'rtl',
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: 600,
    },
    h2: {
      color: primaryColor,
      fontSize: 22,
      fontWeight: 600,
    },
    h3: {
      fontSize: 20,
      fontWeight: 600,
    },
    body1: {
      fontSize: 18,
    },
    body2: {
      fontSize: 16,
    },
    fontFamily: ['Assistant', 'sans-serif'].join(','),
    color: '#252525',
    fontSize: 18,
    letterSpacing: '0.5px',
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(37, 37, 37, 0.40)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          boxShadow: '0px 3px 3px 0px rgba(0, 0, 0, 0.12)',
          borderRadius: '24px',
          margin: '20px',
          width: '100%',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '20px',
          padding: '10px 32px 10px 32px',
          fontStyle: 'normal',
          letterSpacing: '0.5px',
          lineHeight: '24px',
        },
        textPrimary: {
          color: primaryColor,
        },
        textInfo: {
          color: '#252525',
        },
        contained: {
          boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.12)',
          borderRadius: '8px',
          ':disabled': {
            backgroundColor: 'white',
            boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.08)',
            border: '2px solid #E3E3E3',
          },
        },
        outlined: {
          boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.12)',
          borderRadius: '8px',
          borderWidth: '2px',
          border: `2px solid ${primaryColor}`,
          '&:hover': {
            borderWidth: '2px',
          },
        },
        text: {
          color: '#252525',
          fontSize: '16px',
          textDecoration: 'underline',
          fontWeight: 400,
          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          },
        },
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary',
        disableRipple: true,
        fullWidth: true,
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&.Mui-disabled > span': {
            border: '1px solid rgba(0, 0, 0, 0.38)',
          },
        },
      },
      defaultProps: {
        disableRipple: true,
        size: 'small',
        icon: (
          <Box
            component={'span'}
            mt={'0.5px'}
            mx={'2px'}
            sx={{
              border: '1px solid black',
              width: 18,
              height: 18,
              borderRadius: '2px',
            }}
          />
        ),
        checkedIcon: (
          <Box
            component={'span'}
            mt={'0.5px'}
            mx={'2px'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid black',
              width: 18,
              height: 18,
              borderRadius: '2px',
            }}
          >
            <img src={'/icons/checkbox-checked.svg'} width={14} height={14} />
          </Box>
        ),
      },
    },
    MuiRadio: {
      defaultProps: {
        disableRipple: true,
        size: 'small',
        checkedIcon: (
          <SvgIcon>
            <svg width="20" height="20" viewBox="0 0 23 23" fill="none">
              <circle id="Ellipse 2" cx="11.5" cy="11.5" r="6.5" stroke={primaryColor} strokeWidth="7" />
            </svg>
          </SvgIcon>
        ),
      },
      styleOverrides: {
        root: {
          marginRight: 10,
          color: '#979797',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '20px',
        },
      },
    },
  },
})
