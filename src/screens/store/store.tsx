import {ProductList, UtilityBar} from '../../components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {createContext, useState} from 'react';

export const categoryOptions = {
  'all': 'all',
  'classical': 'classical',
  'non-traditional': 'non-traditional',
};

export const sortOptions = {
  'none': 'none',
  'price': 'price',
};

export const CategoryContext = createContext({
  category: categoryOptions.all,
  toggleCategory: (newCategory: any): void => {},
});

export const SortContext = createContext({
  sort: sortOptions.none,
  toggleSort: (sortby: any): void => {},
});

function Store() {
  const [category, setCategory] = useState(categoryOptions.all);
  const [sort, setSort] = useState(sortOptions.none);
  return (
    <div className="store">
      <CategoryContext.Provider value={{category, toggleCategory: setCategory}}>
        <SortContext.Provider value={{sort, toggleSort: setSort}}>
          <Container maxWidth="lg">
            <Typography variant="h2" component="h2" gutterBottom>
              Undefined Store
            </Typography>
            <UtilityBar />
            <ProductList />
          </Container>
        </SortContext.Provider>
      </CategoryContext.Provider>
    </div>
  );
}

export default Store;