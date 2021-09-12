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
import {CategoryOutlined} from '@material-ui/icons';
import {useEffect, useState} from 'react';
import {api, jsonApi} from '../utils/api';
import {formatNumber} from '../utils/formatter';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api('/products')
      .then((response) => response.json())
      .then((json) => setProducts(json.data));
  }, []);

  const addToCart = (id) => {
    jsonApi('/carts', 'POST', {
      product_id: id,
      quantity: 1,
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <Stack p={2} gap={2}>
      <Stack direction="row" alignItems="center" gap={1}>
        <CategoryOutlined />
        <Typography variant="h5">Produk</Typography>
      </Stack>
      <Grid container spacing={2}>
        {[...products].map((product) => (
          <Grid item xs={3} key={product.id}>
            <Card>
              <CardMedia
                sx={{height: 192}}
                image={product.image}
                title={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rp{formatNumber(product.price)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => addToCart(product.id)}>
                  Tambahkan ke keranjang
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

export default Products;
