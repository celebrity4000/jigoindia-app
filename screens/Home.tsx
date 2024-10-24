import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BASE_URL_API, IMAGE_URL, instance} from '../helpers';
import ParallaxCarousel from '../components/ParallaxCarousel';
import CustomImageCarousal from '../components/ParallaxCarousel';
import {useNavigation} from '@react-navigation/native';
import jigoIcon from '../assets/jigo-icon.png';
import {TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigation = useNavigation();

  const data = [
    {
      image: require('../assets/sliders/slide1.png'),
    },
    {
      image: require('../assets/sliders/slide1.png'),
    },
    {
      image: require('../assets/sliders/slide1.png'),
    },
  ];

  const getCategories = async () => {
    try {
      const response = await instance.get('/category.php');
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  const handleSearch = query => {
    setSearchQuery(query);
    // Filter products based on search query
    const filtered = products.filter(
      product =>
        product?.name.toLowerCase().includes(query.toLowerCase()) ||
        product?.keyword.toLowerCase().includes(query.toLowerCase()),
    );
    // console.log(filtered);
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    getCategories();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL_API}/products.php`);
        const data = await response.json();
        setProducts(data);
        //setFilteredProducts(data); // Initially set filtered products to all products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{width: '100%', padding: 10}}>
        <Image source={jigoIcon} style={{width: 100, height: 40}} />
      </View>
      <View style={styles.searchbar}>
        <TextInput
          style={{color: 'black', width: '95%'}}
          placeholder="Search products..."
          placeholderTextColor={'gray'}
          onChangeText={handleSearch}
          value={searchQuery}
        />
        {searchQuery !== '' ? (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
            }}>
            <MaterialCommunityIcons name="close" size={20} color={'red'} />
          </TouchableOpacity>
        ) : (
          <Feather name="search" size={20} color={'gray'} />
        )}
      </View>

      {filteredProducts.length > 0 && searchQuery !== '' && (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                if (item.id) {
                  navigation.navigate('Product', {id: item?.id});
                } else {
                  navigation.navigate('Home');
                }
              }}
              style={styles.card}>
              <View style={styles.cardImageContainer}>
                <Image
                  source={{
                    uri:
                      IMAGE_URL +
                      item?.images
                        ?.split(',')
                        .map(item => item.replace(/"/g, ''))[0],
                  }}
                  style={{width: 150, height: 100}}
                />
              </View>
              <View style={{marginLeft: 70, width: '60%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#1F2937',
                    fontSize: 16,
                    marginBottom: 10,
                  }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {searchQuery.length < 1 && <ParallaxCarousel />}

      {searchQuery.length < 1 && (
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontSize: 24,
            fontWeight: '600',
            paddingTop: 20,
            paddingBottom: 20,
          }}>
          Our Categories
        </Text>
      )}

      {searchQuery.length < 1 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 20,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Category', {cname: item.cname});
              }}
              key={item.cid}
              style={styles.card}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: IMAGE_URL + item.cimage}}
                  style={{width: 150, height: 100}}
                />
              </View>
              <View style={{flex: 1, marginLeft: 70}}>
                <Text
                  style={{fontWeight: 'bold', color: '#1F2937', fontSize: 18}}>
                  {capitalizeFirstLetter(item.cname)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
  },
  searchbar: {
    display: 'flex',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '95%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 70,
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

  cardImageContainer: {
    width: 40,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
