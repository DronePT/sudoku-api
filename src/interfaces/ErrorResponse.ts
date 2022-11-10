import MessageResponse from './MessageResponse';

export default interface ErrorResponse extends MessageResponse {
  error: true;
  stack?: string;
}
