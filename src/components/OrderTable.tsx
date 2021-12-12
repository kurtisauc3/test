import { FC, useContext } from 'react';
import Context from '../core/network/Context';
import { OrderMap } from '../core/network/types';

const columns: Array<keyof OrderMap[keyof OrderMap]> = [
  'customer',
  'destination',
  'event_name',
  'item',
  'price',
  'sent_at_second'
];

const Component: FC = () => {
  const { orderMap } = useContext(Context);
  return (
    <table>
      <thead>
        <tr>
          {columns.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.values(orderMap).map((order, index) => (
          <tr key={index}>
            {columns.map((key) => (
              <td key={`${index}.${key}`}>{order[key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Component;
