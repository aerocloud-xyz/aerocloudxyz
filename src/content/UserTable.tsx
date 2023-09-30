/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from "react";
import {
  formatDate,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiTableFieldDataColumnType,
  EuiLink,
  EuiHealth,
} from "@elastic/eui";
import { API } from '../constants';
type User = {
  id: string;
  name: string;
  dateOfCreation: string | undefined;
  email: string;
};
const users: User[] = [];
const loadDataIntoTable = () => {
  const userToken = localStorage.getItem("usertoken");
  const formData = new URLSearchParams();
  if (userToken) {
    formData.append("token", userToken);
  } else {
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

        for (let i = 0; i < userArray.length; i++) {
          const user = userArray[i]; // Get the user data from the response
          users.push({
            id: user.id,
            email: user.email,
            name: user.name,
            dateOfCreation: "test",
          });
        }
        console.log(users);
      } else {
        //nah
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
loadDataIntoTable();
export default () => {
  useEffect(() => {
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
      dataType: "date",
      render: (dateOfCreation: User["dateOfCreation"]) =>
        formatDate(dateOfCreation, "dobLong"),
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
    <EuiBasicTable
      tableCaption="Users"
      items={users}
      rowHeader="Name"
      columns={columns}
      rowProps={getRowProps}
      cellProps={getCellProps}
    />
  );
};
