import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import {useEffect, useState} from 'react';
import {api} from '../utils/api';

function Cart() {
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api('/carts')
      .then((response) => response.json())
      .then((json) => setCarts(json.data));
    api('/products')
      .then((response) => response.json())
      .then((json) => setProducts(json.data));
  }, []);

  return (
    <Stack p={2} gap={2}>
      <Stack direction="row" alignItems="center" gap={1}>
        <ShoppingCartOutlined />
        <Typography variant="h5">Keranjang</Typography>
      </Stack>
      <Grid container spacing={2}>
        {[...products, ...products].map((product) => (
          <Grid item xs={2}>
            <Card>
              <CardMedia
                sx={{height: 128}}
                image={product.image}
                title={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rp{product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Tambahkan ke keranjang</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default Cart;
