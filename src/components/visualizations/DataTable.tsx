import { FunctionComponent } from "react";
import { faker } from '@faker-js/faker';
import { EuiBasicTable, EuiBasicTableColumn, EuiFlexItem, EuiTableFieldDataColumnType } from "@elastic/eui";

type User = {
    id: number;
  Sip: string;
  Dip: string;
  Sport: number;
  Dport: number;
  proto: string;
  dname: string;
  dsuffix: string;
  dword: string;
  timestamp:string;
};

const users: User[] = [];

for (let i = 0; i < 6; i++) {
  users.push({
    id: i,
      Sip: faker.internet.ipv4(),
      Dip: faker.internet.ipv4(),
      Sport: faker.internet.port(),
      Dport: faker.internet.port(),
      proto: faker.internet.protocol(),
      dname: faker.internet.domainName(),
      dsuffix: faker.internet.domainSuffix(),
      dword: faker.internet.domainWord(),
      timestamp: faker.date.anytime().toString()
  });
}
const DataTable: FunctionComponent = () => {
    const columns: Array<EuiBasicTableColumn<User>> = [
        {
          field: 'Sip',
          name: 'Source IP',
        },
        {
            field: 'Dip',
            name: 'Dest IP',
        },
        {
          field: 'Sport',
          name: 'Source Port',
        },
        {
            field: 'Dport',
            name: 'Dest Port',
          },
        {
            field: 'proto',
            name: 'Protocol',
        },
        {
            field: 'dname',
            name: 'Domain Name',
        },
        {
            field: 'dsuffix',
            name: 'Domain Suffix',
        },
        {
            field: 'dword',
            name: 'Domain Word',
        },
        {
          field: 'timestamp',
          name: 'TimeStamp',
        },
      ];
    
      const getRowProps = (user: User) => {
        const { id } = user;
        return {
          'data-test-subj': `row-${id}`,
          className: 'customRowClass',
          onClick: () => {},
        };
      };
    
      const getCellProps = (
        user: User,
        column: EuiTableFieldDataColumnType<User>
      ) => {
        const { id } = user;
        const { field } = column;
        return {
          className: 'customCellClass',
          'data-test-subj': `cell-${id}-${String(field)}`,
          textOnly: true,
        };
      };
    
      return (
        <EuiFlexItem grow = {false}>
          <EuiBasicTable
            tableCaption="Demo of EuiBasicTable"
            items={users}
            rowHeader="firstName"
            columns={columns}
            rowProps={getRowProps}
            cellProps={getCellProps}
            width={"30%"}
          />
        </EuiFlexItem>
      );
};
export default DataTable;