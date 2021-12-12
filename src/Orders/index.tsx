import { FC, useEffect, useState } from 'react';
import Table, { TableData, TableProps } from '../core/components/Table';
import socket from '../core/network/socket';
import { OrderEvent } from './types';

const Component: FC = () => {
  const [orderMap, setOrderMap] = useState<TableData<OrderEvent>>({});
  useEffect(() => {
    const callback = (data: OrderEvent[]) => {
      const updatedOrderMap = data.reduce((acc, order) => {
        const { id, ...rest } = order;
        return { ...acc, [id]: rest };
      }, {});
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

  return <Table {...props} />;
};

export default Component;
