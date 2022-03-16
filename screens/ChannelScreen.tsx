import React, { memo, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  AutoCompleteInput,
  Channel,
  Chat,
  Colors,
  MessageInput,
  MessageList,
  renderText,
  useAttachmentPickerContext,
  useMessageContext,
  useMessageInputContext,
  generateRandomId,
} from 'stream-chat-react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useHeaderHeight } from '@react-navigation/elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppContext } from '../AppContext';
import { NavigationParametersList } from '../Navigation';
import { useStreamChat } from '../useStreamChat';
import { emoteAsset, emoticons, gifAssest } from '../utils/supportedReactions';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {SingleASTNode, State, ReactOutput} from 'simple-markdown';

interface ChannelScreenProps {
  navigation: StackNavigationProp<NavigationParametersList, 'Channel'>;
}
// TODO: Dismiss keyboard and show bottomsheet

const SendButton = () => {
  const { sendMessage, text, imageUploads, fileUploads, appendText } =
    useMessageInputContext();
  const snapPoints = useMemo(() => ['50%', '50%'], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentPress = () => bottomSheetModalRef?.current?.present();
  const handleClosePress = () => bottomSheetModalRef?.current?.close();

  const isDisabled = !text && !imageUploads.length && !fileUploads.length;

  const data = emoticons;
  // render
  const renderItem = useCallback(
    ({
      item,
    }: {
      item: {
        image: string;
        tag: string;
      };
    }) => (
      <TouchableOpacity
        onPress={() => {
          appendText(`${item.tag} `);
        }}>
        <Text>
          {' '}
          <Image
            key={item.tag}
            source={{ uri: item.image }}
            style={{ width: 30, height: 30 }}
          />
        </Text>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            flexDirection: 'row',
          },

          styles.flex,
        ]}>
        <TouchableOpacity disabled={isDisabled} onPress={sendMessage}>
          <Ionicons
            name={'ios-send-outline'}
            color={isDisabled ? 'grey' : 'blue'}
            size={21}
          />
        </TouchableOpacity>
        <View style={{width: 5}} />
        <TouchableOpacity onPress={handlePresentPress}>
          <Ionicons name={'add-outline'} color={'blue'} size={25} />
        </TouchableOpacity>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}>
        <SafeAreaView>
          <FlatList
            key={generateRandomId()}
            data={data}
            keyExtractor={i => i.tag}
            renderItem={renderItem}
            numColumns={11}
          />
        </SafeAreaView>
      </BottomSheetModal>
    </View>
  );
};

const CustomInput = () => {
  return (
    <View style={[styles.fullWidth, styles.row]}>
      <View style={[styles.input]}>
        <AutoCompleteInput />
      </View>
      <View style={{ width: 5 }} />
      <SendButton />
    </View>
  );
};

const assetDirectory =
  '/Users/enigma/react_native/TwitchCloneNativeCLI/assets/';

const SimpleChatText = memo(props => {
  const { message } = useMessageContext();
  const displayName = message.user?.username ?? message.user?.id;
  const userNameColor = message.user?.color as string;
  return (
    <View style={styles.messageContainer}>
      <Text style={[styles.messageUserName, { color: userNameColor }]}>
        {displayName}:{' '}
      </Text>
      {/* <Text style={styles.messageText}>{message.text}</Text> */}
      <>
        {renderText({
          colors: Colors,
          markdownStyles: {
            mentions: {
              fontWeight: '200',
            },
            paragraph: {
              marginBottom: 0,
              marginTop: 0,
            },

            paragraphCenter: {
              marginBottom: 0,
              marginTop: 0,
            },
            paragraphWithImage: {
              marginBottom: 0,
              marginTop: 0,
            },
            text: {
              color: 'black',
              fontSize: 14,
            },
          },
          markdownRules: {
            emote: {
              order: 1,
              match: function (source: string) {
                // console.log(source);
                return new RegExp(
                  '^.*(aaugh|ayayajam|balddab|baldflick|notsquishy|poledoge|rarepepe|ronsmug|saltycorn|baldfloss|baldspin|baldyappp|baldyikes|kappscool|kkona|karappa|hhhehehe|lul|baners|bropls|catjam|checkers|click|coomtime|crawlers|deadlole|deskchan|eato|eddiebaldmansmash|eddieknead|eddiespin|eekum|flappers|fubaldi|gwakgwak|guitartime|humpers|hypernodders|hypernopers|hyperpeepod|johnsouls|).*$',
                ).exec(source);
              },
              parse: function (
                capture: any[],
                parse: (cap: string, state: any) => any,
                state: any,
              ) {
                return {
                  text: capture[0],
                };
              },
              react: (
                node: SingleASTNode,
                output: ReactOutput,
                state: State,
              ) => {
                const emotes: Record<string, string> = {
                  aaugh: gifAssest({ name: 'aaugh' }),
                  ayayajam: gifAssest({ name: 'ayayajam' }),
                  balddab: gifAssest({ name: 'balddab' }),
                  baldflick: gifAssest({ name: 'baldflick' }),
                  notsquishy: emoteAsset({ name: 'notsquishy' }),
                  poledoge: emoteAsset({ name: 'poledoge' }),
                  rarepepe: emoteAsset({ name: 'rarepepe' }),
                  ronsmug: emoteAsset({ name: 'ronsmug' }),
                  saltycorn: emoteAsset({ name: 'saltycorn' }),
                  baldfloss: gifAssest({ name: 'baldfloss' }),
                  baldspin: gifAssest({ name: 'baldspin' }),
                  baldyappp: gifAssest({ name: 'baldyappp' }),
                  baldyikes: gifAssest({ name: 'baldyikes' }),
                  kappscool: emoteAsset({ name: 'kappscool' }),
                  karappa: emoteAsset({ name: 'karappa' }),
                  kkona: emoteAsset({ name: 'kkona' }),
                  hhhehehe: emoteAsset({ name: 'hhhehehe' }),
                  lul: emoteAsset({ name: 'lul' }),
                  baners: gifAssest({ name: 'baners' }),
                  bropls: gifAssest({ name: 'bropls' }),
                  catjam: gifAssest({ name: 'catjam' }),
                  checkers: gifAssest({ name: 'checkers' }),
                  click: gifAssest({ name: 'click' }),
                  coomtime: gifAssest({ name: 'coomtime' }),
                  crawlers: gifAssest({ name: 'crawlers' }),
                  deadlole: gifAssest({ name: 'deadlole' }),
                  deskchan: gifAssest({ name: 'deskchan' }),
                  eato: gifAssest({ name: 'eato' }),
                  eddiebaldmansmash: gifAssest({ name: 'eddiebaldmansmash' }),
                  eddieknead: gifAssest({ name: 'eddieknead' }),
                  eddiespin: gifAssest({ name: 'eddiespin' }),
                  eekum: gifAssest({ name: 'eekum' }),
                  flappers: gifAssest({ name: 'flappers' }),
                  fubaldi: gifAssest({ name: 'fubaldi' }),
                  gwakgwak: gifAssest({ name: 'gwakgwak' }),
                  guitartime: gifAssest({ name: 'guitartime' }),
                  humpers: gifAssest({ name: 'humpers' }),
                  hypernodders: gifAssest({ name: 'hypernodders' }),
                  hypernopers: gifAssest({ name: 'hypernopers' }),
                  hyperpeepod: gifAssest({ name: 'hyperpeepod' }),
                  johnsouls: gifAssest({ name: 'johnsouls' }),
                };

                const segments = node.text.split(' ');
                return segments.map((s: string) => {
                  if (emotes[s]) {
                    return (
                      <Text>
                        {' '}
                        <Image
                          key={state.key}
                          source={{ uri: emotes[s] }}
                          style={{ width: 15, height: 15 }}
                        />
                      </Text>
                    );
                  } else {
                    return <Text> {s}</Text>;
                  }
                });
              },
              html: null,
            },
          },
          message,
        })}
      </>
    </View>
  );
});

export const ChannelScreen: React.FC<ChannelScreenProps> = ({
  navigation,
}: ChannelScreenProps) => {
  const { channel } = useContext(AppContext);
  const headerHeight = useHeaderHeight();
  const { setTopInset } = useAttachmentPickerContext();

  const { client, i18nInstance } = useStreamChat();

  useEffect(() => {
    setTopInset(headerHeight);
  }, [headerHeight, setTopInset]);

  /**
   * TODO: The `as any` assertion on `channel` is a result
   * of the type definition in stream-chat not being permissibe
   * enough for the local type here.
   *
   * An issue is created for this.
   * */
  return (
    <Chat client={client as any} i18nInstance={i18nInstance}>
      <Channel
        channel={channel as any}
        keyboardVerticalOffset={headerHeight}
        MessageHeader={() => null}
        MessageFooter={() => null}
        // keyboardVerticalOffset={0}
        // key={generateRandomId()}
        forceAlignMessages={true}
        onLongPressMessage={() => {}}
        hasImagePicker={false}
        hasCommands={false}
        hasFilePicker={false}
        hideStickyDateHeader={true}
        hideDateSeparators={true}
        Input={CustomInput}
        MessageSimple={SimpleChatText}>
        <MessageList  />
        <MessageInput giphyActive={false} />
        <View style={styles.bottomSpaces} />
      </Channel>
    </Chat>
  );
};

const themeStyle = {
  messageSimple: {
    content: {
      markdown: {
        heading1: {
          color: 'pink',
        },
        inlineCode: {
          fontSize: 10,
        },
      },
    },
  },
};

const styles = StyleSheet.create({
  emoteItemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  videoContainer: {
    flex: 2.2,
  },
  chatContainer: {
    flex: 4,
  },
  bottomSpaces: {
    paddingBottom: 18,
  },
  statusMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  messageUserName: {},
  messageText: {},

  flex: { flex: 1 },
  fullWidth: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // inputContainer: {
  //   height: 40,
  // },
  input: {
    // width: "100%",
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    flex: 4,
  },
});
