/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
  EuiLoadingSpinner,
} from "@elastic/eui";
import { useNavigate } from "react-router-dom";
type Note = {
  id: string;
  title: string;
  owner: string;
  isPublic: string;
  isShort: string;
  size: string;
  url: string;
  createdDate: string;
  updatedDate: string;
};
/* type Note = {
  id: string;
  name: string;
  dateOfCreation: string | undefined;
  email: string;
}; */
var notes: Note[] = [];
export default () => {
  const [isShowingLoadingScreen, setIsShowingLoadingScreen] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    notes = [];
    const loadDataIntoTable = () => {
      const userToken = localStorage.getItem("usertoken");
      const formData = new URLSearchParams();
      if (userToken) {
        formData.append("token", userToken);
      } else {
        notes = [];
        console.error("User token is missing or invalid.");
      }
      fetch(
        `https://notes.aerocloud.xyz/api/getusersmsg?token=${userToken}`,
        {
          method: "GET",
        }
      )
        .then(async (response) => {
          if (response.ok) {
            let notesArray = [];
            const responseText = await response.text();
            notesArray = JSON.parse(responseText);
            notes = [];
            for (let i = 0; i < notesArray.length; i++) {
              const noteB = notesArray[i]; // Get the note data from the response
              notes.push({
                id: noteB.id,
                size: noteB.content.size,
                owner: noteB.owner,
                title: noteB.id,
                url: noteB.content.url,
                createdDate: noteB.xata.createdAt,
                updatedDate: noteB.xata.updatedAt,
                isPublic: "false",
                isShort: "false",
              });
            }
            setIsShowingLoadingScreen(false);
          } else {
            //nah
            console.log('nie zesraj sie!!!')
            notes = [];
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    loadDataIntoTable();
  });
  const columns: Array<EuiBasicTableColumn<Note>> = [
    {
      field: "title",
      name: "Name",
      "data-test-subj": "nameCell",
    },
    {
      field: "createdDate",
      name: "Created at",
      dataType: "date",
    },
    {
      field: "updatedDate",
      name: "Updated at",
      dataType: "date",
    },
    {
      field: "size",
      name: "Size"
    },
    {
      name: 'Actions',
      actions: [
        {
          name: 'Edit',
          description: 'Edit this note',
          type: 'icon',
          icon: 'copy',
          onClick: (note: Note) => {
            navigate(`/aeronote/edit/${note.id}`)
          },
        },
        {
          name: 'Delete',
          description: 'Delete this note',
          type: 'icon',
          icon: 'trash',
          color: 'danger',
          onClick: () => {},
        },
      ],
    },
  ];
  const getRowProps = (user: Note) => {
    const { id } = user;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
      onClick: () => {},
    };
  };
  const getCellProps = (
    user: Note,
    column: EuiTableFieldDataColumnType<Note>
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
      items={notes}
      rowHeader="Name"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />)

  );
};
