import {useState, useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// curl -X POST https://example.com/wp-json/wc/v3/orders \
//     -u consumer_key:consumer_secret \

const demo_order_details = (id: number) => ({
  "payment_method": "bacs",
  "payment_method_title": "Direct Bank Transfer",
  "set_paid": true,
  "billing": {
    "first_name": "John",
    "last_name": "Doe",
    "address_1": "969 Market",
    "address_2": "",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "94103",
    "country": "US",
    "email": "john.doe@example.com",
    "phone": "(555) 555-5555"
  },
  "shipping": {
    "first_name": "John",
    "last_name": "Doe",
    "address_1": "969 Market",
    "address_2": "",
    "city": "San Francisco",
    "state": "CA",
    "postcode": "94103",
    "country": "US"
  },
  "line_items": [
    {
      "product_id": id,
      "quantity": 1,
    }
  ],
  "shipping_lines": [
    {
      "method_id": "flat_rate",
      "method_title": "Flat Rate",
      "total": "10.00"
    }
  ]
});
const auth = '?consumer_key=ck_c161cac82eef5b375fbc7ac4d2a60e16c879e9f9&consumer_secret=cs_c5c4b834003b6c5b0a8dfe8de550b341835f0dd0';
const pUrl = `https://sandbox.undefined.ai/wp-json/wc/v3/products${auth}`;

function ProductListItem(props: any) {
  const { id, name, categories, price } = props;
  const [disabled, setDisable] = useState(false);

  const processOrder = async () => {
    setDisable(true);
    console.log('processOrder:called')
    const result = await fetch(`https://sandbox.undefined.ai/wp-json/wc/v3/orders${auth}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(demo_order_details(id)),
    });
    try {
      const order_details = await result.json();
      console.log('order_details', order_details);

    } catch(e) {
      console.log('Error creating order', e);
    }
    setDisable(false);
  }


  return (
    <ListItem key={id}>
      <ListItemText primary={`${name} ${categories[0].name} - ${price}`} />
      <ListItemIcon>
        <Button variant="contained" color="primary" disabled={disabled} onClick={processOrder}>
          Buy
        </Button>
      </ListItemIcon>
    </ListItem>
  );
}


function ProductList() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const products = await (await fetch(pUrl)).json();
    console.log('products:fetched', products);
    setProducts(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <ul>
        {products.map((product, idx) => <ProductListItem key={idx} {...product}/>)}
      </ul>
    </div>
  );
}

export default ProductList;
