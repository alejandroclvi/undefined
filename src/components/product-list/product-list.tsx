import {useState, useEffect} from 'react';

const pUrl = 'https://sandbox.undefined.ai/wp-json/wc/v3/products?consumer_key=ck_c161cac82eef5b375fbc7ac4d2a60e16c879e9f9&consumer_secret=cs_c5c4b834003b6c5b0a8dfe8de550b341835f0dd0';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await (await fetch(pUrl)).json();
      console.log('products:fetched', products);
      setProducts(products);
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <ul>
        {products.map(({name, id}) => <li key={id}>{name}</li>)}
      </ul>
    </div>
  );
}

export default ProductList;
