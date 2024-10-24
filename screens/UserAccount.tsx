import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import jigoIcon from '../assets/jigo-icon.png';

const UserAccount = () => {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', padding: 10}}>
        <Image source={jigoIcon} style={{width: 100, height: 40}} />
      </View>
      <Text style={styles.title}>Account</Text>

      <View
        style={{
          height: 5,
          width: 'full',
          backgroundColor: '#D3D3D3',
          borderRadius: 10,
          marginVertical: 10,
        }}></View>

      <Text style={styles.title}>Account Settings</Text>

      <View
        style={{
          flexDirection: 'column',
          marginTop: 20,
          gap: 15,
          paddingLeft: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Ionicons name="language-outline" size={22} color={'black'} />
            <Text style={styles.subtitle}>Select Language</Text>
          </View>
          <MaterialIcons name="navigate-next" size={26} color={'black'} />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Ionicons name="notifications-outline" size={22} color={'black'} />
            <Text style={styles.subtitle}>Notification Settings</Text>
          </View>
          <MaterialIcons name="navigate-next" size={26} color={'black'} />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <MaterialCommunityIcons name="headset" size={22} color={'black'} />
            <Text style={styles.subtitle}>Help Center</Text>
          </View>
          <MaterialIcons name="navigate-next" size={26} color={'black'} />
        </View>
      </View>

      <View
        style={{
          height: 5,
          width: 'full',
          backgroundColor: '#D3D3D3',
          borderRadius: 10,
          marginVertical: 10,
        }}
      />

      <Text style={styles.title}>Feedback & Information</Text>

      <View
        style={{
          flexDirection: 'column',
          marginTop: 20,
          gap: 15,
          paddingLeft: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <MaterialCommunityIcons
              name="file-document-multiple-outline"
              size={22}
              color={'black'}
            />
            <Text style={styles.subtitle}>Terms, Policis and Licenses</Text>
          </View>
          <MaterialIcons name="navigate-next" size={26} color={'black'} />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <AntDesign name="questioncircleo" size={22} color={'black'} />
            <Text style={styles.subtitle}>Browse FAQs</Text>
          </View>
          <MaterialIcons name="navigate-next" size={26} color={'black'} />
        </View>
      </View>
    </View>
  );
};

export default UserAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
