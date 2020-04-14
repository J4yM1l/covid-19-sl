import React from "react"
import { getUser } from "../utils/auth"

const Profile = () => {
  const user = getUser();
  const { displayName, email, emailVerified } = user;
  const accessToken = user.stsTokenManager.accessToken; 

  return (
        <div>
        <p className="text-sm text-gray-600 flex items-center mb-4"> Members only</p>
        <h1>Your profile</h1>
        <ul>
          <li>Name: {`${displayName}`}</li>
          <li>E-mail: {`${email}`}</li>
          <li>Email Verified: {`${emailVerified}`}</li>
          <li>Firebase Access Token: {`${accessToken}`}</li>
        </ul>
          
        </div>
  )
}
// const Profile = () => (
//   <>
//     <h1>Your profile</h1>
//     <ul>
//     <li>Name: {getUser().name}</li>
//       <li>E-mail: {getUser().email}</li>
//     </ul>
//   </>
// )

export default Profile