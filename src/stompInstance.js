import webstomp from 'webstomp-client';
import SockJS from 'sockjs-client';

const stompInstance = webstomp.over(
  new SockJS(`${process.env.VUE_APP_BACKEND_URL}/ws?${localStorage.getItem('token')}`),
  { debug: false, heartbeat: false },
);

export default stompInstance;
