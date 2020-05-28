import { Client } from '@stomp/stompjs';

const stompInstance = new Client({
  brokerURL: `ws${process.env.VUE_APP_BACKEND_URL}/ws`,
});

export default stompInstance;
