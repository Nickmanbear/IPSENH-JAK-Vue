import { Client } from '@stomp/stompjs';

const stompInstance = new Client({
  brokerURL: 'ws://localhost:8080/ws',
});

export default stompInstance;
