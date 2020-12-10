import './store.css';
import {ProductList, UtilityBar} from '../../components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

function Store() {
  return (
    <div className="store">
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" gutterBottom>
          Undefined Store
        </Typography>
        <UtilityBar />
        <ProductList />
      </Container>
    </div>
  );
}

export default Store;
