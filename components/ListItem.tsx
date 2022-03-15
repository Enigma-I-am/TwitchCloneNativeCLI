import React, {useState, useEffect, useContext} from 'react';
import { Image, View, Dimensions, StyleSheet, Text } from 'react-native';
import {useChannelsContext} from 'stream-chat-react-native';
import {StreamChat, Channel} from 'stream-chat';
import { ChannelsContext } from 'stream-chat-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppContext } from '../AppContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationParametersList } from '../Navigation';
import {NavigationContext} from '@react-navigation/native';

export const ThumbNailComponent = (
  {channel}: {channel: any}
 
) => {
  const { setChannel } = useContext(AppContext);
  const navigation = useContext(NavigationContext);

  return (
    <TouchableOpacity onPress={() => {
                  setChannel(channel);
                  navigation?.navigate('Channel');
    }}>
      <View style={styles.boxContainer}>
        <View>
          <Image
            source={{
              uri: channel.data['channelImg'],
            }}
            style={styles.image}
          />
        </View>
        <View>
          <Text style={{paddingHorizontal: 20, paddingVertical: 4}}>
            {channel.cid}
          </Text>
          <Text style={{paddingHorizontal: 20, paddingVertical: 4}}>
            {channel.data['channelName'] + ' stream'}
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
    // height: 150,
    borderRadius: 5,
  },
});
