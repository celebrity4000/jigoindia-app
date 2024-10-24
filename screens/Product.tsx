import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BASE_URL_API, IMAGE_URL} from '../helpers';
import {Table} from 'react-native';
import ImageCarousel from '../components/Carousel';
import {CartContext} from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Product = () => {
  const route = useRoute();
  const {id} = route.params;
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState([]);

  // console.log(tableData);

  const getProduct = async () => {
    try {
      const response = await fetch(
        `${BASE_URL_API}/products.php?case=get_product_by_id&id=${id}`,
      );
      const jsonData = await response.json();
      setData(jsonData);
      if (jsonData[0]?.data) {
        const sanitizedData = jsonData[0].data.replace(/\n/g, '\\n');
        const parsedData = JSON.parse(sanitizedData);
        setTableData(parsedData);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {/* <BreadCrumbs page={'Products'} /> */}
      <ProductDetails data={data[0]} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        {data && (
          <View style={{width: '90%', borderWidth: 0.5, borderColor: 'gray'}}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                borderColor: 'gray',
              }}>
              {tableData &&
                tableData.headers &&
                tableData.headers.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flex: 1,
                      padding: 10,
                      borderRightWidth: 0.5,
                      borderColor: 'gray',
                    }}>
                    <Text style={{fontWeight: '600', color: 'black'}}>
                      {item}
                    </Text>
                  </View>
                ))}
            </View>
            {tableData &&
              tableData.rows &&
              tableData?.rows?.map((row, rowIndex) => (
                <View
                  key={rowIndex}
                  style={{
                    flexDirection: 'row',
                    borderBottomWidth: 0.5,
                    borderColor: 'gray',
                  }}>
                  {Object.values(row).map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flex: 1,
                        padding: 10,
                        borderRightWidth: 0.5,
                        borderColor: 'gray',
                      }}>
                      <Text style={{color: 'black'}}>{item}</Text>
                    </View>
                  ))}
                </View>
              ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Product;

// import React from "react";
// import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

const ProductDetails = ({data}) => {
  const {cart, setCart} = useContext(CartContext);
  const navigation = useNavigation();
  const [isAddedtoCart, setIsAddedtoCart] = useState(false);

  const images_with_quotes = data?.images?.split(',');
  const images = images_with_quotes?.map(item => item?.replace(/"/g, ''));

  const insertToCart = () => {
    const newCart = [...cart];
    const data_ = {
      name: data?.name,
      image: images,
    };
    if (newCart.find(item => item.name === data_.name)) {
      return;
    }
    newCart.push({
      name: data?.name,
      image: images,
    });
    setCart(newCart);
    setIsAddedtoCart(true);
  };

  useEffect(() => {
    // Check if the product is already in the cart
    const isInCart = cart.some(item => item.name === data?.name);
    setIsAddedtoCart(isInCart);
  }, [cart, data]);

  // Save cart data to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <View style={{marginHorizontal: 10, backgroundColor: 'white'}}>
      <View style={{marginVertical: 10}}>
        <ImageCarousel images={images} />
      </View>
      <View style={{marginVertical: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          {data?.name}
        </Text>
      </View>

      <View style={{marginTop: 10}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
          Product Details:
        </Text>
        <Text style={{color: 'black'}}>{data?.description}</Text>
      </View>

      {isAddedtoCart ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart');
          }}
          style={{
            backgroundColor: '#CBC3E3',
            padding: 10,
            borderRadius: 8,
            marginVertical: 10,
          }}>
          <Text
            style={{color: 'black', textAlign: 'center', fontWeight: 'bold'}}>
            Go to Cart
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={insertToCart}
          style={{
            backgroundColor: 'purple',
            padding: 10,
            borderRadius: 8,
            marginVertical: 10,
          }}>
          <Text
            style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
            Add To Quote
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
