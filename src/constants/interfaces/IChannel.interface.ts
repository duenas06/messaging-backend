export default interface IChannel {
  id: number;
  createdBy: string;
  chatmates: string[];
  channelUrl: number;
  createdDate: Date;
  deleted: boolean;
  totalMessages: number;
}
