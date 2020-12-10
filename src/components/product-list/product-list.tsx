import {useState, useEffect} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {SortContext, sortOptions, categoryOptions, CategoryContext} from '../../screens/store/store';

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
    const result = await fetch(`https://sandbox.undefined.ai/wp-json/wc/v3/orders${auth}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(demo_order_details(id)),
    });
    try {
      const order_details = await result.json();

    } catch(e) {
      // TODO: implement better error handler, ... notify user
      console.log('Error creating order', e);
    }
    setDisable(false);
  }


  return (
    <ListItem key={id}>
      <ListItemText primary={`${name} (${categories[0].name})  price: $${parseFloat(price||0).toFixed(2)}`} />
      <ListItemIcon>
        <Button variant="contained" color="primary" disabled={disabled} onClick={processOrder}>
          Buy
        </Button>
      </ListItemIcon>
    </ListItem>
  );
}

function SmartProductList(props:any) {
  const {category, sort, products} = props;
  let normalizedProducts = [];

  if(category !== categoryOptions.all) {
    normalizedProducts = products
    .filter((product: any) => {
      const condition = product.categories[0].slug === category;
      return condition;
    });
  }

  if(sort !== sortOptions.none) {
    normalizedProducts = [...normalizedProducts].sort((a: any, b: any) => parseFloat(b.price||0) - parseFloat(a.price||0));
  }

  if(normalizedProducts.length === 0) {
    normalizedProducts = products;
  }

  return normalizedProducts.map((product: any, idx: number) => <ProductListItem  category={category} sort={sort} key={idx} {...product}/>)
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const products = await (await fetch(pUrl)).json();
    setProducts(products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="product-list">
      <SortContext.Consumer>
        {({sort}) => (
            <CategoryContext.Consumer>
              {
                ({category}) => (
                  <ul>
                    <SmartProductList category={category} sort={sort} products={products}/>
                  </ul>
                )
              }
            </CategoryContext.Consumer>
          )
        }
      </SortContext.Consumer>
    </div>
  );
}

export default ProductList;
