/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
  EuiLoadingSpinner,
} from "@elastic/eui";
type NoteInTable = {
  id: string;
  title: string;
  owner: string;
  isPublic: string;
  isShort: string;
  url: string;
  createdDate: string;
  updatedDate: string;
};

type NoteObject = {
  content: {
    name: string;
    mediaType: string;
    enablePublicUrl: boolean;
    signedUrlTimeout: number;
    uploadUrlTimeout: number;
    size: number;
    version: number;
    url: string;
  };
  id: string;
  isPublic: boolean;
  isShort: boolean;
  owner: string;
  xata: {
    createdAt: string;
    updatedAt: string;
    version: number;
  };
};
var notes: NoteInTable[] = [];
const NotesTable = () => {
  const [isShowingLoadingScreen, setIsShowingLoadingScreen] = useState(true);
  useEffect(() => {
    notes = [];
    const loadDataIntoTable = () => {
      const userToken = localStorage.getItem("usertoken");
      if (userToken) {
        fetch(
          `https://notes.aerocloud.xyz/api/getusersmsg?token=${userToken}`,
          {
            method: "GET",
          }
        )
          .then(async (response) => {
            if (response.ok) {
              const responseText = await response.text();
              const noteArray: NoteObject[] = JSON.parse(responseText);
              //console.log(userArray);
              notes = [];
              for (let i = 0; i < noteArray.length; i++) {
                const note = noteArray[i]; // Get the user data from the response
                notes.push({
                  id: note.id,
                  owner: note.owner,
                  title: note.id,
                  url: note.content.url,
                  createdDate: note.xata.createdAt,
                  updatedDate: note.xata.updatedAt,
                  isPublic: "false",
                  isShort: "false",
                });
              }
              setIsShowingLoadingScreen(false);
            } else {
              //nah
              console.log("nie zesraj sie!!!");
              notes = [];
            }
          })
          .catch((error) => {
            console.error(
              "There was a problem with the fetch operation:",
              error
            );
          });
      } else {
        notes = [];
        console.error("User token is missing or invalid.");
      }
    };
    loadDataIntoTable();
  }, []);
  const columns: Array<EuiBasicTableColumn<NoteInTable>> = [
    {
      field: "owner",
      name: "Owner",
      "data-test-subj": "nameCell",
      mobileOptions: {
        render: (note: NoteInTable) => <span>{note.owner}</span>,
        header: false,
        truncateText: false,
        enlarge: true,
        width: "100%",
      },
    },
    {
      field: "title",
      name: "Title",
      // render: (title: NoteInTable["title"]) => title,
    },
    {
      field: "createdDate",
      name: "Date of Creation",
      // render: (note: NoteInTable) => <span>{note.createdDate}</span>,
    },
    {
      field: "updatedDate",
      name: "Date of Update",
      // render: (note: NoteInTable) => <span>{note.updatedDate}</span>,
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Edit',
          description: 'Edit this note',
          type: 'icon',
          icon: 'copy',
          onClick: (note: NoteInTable) => {console.log(note)},
        },
      ],
    },
  ];
  const getRowProps = (note: NoteInTable) => {
    const { id } = note;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
      onClick: () => {},
    };
  };
  const getCellProps = (
    note: NoteInTable,
    column: EuiTableFieldDataColumnType<NoteInTable>
  ) => {
    const { id } = note;
    const { field } = column;
    return {
      className: "customCellClass",
      "data-test-subj": `cell-${id}-${String(field)}`,
      textOnly: true,
    };
  };
  return isShowingLoadingScreen ? (
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
  ) : (
    <EuiBasicTable
      tableCaption="Notes"
      items={notes}
      rowHeader="Owner"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
      hasActions={true}
      style={{
        marginTop: "50px",
        marginLeft: "25px",
        marginRight: "25px",
      }}
    />
  );
};
export default NotesTable;
