/**
 * export {
 *   disconnectIfConnected,
 *   subscribeIfConnected,
 *   sendIfSubscribed,
 *   useStomp,
 *   connectOrReconnectWithAutoReconnect
 * }
 */

import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

const subDestPrefix = Config.WS_BROKER_DEST_PREFIX || '/topic';
const sendDestPrefix = Config.WS_APP_DEST_PREFIX || '/app';
const login = Config.MQ_LOGIN;
const passcode = Config.MQ_PASSCODE;

const stomp = {instance: null};

const Empty = o => {
  return (
    !o ||
    (Array.isArray(o) && o.length === 0) ||
    (typeof o === 'object' && Object.keys(o).length === 0)
  );
};

const Connected = () => {
  if (stomp.instance === null) return false;
  if (stomp.instance === undefined) return false;
  return !!stomp.instance.connected;
};

const Subscribed = () => {
  return Connected() && !Empty(stomp.instance.subscriptions);
};

const Initialize = () => {
  stomp.instance = Stomp.over(new SockJS(Config.API_BASE_URL + '/websocket'));

  console.log('Stomp initialized');
};

const ConnectIfNotConnected = (
  onConnect = frame => {},
  onError = error => {},
  headers = {},
  onReject = error => {},
) => {
  if (Connected()) return;

  api('get', '/ws-front/knock')
    .then(() => AsyncStorage.getItem('idToken'))
    .then(accessToken => {
      Initialize();

      /*
       * Stomp client api doc
       * https://stomp-js.github.io/stomp-websocket/codo/class/Client.html
       *
       * stomp.connect(headers, connectCallback)
       * stomp.connect(headers, connectCallback, errorCallback)
       * stomp.connect(login, passcode, connectCallback)
       * stomp.connect(login, passcode, connectCallback, errorCallback)
       * stomp.connect(login, passcode, connectCallback, errorCallback, closeEventCallback)
       * stomp.connect(login, passcode, connectCallback, errorCallback, closeEventCallback, host)
       *
       * 이렇게 나와 있지만 구현체마다 다른 듯 (현재 onClose가 안 됨)
       */

      stomp.instance.connect(
        {
          login,
          passcode,
          accessToken: accessToken,
          ...headers,
        },
        frame => {
          //   console.log(stomp);
          onConnect(frame);
        },
        frame => {
          //   console.log(stomp);
          onError(frame);
        },
      );
    })
    .catch(onReject);
};

/**
 * disconnect stomp if connected
 */
export const DisconnectIfConnected = (
  onDisconnect = () => {},
  headers = {},
  onElse = () => {},
) => {
  if (Connected()) stomp.instance.disconnect(onDisconnect, headers);
  else onElse();
};

/**
 * subscribe given destination with given messageListeners and headers if connected
 * nothing happen when passing empty destination, messageListener or not connected
 *
 * Stomp subscription object having unsubscribe method in it
 */
export const SubscribeIfConnected = async (
  destination = {
    roomType: '',
    roomId: '',
  },
  messageListeners = {},
  headers = {},
) => {
  if (Empty(destination) || Empty(messageListeners) || !Connected())
    return {unsubscribe: () => {}};

  return stomp.instance.subscribe(
    subDestPrefix + "/" + destination.roomType + "." + destination.roomId.toUpperCase(),
    message => {
      const {command, data} = JSON.parse(message.body);

      messageListeners[command](data);
    },
    {
      accessToken: await AsyncStorage.getItem('idToken'),
      ...headers,
    },
  );
};

/**
 * send message to given destitation with given body and headers if connected and subscribed
 * nothing happen when passing empty destination or not subscribed
 */
export const SendIfSubscribed = (
  destination = {
    roomType: '',
    roomId: '',
    action: '',
  },
  body = {},
  headers = {},
) => {
  if (Empty(destination) || !Subscribed()) return;

  stomp.instance.send(
    sendDestPrefix + "/" + destination.roomType + "." + destination.roomId.toUpperCase() + "." + destination.action,
    JSON.stringify(body),
    headers,
  );
};

/**
 * if connected, return the stomp wrapper object
 * else, connect and return it
 */
export const UseStomp = (
  onConnect = frame => {},
  onError = error => {
    console.log('STOMP ERROR', error);
  },
  headers = {},
  onReject = error => {
    console.error('API ERROR', error);
  },
) => {
  ConnectIfNotConnected(onConnect, onError, headers, onReject);

  return stomp;
};

/**
 * disconnect existing connection if connected
 * and connect with auto reconnect
 */
export const ConnectOrReconnectWithAutoReconnect = (
  onConnect = frame => {},
  onError = error => {
    console.log('STOMP ERROR', error);
  },
  headers = {},
  timeOut = 1,
  afterReconnect = frame => {},
  beforeReconnect = error => {},
) => {
  const ConnectRecursive = () => {
    ConnectIfNotConnected(
      frame => {
        onConnect(frame);
        afterReconnect(frame);
      },
      error => {
        onError(error);
        beforeReconnect(error);

        // Recursion
        setTimeout(() => {
          ConnectRecursive();
        }, timeOut * 1000);
      },
      headers,
      error => {
        setTimeout(() => {
          ConnectRecursive();
        }, timeOut * 1000);
      },
    );
  };

  const ConnectWithAutoReconnect = () => {
    UseStomp(
      () => {
        stomp.instance.disconnect(() => {
          ConnectRecursive();
        });
      },
      () => {
        ConnectRecursive();
      },
      headers,
      () => {
        ConnectRecursive();
      },
    );
  };

  DisconnectIfConnected(ConnectWithAutoReconnect, {}, ConnectWithAutoReconnect);
};
