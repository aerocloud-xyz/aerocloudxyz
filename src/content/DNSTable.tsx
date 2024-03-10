/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
  EuiLoadingSpinner,
} from "@elastic/eui";
import { useNavigate } from "react-router-dom";
type Record = {
id: string;
zone_id: string;
zone_name: string;
name: string;
type: string;
content: string;
proxiable: boolean;
proxied: boolean;
ttl: number;
locked: boolean; 
meta: {
  auto_added: boolean;
  managed_by_apps: boolean;
  managed_by_argo_tunnel: boolean;
}
comment: string;
tags: Array<string>;
created_on: string;
modified_on: string;
};
/* type Note = {
  id: string;
  name: string;
  dateOfCreation: string | undefined;
  email: string;
}; */
var records: Record[] = [];
interface props {}
const DNSTable: React.FC<props> = () => {
  const [isShowingLoadingScreen, setIsShowingLoadingScreen] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    records = [];
    const loadDataIntoTable = () => {
      const userToken = localStorage.getItem("usertoken");
      const formData = new URLSearchParams();
      if (userToken) {
        formData.append("token", userToken);
      } else {
        records = [];
        console.error("User token is missing or invalid.");
      }
      fetch(
        `https://dns.aerocloud.xyz/api/listrecords?token=${userToken}&type=CNAME`,
        {
          method: "GET",
        }
      )
        .then(async (response) => {
          if (response.ok) {
            let recordsArray = [];
            const responseText = await response.text();
            recordsArray = JSON.parse(responseText).records;
            records = [];
            for (let i = 0; i < recordsArray.length; i++) {
              const recordB = recordsArray[i]; // Get the note data from the response
              records.push({
                id: recordB.id,
                zone_id: recordB.zone_id,
                zone_name: recordB.zone_name,
                name: recordB.name,
                type: recordB.type,
                content: recordB.content,
                proxiable: recordB.proxiable,
                proxied: recordB.proxied,
                ttl: recordB.ttl,
                locked: recordB.locked,
                meta: recordB.meta,
                comment: recordB.comment,
                tags: recordB.tags,
                created_on: recordB.created_on,
                modified_on: recordB.modified_on,
              });
            }
            setIsShowingLoadingScreen(false);
          } else {
            //nah
            console.log('nie zesraj sie!!!')
            records = [];
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    loadDataIntoTable();
  });
  const columns: Array<EuiBasicTableColumn<Record>> = [
    {
      field: "name",
      name: "Name",
      "data-test-subj": "nameCell",
    },
    {
      field: "content",
      name: "Content",
      truncateText: true,
    },
    {
      field: "proxied",
      name: "Proxied?"
    },
    {
      field: "ttl",
      name: "TTL",
    },
    {
      field: "comment",
      name: "Comment"
    },
    {
      field: "created_on",
      name: "Created at",
      dataType: "date",
    },
    {
      field: "modified_on",
      name: "Updated at",
      dataType: "date",
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Modify',
          description: 'Modify this record',
          type: 'icon',
          icon: 'copy',
          onClick: (record: Record) => {console.table(records)},
        },
        {
          name: 'Delete',
          description: 'Delete this record',
          type: 'icon',
          icon: 'trash',
          color: 'danger',
          onClick: (record: Record) => {},
        },
      ],
    },
  ];
  const getRowProps = (record: Record) => {
    const { id } = record;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
      onClick: () => {},
    };
  };
  const getCellProps = (
    user: Record,
    column: EuiTableFieldDataColumnType<Record>
  ) => {
    const { id } = user;
    const { field } = column;
    return {
      className: "customCellClass",
      "data-test-subj": `cell-${id}-${String(field)}`,
      textOnly: true,
    };
  };
  return (
    isShowingLoadingScreen ? (
      //loading
    <>
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <EuiLoadingSpinner
        size="xxl"
        style={{ position: "absolute", textAlign: "center" }}
      />
    </div>
  </>
    ):(    <EuiBasicTable
      tableCaption="Users"
      items={records}
      rowHeader="Name"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
      style={{
        width: '95%',
        textAlign: 'center',  
        margin: 'auto',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
    />)

  );
};
export default DNSTable;