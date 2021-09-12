import {
  CircularProgress,
  Container,
  CssBaseline,
  Divider,
  ThemeProvider,
} from '@material-ui/core';
import {createContext, lazy, Suspense, useEffect, useState} from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import useTheme from './hooks/useTheme';
import { api } from './utils/api';

const Products = lazy(() => import('./pages/Products'));
const Cart = lazy(() => import('./pages/Cart'));
const Orders = lazy(() => import('./pages/Orders'));
const Notifications = lazy(() => import('./pages/Notifications'));

export const AuthContext = createContext();
export const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState();
  const {theme, mode, setMode} = useTheme();

  useEffect(async () => {
    if (localStorage.getItem('token')) {
      const response = await api('/auth/me');
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, setUser}}>
        <ThemeContext.Provider value={{theme, mode, setMode}}>
          <ThemeProvider theme={theme}>
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
          </ThemeProvider>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
