import SalesReportByStatus from './componants/SaleReportByStatus';
import TopSellingProductList from './componants/TopSellingProductList';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const Home = () => {
  return (
    <>
      {/* // first top selling products */}
      <TopSellingProductList />

      {/* // sales by status */}
      <SalesReportByStatus />
    </>
  )
};

export default Home;
