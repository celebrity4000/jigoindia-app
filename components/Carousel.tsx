import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {IMAGE_URL} from '../helpers';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageViewer from 'react-native-image-zoom-viewer';

const {width} = Dimensions.get('window');

const Carousel = ({images}) => {
  const scrollX = useSharedValue(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const flatListRef = useRef(null);

  const handleImageClick = image => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        const newIndex = Math.floor(scrollX.value / width) + 1;
        flatListRef.current.scrollToIndex({
          animated: true,
          index: newIndex % (images.length + 1), // Add 1 to loop back to the first item after reaching the end
        });
      }
    }, 3000); // Adjust the interval time as needed (e.g., 3000 ms = 3 seconds)

    return () => clearInterval(interval);
  }, [images]);

  return (
    <View>
      <Animated.FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleImageClick(item)}>
            <View style={{width, height: 200}}>
              <Image source={{uri: IMAGE_URL + item}} style={styles.image} />
            </View>
          </TouchableOpacity>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <Modal visible={!!selectedImage} transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}>
            <MaterialCommunityIcons name="close" size={30} color={'white'} />
          </TouchableOpacity>
          {/* <Image
            source={{uri: IMAGE_URL + selectedImage}}
            style={styles.modalImage}
          /> */}
          <ImageViewer
            imageUrls={[{url: IMAGE_URL + selectedImage}]}
            renderIndicator={() => null}
            style={styles.modalImage}
            backgroundColor="rgba(0,0,0,0.2)"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Carousel;
