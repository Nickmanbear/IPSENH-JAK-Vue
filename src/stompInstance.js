import webstomp from 'webstomp-client';

const protocols = webstomp.VERSIONS.supportedProtocols();
if (localStorage.getItem('token')) {
  protocols.push(localStorage.getItem('token').replace(' ', '.'));
}
const stompInstance = webstomp.over(new WebSocket(`ws${process.env.VUE_APP_BACKEND_URL}/ws`, protocols));

export default stompInstance;
