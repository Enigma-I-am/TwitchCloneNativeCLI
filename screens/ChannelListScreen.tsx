import type {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {View, Image, Dimensions, StyleSheet, Text} from 'react-native';
import {ChannelList, Chat, ChannelAvatar} from 'stream-chat-react-native';
import type {ChannelSort} from 'stream-chat';

import type {NavigationParametersList} from '../Navigation';
// import type {
//   LocalAttachmentType,
//   LocalChannelType,
//   LocalCommandType,
//   LocalEventType,
//   LocalMessageType,
//   LocalReactionType,
//   LocalUserType,
// } from '../types';
import {AppContext} from '../AppContext';
import { useStreamChat } from '../useStreamChat';
import { ThumbNailComponent } from '../components/ListItem';

interface ChannelListScreenProps {
  navigation: StackNavigationProp<NavigationParametersList, 'ChannelList'>;
}

const sort: ChannelSort = {last_message_at: -1};

const options = {
  presence: true,
  state: true,
  watch: true,
};

export const ChannelListScreen: React.FC<ChannelListScreenProps> = ({
  navigation,
}: ChannelListScreenProps) => {
  const {setChannel} = useContext(AppContext);
  const {client, i18nInstance, user} = useStreamChat();
  const filters = {
    // members: {$in: [user.id]},
    type: 'livestream',
  };

  return (
    <Chat client={client} i18nInstance={i18nInstance}>
      <View style={{height: '100%'}}>
        <ChannelList
          filters={filters}
          options={options}
          sort={sort}
          Preview={ThumbNailComponent}
        />
      </View>
    </Chat>
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