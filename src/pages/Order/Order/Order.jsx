import { useState } from 'react';
import orderCover from '../../../assets/shop/banner2.jpg';
import Cover from '../../Shared/Cover/Cover';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderItem from '../OrderItem/OrderItem';
import { useParams } from 'react-router-dom';
const Order = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [menu] = useMenu();
  const desserts = menu.filter((item) => item.category === 'dessert');
  const pizzas = menu.filter((item) => item.category === 'pizza');
  const salads = menu.filter((item) => item.category === 'salad');
  const soups = menu.filter((item) => item.category === 'soup');
  const drinks = menu.filter((item) => item.category === 'drinks');
  return (
    <div>
      <Cover
        bgImage={orderCover}
        text={'Order Food'}
        shortDescription={
          'Order delicious meals from Bistro Boss Restaurant and enjoy a wide variety of gourmet dishes delivered to your doorstep, offering a convenient and flavorful dining experience.'
        }
      ></Cover>
      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        className=' p-6'
      >
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Deserts</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OrderItem items={salads}></OrderItem>
        </TabPanel>

        <TabPanel>
          <OrderItem items={pizzas}></OrderItem>
        </TabPanel>
        <TabPanel>
          <OrderItem items={soups}></OrderItem>
        </TabPanel>
        <TabPanel>
          <OrderItem items={desserts}></OrderItem>
        </TabPanel>
        <TabPanel>
          <OrderItem items={drinks}></OrderItem>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
