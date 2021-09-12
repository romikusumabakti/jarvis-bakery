import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import {NotificationsOutlined} from '@material-ui/icons';
import {useEffect, useState} from 'react';
import {api} from '../utils/api';
import {formatDate, formatTime} from '../utils/formatter';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api('/notifications')
      .then((response) => response.json())
      .then((json) => {
        setNotifications(json.data);
      });
  }, []);

  return (
    <Stack p={2} gap={2}>
      <Stack direction="row" alignItems="center" gap={1}>
        <NotificationsOutlined />
        <Typography variant="h5">Notifikasi</Typography>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tanggal</TableCell>
              <TableCell>Waktu</TableCell>
              <TableCell>Pesan</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell>{formatDate(notification.date)}</TableCell>
                <TableCell>{formatTime(notification.date)} WIB</TableCell>
                <TableCell>{notification.message}</TableCell>
                <TableCell align="right">
                  <Button variant="contained">Tandai sudah dibaca</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default Notifications;
