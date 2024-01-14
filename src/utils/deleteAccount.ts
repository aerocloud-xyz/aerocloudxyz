import { AUTH_API } from "../constants";

const handleDeletion = async () => {
    const token: string | null = localStorage.getItem("usertoken");
    if (token !== null) {
      const urlencoded = new URLSearchParams();
      urlencoded.append("token", token);
      try {
        const response = await fetch(AUTH_API + "/deleteUser", {
          method: "DELETE",
          body: urlencoded,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        if (response.ok) {
          console.log("Logging out & deleting");
          localStorage.clear();
        } else {
          console.log("Deletion failed!");
        }
      } catch (error) {
        console.log("Deletion failed");
      }
    }
  };
export default handleDeletion;