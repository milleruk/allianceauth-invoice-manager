import React from "react";
import { Button, Panel, Glyphicon, ButtonGroup } from "react-bootstrap";

import { useQuery } from "react-query";
import { loadUnpaid } from "../apis/Invoices";
import { BaseTable, textColumnFilter } from "./BaseTable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Bars } from "@agney/react-loading";

const InvUnpaid = () => {
  const { isLoading, isFetching, error, data } = useQuery(
    "unpaid",
    () => loadUnpaid(),
    {
      initialData: [],
    }
  );

  function getRowProps(row) {
    console.log(row.values);
    if (row.values.paid === true) {
      return {
        className: "info",
      };
    } else {
      let now = new Date();
      let comp = new Date(row.values.due_date);
      if (comp < now) {
        return {
          className: "danger",
        };
      }
    }
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Character",
        accessor: "character.character_name",
        Filter: textColumnFilter,
        filter: "text",
      },
      {
        Header: "Due Date",
        accessor: "due_date",
        Cell: (props) => (
          <div style={{ whiteSpace: "nowrap" }}>
            {" "}
            {new Date(props.value).toLocaleString()}{" "}
          </div>
        ),
      },
      {
        Header: "Invoice Reference",
        accessor: "invoice_ref",
        Filter: textColumnFilter,
        filter: "text",
        Cell: (props) => (
          <>
            <CopyToClipboard text={props.value} className="text-center">
              <ButtonGroup bsClass="btn-group special">
                <Button disabled={props.row.values.paid}>
                  {props.value.toLocaleString()}
                </Button>
                <Button
                  disabled={props.row.values.paid}
                  bsClass="btn no-grow btn-warning"
                >
                  <Glyphicon glyph="copy" />
                </Button>
              </ButtonGroup>
            </CopyToClipboard>
          </>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <>
            <CopyToClipboard text={props.value} className="text-center">
              <ButtonGroup bsClass="btn-group special">
                <Button disabled={props.row.values.paid}>
                  {props.value.toLocaleString()}
                </Button>
                <Button
                  disabled={props.row.values.paid}
                  bsClass="btn no-grow btn-warning"
                >
                  <Glyphicon glyph="copy" />
                </Button>
              </ButtonGroup>
            </CopyToClipboard>
          </>
        ),
      },
      {
        Header: "",
        width: 0,
        accessor: "paid",
        Cell: (props) =>
          !props.value ? (
            <></>
          ) : (
            //<Button bsClass="btn btn-danger">
            //  <Glyphicon glyph="remove" />
            //</Button>
            <></>

            //<Button bsClass="btn btn-info">
            // <Glyphicon glyph="ok" />
            //</Button>
          ),
      },

      {
        Header: "Details",
        accessor: "note",
      },
    ],
    []
  );
  const defaultSort = [
    {
      id: "due_date",
      desc: false,
    },
  ];

  return (
    <Panel>
      <Panel.Heading>Your Contributions</Panel.Heading>
      <Panel.Body>
        {!isLoading ? (
          <BaseTable
            {...{
              isLoading,
              data,
              columns,
              error,
              getRowProps,
              isFetching,
              defaultSort,
            }}
          />
        ) : (
          <p className="text-center">
            <Bars
              style={{ margin: "200px", height: "24px" }}
              className="spinner-size"
            />
          </p>
        )}
      </Panel.Body>
    </Panel>
  );
};

export default InvUnpaid;
