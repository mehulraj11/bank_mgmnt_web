import React from "react";
import { useUser } from "../context/UserContext";

function Profile() {
  const { user } = useUser();
  console.log(user);

  return <div>Profile</div>;
}

export default Profile;
