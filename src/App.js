import {
  Container,
  CssBaseline,
  Divider,
  ThemeProvider,
} from '@material-ui/core';
import {createContext, useState} from 'react';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import useTheme from './hooks/useTheme';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Products from './pages/Products';

export const AuthContext = createContext();
export const ThemeContext = createContext();

function App() {
  const [user, setUser] = useState();
  const {theme, mode, setMode} = useTheme();

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, setUser}}>
        <ThemeContext.Provider value={{theme, mode, setMode}}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Container>
              <Route exact path="/">
                <Products />
              </Route>
              <Route path="/cart">
                {user ? <Cart /> : <Redirect to="/" />}
              </Route>
              <Route path="/orders">
                {user ? <Orders /> : <Redirect to="/" />}
              </Route>
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
