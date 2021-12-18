import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { GREY, OFF_WHITE, ORANGE, WHITE } from './styles';
import Select from './Select';
import Input from './Input';
import SearchIcon from '../../assets/icons/search.png';

export type TableData<T> = { [key: string]: T };
export type TableSearchOperands = 'contains' | 'exact';
export type TableSearchValue = { operand: TableSearchOperands; value: string };
export type TableSearch<T> = Record<keyof T, TableSearchValue>;
export type ColumnProps<T> = {
  key: keyof T;
  display: string;
  render?: (data: T) => React.ReactNode;
  allowSearch?: boolean;
  props?: React.ThHTMLAttributes<HTMLTableCellElement>;
};
export type TableProps<T> = Omit<React.TableHTMLAttributes<HTMLTableElement>, 'children'> & {
  data: TableData<T>;
  columns: Array<ColumnProps<T>>;
  renderTotal?: (total: number) => React.ReactNode;
};
const operands: TableSearchOperands[] = ['contains', 'exact'];

const TableContainer = styled.table`
  table-layout: fixed;
  border-collapse: collapse;
  border-spacing: 0;
  color: ${GREY};
  thead,
  tfoot {
    position: sticky;
    background: ${OFF_WHITE};
  }
  thead {
    top: 0;
    font-size: 18px;
    box-shadow: 0px 4px 4px ${GREY}33;
  }
  tfoot {
    bottom: 0;
    box-shadow: 0px -4px 4px ${GREY}33;
  }
  tr {
    border: 2px solid ${GREY}33;
  }
  tr:nth-child(even) td {
    background-color: ${ORANGE}33;
  }
  tr:nth-child(odd) td {
    background-color: none;
  }
  td {
    padding: 12px;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled(Input)`
  color: ${GREY};
  padding-left: 32px;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  img {
    width: 16px;
    height: 16px;
    opacity: 0.5;
  }
`;

const NoDataContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PageSizeContainer = styled.div``;
const PageIndexContainer = styled.div``;
const PageTotalContainer = styled.div``;

const Component = <T,>(props: TableProps<T>) => {
  const { data, columns, renderTotal, ...rest } = props;
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(50);
  const [search, setSearch] = useState<TableSearch<T>>(
    columns.reduce(
      (acc, col) => ({ ...acc, [col.key]: { value: '', operand: 'contains' } as TableSearchValue }),
      {} as TableSearch<T>
    )
  );

  // data filtered by search
  const tableData = useMemo(
    () =>
      Object.values(data).filter((row) => {
        for (const key in search) {
          const { value, operand } = search[key];
          if (value.length && key in row) {
            switch (operand) {
              case 'contains':
                return String(row[key]).includes(value);
              case 'exact':
                return String(row[key]) === value;
            }
          }
        }
        return true;
      }),
    [data, search]
  );

  const total = useMemo(() => tableData.length, [tableData]);

  // renders the table head, column titles and search
  const renderTableHead = (): React.ReactNode => {
    return (
      <tr>
        {columns.map(({ key, display, allowSearch, props }) => (
          <td {...props} key={String(key)}>
            <b>{display}</b>
            <div style={{ visibility: allowSearch ? 'visible' : 'hidden' }}>
              <Select
                value={search[key].operand}
                onChange={({ target: { value } }) =>
                  setSearch({
                    ...search,
                    [key]: {
                      ...search[key],
                      operand: value as TableSearchOperands
                    }
                  })
                }
              >
                {operands.map((operand) => (
                  <option key={operand} value={operand}>
                    {operand}
                  </option>
                ))}
              </Select>
              <SearchContainer>
                <IconContainer>
                  <img src={SearchIcon} />
                </IconContainer>
                <SearchInput
                  value={search[key].value}
                  onChange={({ target: { value } }) =>
                    setSearch({
                      ...search,
                      [key]: {
                        ...search[key],
                        value
                      }
                    })
                  }
                />
              </SearchContainer>
            </div>
          </td>
        ))}
      </tr>
    );
  };

  // renders either no data text or the table data
  const renderTableBody = (): React.ReactNode => {
    if (tableData.length) {
      return tableData.map((order, index) => (
        <tr key={index}>
          {columns.map(({ key, render }) => (
            <td key={`${index}.${String(key)}`}>{render ? render(order) : order[key]}</td>
          ))}
        </tr>
      ));
    }
    return (
      <tr>
        <td colSpan={columns.length}>
          <NoDataContainer>No data</NoDataContainer>
        </td>
      </tr>
    );
  };

  // renders the pagination and total
  const renderTableFoot = (): React.ReactNode => {
    return (
      <tr>
        <td colSpan={columns.length}>
          <FooterContainer>
            <PageTotalContainer>{renderTotal ? renderTotal(total) : total}</PageTotalContainer>
          </FooterContainer>
        </td>
      </tr>
    );
  };

  return (
    <TableContainer {...rest}>
      <thead>{renderTableHead()}</thead>
      <tbody>{renderTableBody()}</tbody>
      <tfoot>{renderTableFoot()}</tfoot>
    </TableContainer>
  );
};

export default Component;
