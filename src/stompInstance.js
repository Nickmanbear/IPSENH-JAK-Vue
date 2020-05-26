import { Client } from '@stomp/stompjs';

const stompInstance = new Client({
  brokerURL: `${process.env.VUE_APP_BACKEND_URL}/ws`,
});

export default stompInstance;
