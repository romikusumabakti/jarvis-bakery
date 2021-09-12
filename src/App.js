import {
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Snackbar,
  ThemeProvider,
} from '@material-ui/core';
import {CloseOutlined} from '@material-ui/icons';
import {createContext, lazy, Suspense, useEffect, useState} from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import useTheme from './hooks/useTheme';
import {api} from './utils/api';

const Products = lazy(() => import('./pages/Products'));
const Cart = lazy(() => import('./pages/Cart'));
const Orders = lazy(() => import('./pages/Orders'));
const Notifications = lazy(() => import('./pages/Notifications'));

export const AuthContext = createContext();
export const ThemeContext = createContext();
export const NotificationContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const {theme, mode, setMode} = useTheme();
  const [notification, setNotification] = useState();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      api('/auth/me').then((response) => {
        if (response.ok) {
          response.json().then((json) => setUser(json.data));
        } else {
          setUser(null);
        }
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, setUser}}>
        <ThemeContext.Provider value={{theme, mode, setMode}}>
          <ThemeProvider theme={theme}>
            <NotificationContext.Provider value={setNotification}>
              <CssBaseline />
              <Header />
              <Container>
                <Suspense fallback={<CircularProgress />}>
                  <Route exact path="/">
                    <Products />
                  </Route>
                  <Route path="/cart">
                    {user ? <Cart /> : <Redirect to="/" />}
                  </Route>
                  <Route path="/orders">
                    {user ? <Orders /> : <Redirect to="/" />}
                  </Route>
                  <Route path="/notifications">
                    {user ? <Notifications /> : <Redirect to="/" />}
                  </Route>
                </Suspense>
              </Container>
              <Divider />
              <Footer />
              <Snackbar
                open={notification}
                autoHideDuration={2750}
                onClose={() => setNotification(null)}
                message={notification}
                action={
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => setNotification(null)}>
                    <CloseOutlined />
                  </IconButton>
                }
              />
            </NotificationContext.Provider>
          </ThemeProvider>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
