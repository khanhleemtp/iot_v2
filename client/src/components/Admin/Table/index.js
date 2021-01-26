import React, { useMemo, useState, useEffect } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./columns";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { IconContext } from "react-icons";
import styled from "styled-components";

import * as AiIcons from "react-icons/ai";
import { generatePaginationArray } from "./util";
import ApiService from "../../../services/api.service";

const TableStyle = styled.div`
  width: 100%;
  font-size: 14px;
  background: #fff;
  border-radius: 8px;
  /* padding: 0 24px 10.5px; */
  color: rgb(74, 86, 119);
  overflow: auto;
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #f884dc;
    border-radius: 10px;
  }
  table {
    overflow: auto;
    margin-top: 1rem;
    width: 100%;
    border-spacing: 0;
    tr {
      :last-child {
        td {
          border-bottom: 0;
          cursor: pointer;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      color: rgb(74, 86, 119);
      padding-top: 16px;
      padding-bottom: 16px;
      vertical-align: top;
      border-top: 1px solid #e4e6ef;
      text-overflow: ellipsis;
      font-weight: 600;
    }
    .table__th {
      align-content: center;
      white-space: nowrap;
      color: rgb(181, 181, 195);
      font-weight: 600;
      font-style: normal;
      text-transform: uppercase;
      vertical-align: bottom;
      padding-top: 1rem;
      padding-bottom: 1rem;
      cursor: pointer;
      .table__th__icon {
        &__arrow-up {
          opacity: 0;
        }
        &__arrow-control {
        }
      }

      &:hover {
        color: rgb(11, 124, 255);
        .table__th__icon {
          &__arrow-up {
            opacity: 1;
          }
        }
      }

      &-active {
        color: rgb(11, 124, 255);
        .table__th__icon {
          &__arrow-up {
          }
          &__arrow-control {
          }
        }
      }
    }
  }
`;

const PaginationStyle = styled.div`
  padding: 7px 0;
  .pagination {
    &__container {
      outline: none;
      font-family: Inter;
      display: flex;
    }
    &__btn__container {
      display: flex;
      align-items: center;
    }
    &__btn {
      font-size: 14px;
      border: none;
      line-height: 1.3;
      margin: 4px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 14px;
      font-size: 12px;
      background: #f3f6f9;
      color: #7e8289;
      cursor: pointer;
      outline: none;
      font-size: 13px;
      font-family: "Inter";
      &:hover {
        background: #e4e6ef;
      }
      &:disabled {
        &:hover {
          background: #f3f6f9;
          cursor: not-allowed;
        }
      }
      &-active {
        color: #fff;
        background-color: rgb(61, 156, 252);
        &:hover {
          background-color: rgb(61, 156, 252);
          color: #fff;
        }
      }
    }
  }
`;

export const Table = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState("");
  const [descOrder, setDescOrder] = useState(false);
  useEffect(() => {
    ApiService.setHeader();
    ApiService.post("/admin/session", {
      index: pageIndex - 1
    })
      .then(res => {
        setDataFromServer(res.data.sessions);
        setMaxPage(res.data.maxPage);
      })
      .catch(error => console.log(error));
    return () => {};
  }, [pageIndex]);

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => dataFromServer, [dataFromServer]);
  const tableInstance = useTable({
    columns,
    data
  });
  const renderArrayOrders = column => {
    console.log(column);
    setActiveOrder(column.Header);
    setDescOrder(!descOrder);
    setOrders(prevOrders => {
      // remove
      if (prevOrders.length > 0) {
        // field field
        const columnOrder = prevOrders.find(order => order.field === column.Header);

        console.log("columnOrder", columnOrder);
        if (columnOrder) {
          return [
            { ...columnOrder, method: !columnOrder.method },
            ...prevOrders.filter(order => order.field !== column.Header)
          ];
        }
        return [{ field: column.Header, method: false }, ...prevOrders];
      }
      return [{ field: column.Header, method: false }];
      // add
    });
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  const paginationArray = generatePaginationArray(pageIndex, maxPage);

  return (
    <IconContext.Provider value={{ size: "16px" }}>
      <TableStyle>
        {dataFromServer ? (
          <table {...getTableProps()}>
            <thead>
              {
                // access headers return th
                headerGroups.map(headerGroups => (
                  <tr {...headerGroups.getHeaderGroupProps()}>
                    {headerGroups.headers.map(column => {
                      return (
                        <th
                          {...column.getHeaderProps()}
                          onClick={() => renderArrayOrders(column)}
                          className={`table__th ${activeOrder === column.Header ? `table__th-active` : ``}`}
                        >
                          {column.render("Header")}
                          <span className="table__th__icon">
                            {activeOrder === column.Header ? (
                              <span className="table__th__icon__arrow-control">
                                {activeOrder === column.Header && descOrder ? (
                                  <AiOutlineArrowUp />
                                ) : (
                                  <AiOutlineArrowDown />
                                )}
                              </span>
                            ) : (
                              <span className="table__th__icon__arrow-up">
                                <AiOutlineArrowUp />
                              </span>
                            )}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                ))
              }
            </thead>
            <tbody {...getTableBodyProps()}>
              {
                // access row return cell
                rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        ) : (
          <div>Loading...</div>
        )}
      </TableStyle>
      <PaginationStyle>
        <div className="pagination__container">
          <div className="pagination__btn__container">
            <button className="pagination__btn" disabled={pageIndex === 1} onClick={() => setPageIndex(1)}>
              <AiIcons.AiOutlineDoubleLeft />
            </button>
            <button
              className="pagination__btn"
              onClick={() => {
                console.log("right_next", pageIndex);
                setPageIndex(prevPage => (prevPage === 1 ? 1 : prevPage - 1));
              }}
              disabled={pageIndex === 1}
            >
              <AiIcons.AiOutlineLeft />
            </button>
            {paginationArray.map((item, index) => (
              <button
                className={`pagination__btn ${parseInt(item) === pageIndex ? `pagination__btn-active` : ``}`}
                key={index}
                disabled={item === "..."}
                onClick={() => setPageIndex(item)}
              >
                {item}
              </button>
            ))}

            <button
              className="pagination__btn"
              disabled={pageIndex === maxPage}
              onClick={() => {
                console.log("right_next", pageIndex);
                setPageIndex(pageIndex + 1);
              }}
            >
              <AiIcons.AiOutlineRight />
            </button>
            <button disabled={pageIndex === maxPage} className="pagination__btn" onClick={() => setPageIndex(maxPage)}>
              <AiIcons.AiOutlineDoubleRight />
            </button>
          </div>
        </div>
      </PaginationStyle>
    </IconContext.Provider>
  );
};
