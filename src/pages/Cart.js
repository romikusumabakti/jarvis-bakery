import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import {useContext, useEffect, useState} from 'react';
import {NotificationContext} from '../App';
import {api, jsonApi} from '../utils/api';
import {formatNumber} from '../utils/formatter';

function Cart() {
  const [carts, setCarts] = useState([]);
  const setNotification = useContext(NotificationContext);

  useEffect(() => {
    api('/carts')
      .then((response) => response.json())
      .then((json) => setCarts(json.data));
  }, []);

  const setQuantity = (id, quantity) => {
    if (quantity !== 0) {
      jsonApi(`/carts/${id}`, 'PUT', {
        product_id: id,
        quantity: quantity,
      }).then((response) => {
        if (response.ok) {
          setCarts(
            carts.map((cart) =>
              cart.id === id ? {...cart, quantity: quantity} : cart
            )
          );
        }
      });
    } else {
      api(`/carts/${id}`, 'DELETE').then((response) => {
        if (response.ok) {
          setCarts(carts.filter((cart) => cart.id !== id));
          setNotification('Produk dihapus dari keranjang.');
        }
      });
    }
  };

  const checkout = () => {
    api('/orders', 'POST').then((response) => {
      if (response.ok) {
        setNotification('Berhasil checkout.');
        setCarts([]);
      }
    });
  };

  return (
    <Stack p={2} gap={2}>
      <Stack direction="row" alignItems="center" gap={1}>
        <ShoppingCartOutlined />
        <Typography variant="h5">Keranjang</Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Produk</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Total bayar</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  onClick={checkout}
                  disabled={carts.length === 0}>
                  Checkout
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carts.map((cart) => (
              <TableRow key={cart.id}>
                <TableCell>{cart.product.name}</TableCell>
                <TableCell>Rp{formatNumber(cart.product.price)}</TableCell>
                <TableCell>{cart.quantity}</TableCell>
                <TableCell>
                  Rp{formatNumber(cart.product.price * cart.quantity)}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Tambah">
                      <IconButton
                        onClick={() => setQuantity(cart.id, cart.quantity + 1)}>
                        <AddOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Kurangi">
                      <IconButton
                        onClick={() => setQuantity(cart.id, cart.quantity - 1)}>
                        <RemoveOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default Cart;
