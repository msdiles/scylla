import React from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/state/reducers"
import "./profile.scss"
import { Button } from "semantic-ui-react"
import { useHistory } from "react-router-dom"

const Profile = () => {
  const { userEmail, userName, userRole } = useSelector(
    (state: RootState) => state.auth
  )
  const history = useHistory()
  return (
    <div className="profile">
      <h2 className="profile__title">Profile</h2>
      <div className="profile__info">
        <p className="profile__data">Username: {userName}</p>
        <p className="profile__data">Email: {userEmail}</p>
        <p className="profile__data">Roles: {userRole.join(", ")}</p>
        <Button primary onClick={() => history.push("/reset")}>
          Change Password
        </Button>
      </div>

      <Button
        circular
        icon="arrow left"
        className="profile__back-button"
        onClick={() => history.push("/home")}
      />
    </div>
  )
}

export default Profile
