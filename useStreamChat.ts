import {useEffect, useRef, useState} from 'react';
import {Streami18n} from 'stream-chat-react-native';
import {StreamChat} from 'stream-chat';
import Config from 'react-native-config';

// import type { LocalUserType} from './types';

const useConnectUser = ({
  client,
  user,
  userToken,
}: {
  client: StreamChat;
  user: any;
  userToken: string;
}) => {
  const [userIsConnected, setUserConnected] = useState(false);
  const isConnectingUser = useRef(false);

  useEffect(() => {
    const connectUser = async () => {
      try {
        await client.connectUser(user, userToken);
        setUserConnected(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
      } finally {
        isConnectingUser.current = false;
      }
    };

    if (!client.userID && !isConnectingUser.current) {
      setUserConnected(false);
      isConnectingUser.current = true;
      connectUser();
    }
  }, [client, user, userToken]);
  return {userIsConnected};
};

const getRandomColor = (): string => {
  let textColor = ['red', 'blue', 'green'];
  var item = textColor[Math.floor(Math.random() * textColor.length)];
  return item;
};

export const useStreamChat = () => {
  const client = useRef(StreamChat.getInstance(Config.STREAM_API_KEY));

  const userToken = Config.STREAM_USER_TOKEN;
  const user = {
    id: Config.STREAM_USER_ID,
    username: 'enigma',
    color: getRandomColor(),
  };

  const streami18n = useRef(
    new Streami18n({
      language: 'en',
    }),
  );
  const {userIsConnected} = useConnectUser({
    user,
    userToken,
    client: client.current,
  });

  return {
    clientReady: userIsConnected,
    client: client.current,
    i18nInstance: streami18n.current,
    user,
  };
};
