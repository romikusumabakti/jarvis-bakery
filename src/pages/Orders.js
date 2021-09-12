import {
  Paper, Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import {
  ShoppingBagOutlined
} from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { formatDate, formatNumber, formatTime } from '../utils/formatter';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api('/orders')
      .then((response) => response.json())
      .then((json) => {
        setOrders(json.data);
      });
  }, []);

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
    </Stack>
  );
}

export default Orders;
