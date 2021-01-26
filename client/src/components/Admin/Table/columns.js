// step 1: define MOCK_DATA
// step 2: define label in col in data table
// accessor: col can access

// format date

import moment from "moment";

export const COLUMNS = [
  {
    Header: "name",
    accessor: "name"
  },
  {
    Header: "positon",
    accessor: "position"
  },
  {
    Header: "plate",
    accessor: "plate"
  },
  {
    Header: "carType",
    accessor: "carType"
  },
  {
    Header: "checkIn",
    accessor: "checkIn",
    Cell: ({ value }) => {
      return moment(value).format("LLL");
    }

    // Filter: ColumnFilter,
  },
  {
    Header: "checkOut",
    accessor: "checkOut",
    Cell: ({ value }) => {
      return moment(value).format("LLL");
    }
  }
];
