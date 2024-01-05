/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { AUTH_API, AERONOTE_API } from "../constants";
import {
  Comparators,
  Criteria,
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner,
  EuiMarkdownEditor,
  EuiSpacer,
  EuiSwitch,
  EuiTableSelectionType,
  EuiTableSortingType,
} from "@elastic/eui";
interface AeroNoteProps {
  isLoggedIn: boolean;
}

const AeroNote: React.FC<AeroNoteProps> = ({ isLoggedIn }) => {
  type Note = {
    id: string;
    dateCreated: string;
    dateUpdated: string;
    owner: string;
    title: string;
    isPublic: boolean;
  };

  const initialContent = `
  # Start writing your note here.
  `;

  const [customHeader, setCustomHeader] = useState(true);
  const [isResponsive, setIsResponsive] = useState(true);
  const [editorContent, setEditorContent] = useState(initialContent);
  const [isDisplayingLoadingScreen, setIsDisplayingLoadingScreen] =
    useState(true);
  const [isDisplayingNoteList, setIsDisplayingNoteList] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  /*
   * Columns
   */
  const columns: Array<EuiBasicTableColumn<Note>> = [
    {
      field: "title",
      name: "Title",
      truncateText: true,
      sortable: true,
      /*mobileOptions: {
        render: customHeader
          ? (user: User) => (
              <span>
                {user.firstName} {user.lastName}
              </span>
            )
          : undefined,
        header: customHeader ? false : true,
        width: customHeader ? '100%' : undefined,
        enlarge: customHeader ? true : false,
        truncateText: customHeader ? false : true,
      }, */
    },
    {
      field: "owner",
      name: "Owner",
      truncateText: true,
    },
    {
      field: "dateCreated",
      name: "Date Created",
      truncateText: true,
    },
    {
      field: "dateUpdated",
      name: "Date Updated",
      truncateText: true,
    },
    {
      field: "isPublic",
      name: "Public?",
      truncateText: true,
    },
    {
      name: "Actions",
      actions: [
        {
          name: "Edit",
          description: "Edit this note",
          icon: "copy",
          type: "icon",
          onClick: (note: Note) => {},
        },
      ],
    },
  ];
  /**
   * Selection
   */
  const [, setSelectedItems] = useState<Note[]>([]);

  const onSelectionChange = (selectedItems: Note[]) => {
    setSelectedItems(selectedItems);
  };

  const selection: EuiTableSelectionType<Note> = {
    selectable: (note: Note) => note.isPublic,
    selectableMessage: (selectable: boolean) =>
      !selectable ? "Message is public" : "Message is private",
    onSelectionChange,
  };
  /**
   * Pagination & sorting
   */
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortField, setSortField] = useState<keyof Note>("title");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const onTableChange = ({ page, sort }: Criteria<Note>) => {
    if (page) {
      const { index: pageIndex, size: pageSize } = page;
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    }
    if (sort) {
      const { field: sortField, direction: sortDirection } = sort;
      setSortField(sortField);
      setSortDirection(sortDirection);
    }
  };

  // Manually handle sorting and pagination of data
  const findUsers = (
    users: Note[],
    pageIndex: number,
    pageSize: number,
    sortField: keyof Note,
    sortDirection: "asc" | "desc"
  ) => {
    let items;

    if (sortField) {
      items = users
        .slice(0)
        .sort(
          Comparators.property(sortField, Comparators.default(sortDirection))
        );
    } else {
      items = notes;
    }

    let pageOfItems;

    if (!pageIndex && !pageSize) {
      pageOfItems = items;
    } else {
      const startIndex = pageIndex * pageSize;
      pageOfItems = items.slice(
        startIndex,
        Math.min(startIndex + pageSize, notes.length)
      );
    }

    return {
      pageOfItems,
      totalItemCount: notes.length,
    };
  };

  const { pageOfItems, totalItemCount } = findUsers(
    notes,
    pageIndex,
    pageSize,
    sortField,
    sortDirection
  );

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: [3, 5, 8],
  };

  const sorting: EuiTableSortingType<Note> = {
    sort: {
      field: sortField,
      direction: sortDirection,
    },
  };

  const handleSwitchToEditor = () => {
    if (isDisplayingNoteList) {
      setIsDisplayingNoteList(false);
    } else {
      setIsDisplayingNoteList(true);
    }
  };
  useEffect(() => {
    //verify if the user token is good by querying the authentication server
    const verifyToken = async () => {
      const userToken = localStorage.getItem("usertoken");
      const authRequestData = new URLSearchParams();
      if (userToken !== null) {
        authRequestData.append("token", userToken);
      }
      //Get user data from auth server with the JWT token
      const tokenResponse = await fetch(AUTH_API + "/verifytoken", {
        method: "POST",
        body: authRequestData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (tokenResponse.ok) {
        console.log("user authenticated.");
      } else {
      }
    };
    //ok bruv now i need to code up an API
    verifyToken();
    //load up into the memory the user's notes.
    const loadNotesIntoTable = async () => {
      const userToken = localStorage.getItem("usertoken");
      if (userToken !== null) {
        const getNotes = await fetch(
          `https://notes.aerocloud.xyz/api/getusersmsg?token=${userToken}`,
          {
            method: "GET",
          }
        );
        if (getNotes.ok) {
          type NoteXataResponse = {
            content: {
              name: string;
              mediaType: string;
              enablePublicUrl: boolean;
              signedUrlTimeout: number;
              uploadUrlTimeout: number;
              size: number;
              version: number;
              url: string;
            } | null;
            id: string;
            isPublic: boolean;
            isShort: boolean;
            owner: string;
            title: string | null;
            xata: {
              createdAt: string;
              updatedAt: string;
              version: number;
            };
          };
          const jsonResp = await getNotes.json();
          setNotes(
            jsonResp.map((note: NoteXataResponse) => ({
              id: note.id,
              dateCreated: note.xata.createdAt,
              dateUpdated: note.xata.updatedAt,
              owner: note.owner,
              title: note.title,
              isPublic: note.isPublic,
            }))
          );
          setIsDisplayingLoadingScreen(false);
        } else {
          console.error("error");
        }
      }
    };
    loadNotesIntoTable();
  }, []);
  return (
    <>
      {isDisplayingLoadingScreen ? (
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
        <>
          {isDisplayingNoteList ? (
            <>
              <>
                <EuiBasicTable
                  tableCaption="Demo for responsive EuiBasicTable with mobile options"
                  items={pageOfItems}
                  itemId="id"
                  columns={columns}
                  pagination={pagination}
                  sorting={sorting}
                  selection={selection}
                  isSelectable={true}
                  hasActions={true}
                  responsive={isResponsive}
                  onChange={onTableChange}
                  style={{ margin: "15px" }}
                />
              </>
            </>
          ) : (
            <>
              {" "}
              <EuiMarkdownEditor
                aria-label="User description editor"
                placeholder="Input your user description here..."
                initialViewMode="viewing"
                value={editorContent}
                onChange={setEditorContent}
                height={400}
                maxHeight={1000}
                style={{ margin: "15px" }}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default AeroNote;
