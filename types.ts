import type { Channel as ChannelType, StreamChat } from 'stream-chat';


export interface LocalUserType extends Record<string, unknown> {
  id: string;
}

// export type Channel = ChannelType;



export type Client = StreamChat;
