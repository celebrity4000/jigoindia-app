import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import Home from './screens/Home';
import Categories from './screens/Categories';
import Cart from './screens/Cart';
import UserAccount from './screens/UserAccount';
import TabNavigator from './navigators/TabNavigator';
import Category from './screens/Category';
import Product from './screens/Product';
import {CartContext} from './context';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [cart, setCart] = useState([]);
  return (
    <NavigationContainer>
      <CartContext.Provider value={{cart, setCart}}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Account" component={UserAccount} />
        </Stack.Navigator>
      </CartContext.Provider>
    </NavigationContainer>
  );
}

export default App;
