/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
  EuiLoadingSpinner,
} from "@elastic/eui";
import { API } from '../constants';
type User = {
  id: string;
  name: string;
  dateOfCreation: string | undefined;
  email: string;
};
var users: User[] = [];
export default () => {
  const [isShowingLoadingScreen, setIsShowingLoadingScreen] = useState(true);
  useEffect(() => {
    users = [];
    const loadDataIntoTable = () => {
      const userToken = localStorage.getItem("usertoken");
      const formData = new URLSearchParams();
      if (userToken) {
        formData.append("token", userToken);
      } else {
        users = [];
        console.error("User token is missing or invalid.");
      }
      fetch(`${API}/getUsers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      })
        .then(async (response) => {
          if (response.ok) {
            const responseText = await response.text();
            const userArray = JSON.parse(responseText).data;
            //console.log(userArray);
            users = [];
            for (let i = 0; i < userArray.length; i++) {
              const user = userArray[i]; // Get the user data from the response
              users.push({
                id: user.id,
                email: user.email,
                name: user.name,
                dateOfCreation: "test",
              });
            }
            setIsShowingLoadingScreen(false);
          } else {
            //nah
            console.log('nie zesraj sie!!!')
            users = [];
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    loadDataIntoTable();
  });
  const columns: Array<EuiBasicTableColumn<User>> = [
    {
      field: "name",
      name: "Name",
      "data-test-subj": "nameCell",
      mobileOptions: {
        render: (user: User) => <span>{user.name}</span>,
        header: false,
        truncateText: false,
        enlarge: true,
        width: "100%",
      },
    },
    {
      field: "dateOfCreation",
      name: "Date of Creation",
    },
    {
      field: "email",
      name: "Email",
      render: (email: User["email"]) => email,
    },
  ];
  const getRowProps = (user: User) => {
    const { id } = user;
    return {
      "data-test-subj": `row-${id}`,
      className: "customRowClass",
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
      items={users}
      rowHeader="Name"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />)

  );
};
