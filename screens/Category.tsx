import React, {useEffect, useState} from 'react';
import {Image, View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BASE_URL_API, IMAGE_URL} from '../helpers';

const Category = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params;
  const val = params?.cname;

  const str = val?.split('/');
  const firstValue = str ? str[0] : ' ';
  const lastValue = str ? str[str.length - 1] : ' ';
  const id = firstValue == lastValue ? firstValue : lastValue;

  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const uri = decodeURI(id);
      const formData = new FormData();
      formData.append('id', uri);

      const response = await fetch(
        `${BASE_URL_API}/category.php?case=get_categories_by_parent`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setProducts(data);
      // console.log(products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route]);

  return (
    <ScrollView>
      <View style={{flex: 1, paddingHorizontal: 10, paddingVertical: 20}}>
        {products && products?.children
          ? products.children.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  item?.is_product
                    ? navigation.navigate('Product', {productId: item.id})
                    : navigation.navigate('Category', {cname: item.cname});
                }}
                style={{
                  marginBottom: 20,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 8,
                  overflow: 'hidden',
                }}>
                <Image
                  source={{uri: IMAGE_URL + item.cimage}}
                  style={{width: '100%', aspectRatio: 16 / 9}}
                  resizeMode="cover"
                />
                <View
                  style={{
                    // position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 10,
                  }}>
                  <Text style={{color: 'white', fontSize: 16}}>
                    {item.cname}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          : products.map((product, index) => (
              <TouchableOpacity
                onPress={() => {
                  if (product.id) {
                    navigation.navigate('Product', {id: product?.id});
                  } else {
                    navigation.navigate('Home');
                  }
                }}
                key={index}
                style={{
                  position: 'relative',
                  // aspectRatio: 16 / 9,
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginBottom: 5,
                  // backgroundColor: 'red',
                }}>
                <Image
                  source={{
                    uri:
                      IMAGE_URL +
                      product?.images
                        ?.split(',')
                        .map(item => item.replace(/"/g, ''))[0],
                  }}
                  style={{width: '100%', aspectRatio: 16 / 9}}
                />
                <View
                  style={{
                    // position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                      lineHeight: 20,
                    }}>
                    {product?.name || 'No Category'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
      </View>
    </ScrollView>
  );
};

export default Category;
