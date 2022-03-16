import React, {useContext} from 'react';
import {Image, View, Dimensions, StyleSheet, Text} from 'react-native';
import {Channel} from 'stream-chat';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppContext} from '../AppContext';
import {NavigationContext} from '@react-navigation/native';

export const ThumbNailComponent = ({channel}: {channel: any}) => {
  const {setChannel} = useContext(AppContext);
  const navigation = useContext(NavigationContext);

  return (
    <TouchableOpacity
      onPress={() => {
        setChannel(channel);
        navigation?.navigate('Channel');
      }}>
      <View style={styles.boxContainer}>
        <View>
          <Image
            source={{
              uri: channel.data?.channelImg as string,
            }}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={{paddingHorizontal: 20, paddingVertical: 4}}>
            {channel.cid}
          </Text>
          <Text style={{paddingHorizontal: 20, paddingVertical: 4}}>
            {`${channel.data?.channelName} stream`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flexDirection: 'row',
    height: Dimensions.get('window').height / 15,
    width: Dimensions.get('window').width,
    flex: 3,
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingLeft: 20,
    marginVertical: 15,
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
    alignSelf: 'center',
    width: Dimensions.get('window').width / 4,
    borderRadius: 5,
  },
});
