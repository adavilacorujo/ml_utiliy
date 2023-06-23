import React, { FunctionComponent } from 'react';
import {
  formatDate,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
  EuiLink,
  EuiHealth,
  EuiFlexItem,
  EuiEmptyPrompt,
} from '@elastic/eui';
import { faker } from '@faker-js/faker';

type User = {
  ip: string;
  port: number;
  count: number;
};

const users: User[] = [];

for (let i = 0; i < 6; i++) {
  users.push({
    ip: faker.internet.ipv4(),
    port: faker.internet.port(),
    count: i*10,
  });
}

const SummaryTable: FunctionComponent = () => {
  const columns: Array<EuiBasicTableColumn<User>> = [
    {
      field: 'ip',
      name: 'IP',
    },
    {
      field: 'port',
      name: 'Port',
    },
    {
      field: 'count',
      name: 'Count',
    },
  ];

  const getRowProps = (user: User) => {
    const { count } = user;
    return {
      'data-test-subj': `row-${count}`,
      className: 'customRowClass',
      onClick: () => {},
    };
  };

  const getCellProps = (
    user: User,
    column: EuiTableFieldDataColumnType<User>
  ) => {
    const { count } = user;
    const { field } = column;
    return {
      className: 'customCellClass',
      'data-test-subj': `cell-${count}-${String(field)}`,
      textOnly: true,
    };
  };

  return (
    <EuiEmptyPrompt
    body = {
      <EuiFlexItem grow = {false}>
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable"
        items={users}
        rowHeader="firstName"
        columns={columns}
        rowProps={getRowProps}
        cellProps={getCellProps}
        tableLayout='auto'
      />
    </EuiFlexItem>
    }>
    </EuiEmptyPrompt>
  );
};

export default SummaryTable;