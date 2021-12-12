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
