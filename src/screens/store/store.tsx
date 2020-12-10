export {};
import {ProductList, UtilityBar} from '../../components';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {createContext, useState} from 'react';

export type categoryOption = 'all' | 'classical' | 'non-traditional';

interface ICategory {
  all: categoryOption,
  classical: categoryOption,
  nontraditional: categoryOption,
}

export type sortOption = 'none' | 'price';

interface ISort {
  none: sortOption,
  price: sortOption,
};

export const categories: ICategory = {
  'all': 'all',
  'classical': 'classical',
  'nontraditional': 'non-traditional',
};

export const sortBy: ISort = {
  'none': 'none',
  'price': 'price',
};

export const CategoryContext = createContext({
  category: categories.all,
  toggleCategory: (newCategory: categoryOption): void => {},
});

export const SortContext = createContext({
  sort: sortBy.none,
  toggleSort: (sortby: sortOption): void => {},
});

function Store() {
  const [category, setCategory] = useState(categories.all);
  const [sort, setSort] = useState(sortBy.none);
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