import React, {useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Cart from '../screens/Cart';
import UserAccount from '../screens/UserAccount';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CartContext} from '../context';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {cart, setCart} = useContext(CartContext);
  const cartItemCount = cart.length;

  useEffect(() => {
    const loadCartData = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData !== null) {
          setCart(JSON.parse(cartData));
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };
    loadCartData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarActiveTintColor: 'purple'}}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="category" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({color, size}) => (
            <>
              <AntDesign name="shoppingcart" size={size} color={color} />
              {cartItemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
                </View>
              )}
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={UserAccount}
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TabNavigator;
