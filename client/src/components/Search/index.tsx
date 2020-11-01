import React, { useContext } from "react"
import { Input } from "semantic-ui-react"
import { IFolder, ILink } from "@/types/interfaces"
import List from "semantic-ui-react/dist/commonjs/elements/List"
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider"
import useSearch from "@/components/Search/useSearch"
import "./search.scss"
import { AppContext } from "@/components/AppContext"

const Search = () => {
  const {
    searchedFolders,
    changeSearchString,
    ref,
    setShow,
    searchedLinks,
    searchString,
    getLinksName,
    show,
  } = useSearch()
  const { expand } = useContext(AppContext)

  return (
    <>
      <Input
        icon={{ name: "search", circular: true, link: true }}
        placeholder="Search..."
        fluid
        className="home__search"
        value={searchString}
        onChange={(e) => changeSearchString(e)}
        input={{
          onClick: () => {
            setShow(true)
          },
          ref: ref,
        }}
      />
      {show && (
        <List divided relaxed className="search-result">
          {(searchedLinks as ILink[]).map((link) => (
            <List.Item
              key={link._id}
              className="search__list-item"
              onClick={() => expand("link", link._id)}
            >
              <List.Icon name="bookmark" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">{link.name}</List.Header>
                <List.Description as="a">{link.url}</List.Description>
              </List.Content>
            </List.Item>
          ))}
          {(searchedFolders as IFolder[]).map((folder) => (
            <List.Item
              key={folder._id}
              className="search__list-item"
              onClick={() => expand("folder", folder._id)}
            >
              <List.Icon name="folder" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a">{folder.name}</List.Header>
                <List.Description as="a">
                  {getLinksName(folder.links)}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
          <Divider className="search-divider" />
        </List>
      )}
    </>
  )
}

export default Search
