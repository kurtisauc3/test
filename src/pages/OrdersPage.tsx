import { FC, useContext, useEffect, useState } from 'react';
import Table, { TableData, TableProps } from '../core/components/Table';
import Context from '../core/network/Context';
import socket from '../core/network/socket';

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

const Component: FC = () => {
  const { disconnect } = useContext(Context);
  const [orderMap, setOrderMap] = useState<TableData<OrderEvent>>({});

  // order effect
  useEffect(() => {
    const callback = (data: OrderEvent[]) => {
      const updatedOrderMap = data.reduce((acc, order) => ({ ...acc, [order.id]: order }), {});
      setOrderMap((_orderMap) => ({ ..._orderMap, ...updatedOrderMap }));
    };
    socket.on('order_event', callback);
    return () => {
      socket.off('order_event', callback);
    };
  }, []);

  const props: TableProps<OrderEvent, 'price'> = {
    data: orderMap,
    columns: ['customer', 'destination', 'event_name', 'item', 'price', 'sent_at_second'],
    defaultSearch: {
      price: {
        operand: 'contains',
        value: ''
      }
    }
  };

  return (
    <>
      <button onClick={disconnect}>disconnect</button>
      <Table {...props} />;
    </>
  );
};

export default Component;
