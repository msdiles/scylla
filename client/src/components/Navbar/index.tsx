import React from "react"
import "./navbar.scss"
import { Dropdown } from "semantic-ui-react"
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon"
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutRequested } from "@/state/actions/auth.actions"

const Navbar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  return (
    <div className="navbar">
      <Dropdown trigger={<Icon name="user" size="big" />} icon={null}>
        <Dropdown.Menu direction="left">
          <Dropdown.Item onClick={() => history.push("/profile")}>
            <Icon name="user" />
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(logoutRequested())}>
            <Icon name="sign-out" />
            Sign out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Divider className="navbar__profile" />
    </div>
  )
}

export default Navbar
