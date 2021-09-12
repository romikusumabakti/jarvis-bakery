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
  useTheme,
} from '@material-ui/core';
import {NotificationsOutlined} from '@material-ui/icons';
import {useContext, useEffect, useState} from 'react';
import {NotificationContext} from '../App';
import {api} from '../utils/api';
import {formatDate, formatTime} from '../utils/formatter';

function Notifications() {
  const theme = useTheme();
  const setNotification = useContext(NotificationContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api('/notifications')
      .then((response) => response.json())
      .then((json) => {
        setNotifications(json.data);
      });
  }, []);

  const setAsRead = (id) => {
    api(`/notifications/${id}`, 'PUT').then((response) => {
      if (response.ok) {
        setNotifications(
          notifications.map((notification) =>
            notification.id === id ? {...notification, status: 1} : notification
          )
        );
        setNotification('Notifikasi ditandai sudah dibaca.');
      }
    });
  };

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
              <TableRow
                key={notification.id}
                sx={
                  notification.status === 1 && {
                    '& td': {
                      color: theme.palette.text.secondary,
                    },
                  }
                }>
                <TableCell>{formatDate(notification.createdAt)}</TableCell>
                <TableCell>{formatTime(notification.createdAt)} WIB</TableCell>
                <TableCell>{notification.message}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    onClick={() => setAsRead(notification.id)}
                    disabled={notification.status === 1}>
                    {notification.status === 0
                      ? 'Tandai sudah dibaca'
                      : 'Sudah dibaca'}
                  </Button>
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
