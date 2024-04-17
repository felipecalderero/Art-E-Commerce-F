import { createContext, useState } from "react";

export const UserContext = createContext();
const API_URL = "http://localhost:4000";

const UserProviderWrapper = (props) => {
  const [userDetails, setUserDetails] = useState({});

  const updateUserDetails = async (payload) => {
    try {
      const response = await fetch(`${API_URL}/users/${userDetails.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const responseData = await response.json();
        setUserDetails(responseData);
        console.log("User data updated sucessfully");
      } else {
        throw new Error(response);
      }
    } catch (error) {
      console.log("Error while updating data: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails, updateUserDetails }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProviderWrapper;
