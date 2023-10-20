import { Footer, Navbar } from '../../layouts';
import ProductsList from './components/ProductsList';

function Product() {
  return (
    <>
      <Navbar />
      <ProductsList />
      <Footer/>
    </>
  );
}

export default Product;
