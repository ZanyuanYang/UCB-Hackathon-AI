import { Navbar } from '../../layouts';
import ProductsList from './components/ProductsList';
import CategoryList from './components/CategoryList';

function Product() {
  return (
    <>
      <Navbar />
      {/*<CategoryList />*/}
      <ProductsList />
    </>
  );
}

export default Product;
