import { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Table, { TableData, TableProps } from '../core/components/Table';
import Context from '../core/network/Context';
import socket from '../core/network/socket';
import { ORANGE } from '../core/components/styles';
import Button from '../core/components/Button';

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

const HEADER_HEIGHT = '60px';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const Header = styled.div`
  height: ${HEADER_HEIGHT};
  background-color: ${ORANGE};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Content = styled.div`
  height: calc(100% - ${HEADER_HEIGHT});
  overflow: auto;
`;
const SmallButton = styled(Button)`
  font-size: 12px;
  padding: 12px;
  margin: 0 20px;
`;

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

  const props: TableProps<OrderEvent> = {
    data: orderMap,
    columns: [
      {
        key: 'customer',
        display: 'Customer',
        props: { style: { width: '20%' } }
      },
      {
        key: 'destination',
        display: 'Destination',
        props: { style: { width: '20%' } }
      },
      {
        key: 'event_name',
        display: 'Status',
        props: { style: { width: '20%' } }
      },
      {
        key: 'item',
        display: 'Item',
        props: { style: { width: '20%' } }
      },
      {
        key: 'price',
        display: 'Price',
        allowSearch: true,
        props: { style: { width: '10%' } }
      },
      {
        key: 'sent_at_second',
        display: 'Time Sent',
        props: { style: { width: '10%' } }
      }
    ]
  };

  return (
    <Container>
      <Header>
        <SmallButton theme="white" onClick={disconnect}>
          DISCONNECT
        </SmallButton>
      </Header>
      <Content>
        <Table {...props} />;
      </Content>
    </Container>
  );
};

export default Component;
