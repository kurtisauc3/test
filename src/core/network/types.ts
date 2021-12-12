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

export type OrderMap = {
  [id: string]: Omit<OrderEvent, 'id'>;
};

export type OrderEventCallback = (order: OrderEvent) => void;

export type NetworkContext = {
  networkState: NetworkState;
  networkError?: string;
  orderMap: OrderMap;
  connect: () => void;
  disconnect: () => void;
};
