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
  ShoppingBagOutlined,
} from '@material-ui/icons';
import {useEffect, useState} from 'react';
import {api} from '../utils/api';
import {formatDate, formatNumber, formatTime} from '../utils/formatter';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState();

  useEffect(() => {
    api('/orders')
      .then((response) => response.json())
      .then((json) => {
        setOrders(json.data);
      });
  }, []);

  const checkout = () => {
    api('/orders', 'POST')
      .then((response) => response.json())
      .then((json) => {
        setNotification('Berhasil checkout.');
        setOrders([]);
      });
  };

  return (
    <Stack p={2} gap={2}>
      <Stack direction="row" alignItems="center" gap={1}>
        <ShoppingBagOutlined />
        <Typography variant="h5">Pesanan</Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Waktu</TableCell>
              <TableCell>Item</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Total bayar</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{formatDate(order.date)}</TableCell>
                <TableCell>{formatTime(order.date)} WIB</TableCell>
                <TableCell>
                  <ul>
                    {order.carts.map((cart) => (
                      <li key={cart.id}>{cart.product.name}</li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  {order.carts.reduce((acc, cart) => acc + cart.quantity, 0)}
                </TableCell>
                <TableCell>
                  Rp
                  {formatNumber(
                    order.carts.reduce(
                      (acc, cart) => acc + cart.quantity * cart.product.price,
                      0
                    )
                  )}
                </TableCell>
                <TableCell>{order.status}</TableCell>
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

export default Orders;
