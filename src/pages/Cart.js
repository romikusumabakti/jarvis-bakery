import {
  Button,
  IconButton,
  Paper,
  Snackbar,
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
  CloseOutlined,
  RemoveOutlined,
  ShoppingCartOutlined,
} from '@material-ui/icons';
import {useEffect, useState} from 'react';
import {api} from '../utils/api';
import {formatNumber} from '../utils/formatter';

function Cart() {
  const [carts, setCarts] = useState([]);
  const [notification, setNotification] = useState();

  useEffect(() => {
    api('/carts')
      .then((response) => response.json())
      .then((json) => {
        setCarts(json.data);
      });
  }, []);

  const checkout = () => {
    api('/orders', 'POST')
      .then((response) => {
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
                <TableCell>{cart.product?.name}</TableCell>
                <TableCell>Rp{formatNumber(cart.product?.price)}</TableCell>
                <TableCell>{cart.quantity}</TableCell>
                <TableCell>
                  Rp{formatNumber(cart.product?.price * cart.quantity)}
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Tooltip title="Tambah">
                      <IconButton>
                        <AddOutlined />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Kurangi">
                      <IconButton>
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
    </Stack>
  );
}

export default Cart;
