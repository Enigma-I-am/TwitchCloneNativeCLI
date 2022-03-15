import type { Channel as ChannelType, StreamChat } from 'stream-chat';
import {DefaultStreamChatGenerics } from 'stream-chat-react-native';


export interface LocalUserType extends Record<string, unknown> {
  id: string;
}

export type Channel = ChannelType;



export type Client = StreamChat<DefaultStreamChatGenerics>;
