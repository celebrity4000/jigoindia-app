import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import {CartContext} from '../context';
import {IMAGE_URL} from '../helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import jigoIcon from '../assets/jigo-icon.png';
import {instance} from '../helpers'; // Assuming you have an Axios instance setup

const Cart = () => {
  const {cart, setCart} = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const removeFromCart = async itemName => {
    const updatedCart = cart.filter(item => item.name !== itemName);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart)); // Update AsyncStorage data
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: IMAGE_URL + item.image[0]}}
          style={{width: 150, height: 100}}
        />
      </View>
      <View style={{marginLeft: 70}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#1F2937',
            fontSize: 18,
            marginBottom: 10,
          }}>
          {item.name}
        </Text>
        <TouchableOpacity onPress={() => removeFromCart(item.name)} style={{}}>
          <Text style={{color: 'red'}}>
            <AntDesign name="delete" size={20} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleCheckout = async () => {
    try {
      if (!email) {
        setEmailError('Please enter an email address');
        return;
      }

      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        return;
      }

      setEmailError(''); // Clear any existing errors

      const data = cart.map(item => item.name);

      const response = await instance.post('/mail.php', {
        address: email,
        data: data,
      });

      setCart([]); // Clear cart after checkout
      await AsyncStorage.removeItem('cart'); // Remove cart data from AsyncStorage
      setEmail('');
      alert('Order placed successfully');
    } catch (error) {
      console.error('Error checking out:', error);
      alert('Failed to place order');
    }
  };

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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{width: '100%', padding: 10}}>
        <Image source={jigoIcon} style={{width: 100, height: 40}} />
      </View>
      <View style={{width: 'full', alignItems: 'center', marginTop: 5}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            color: 'black',
          }}>
          Cart
        </Text>
      </View>

      {cart.length > 0 ? (
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={item => item.name}
        />
      ) : (
        <Text style={{marginLeft: 10, color: 'red'}}>No items in the cart</Text>
      )}

      <View style={{marginVertical: 20, marginHorizontal: 10}}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={'black'}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {emailError ? (
          <Text style={{color: 'red', marginBottom: 10}}>{emailError}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 70,
    paddingRight: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: 'white',

    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'ios' ? 2 : 5, // Adjust the height for iOS and Android
    },
    elevation: Platform.OS === 'android' ? 5 : undefined, // Only apply elevation on Android
  },
  imageContainer: {
    width: 40,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  checkoutButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 18,
    alignItems: 'center',
  },
});

export default Cart;
