import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {BASE_URL_API, IMAGE_URL} from '../helpers';
import jigoIcon from '../assets/jigo-icon.png';
import {useNavigation} from '@react-navigation/native';

const Categories = () => {
  const navigation = useNavigation();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(
        `${BASE_URL_API}/category.php?case=get_sub_categories`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch subcategories');
      }
      const data = await response.json();
      setSubcategories(data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.subcategoryItem}
      onPress={() => {
        navigation.navigate('Category', {cname: item.cname});
      }}>
      <Image
        source={{uri: IMAGE_URL + item.cimage}}
        style={styles.subcategoryImage}
      />
      <Text style={styles.subcategoryName}>{item.cname}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={jigoIcon} style={styles.logo} />
      </View>
      <View style={{width: '100%', marginBottom: 15}}>
        <Text style={styles.title}>Categories</Text>
      </View>
      <FlatList
        data={subcategories}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.subcategoryContainer}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 100,
    height: 40,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: 'black',
    paddingLeft: 10,
  },
  subcategoryContainer: {
    padding: 10,
  },
  subcategoryItem: {
    width: '48%',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: '1%',
  },
  subcategoryImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  subcategoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
    textAlign: 'center',
    color: 'black',
  },
});

export default Categories;
