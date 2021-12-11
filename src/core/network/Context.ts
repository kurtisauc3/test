import { createContext } from 'react';

export type NetworkState = 'connecting' | 'connected' | 'disconnecting' | 'disconnected' | 'error';

export type EventName = 'CREATED' | 'CANCELLED' | 'COOKED' | 'DRIVER_RECEIVED' | 'DELIVERED';

export type OrderEvent = {
  customer: string;
  destination: string;
  event_name: EventName;
  id: string;
  item: string;
  price: number;
  sent_at_second: number;
};

export type OrderEventCallback = (order: OrderEvent) => void;

export type NetworkContext = {
  networkState: NetworkState;
  networkError?: string;
  orderEvent?: OrderEvent;
  connect: () => void;
  disconnect: () => void;
};

export default createContext({} as NetworkContext);
