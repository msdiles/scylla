import React, { useEffect, useRef, useState } from "react"
import { IFolder, ILink } from "@/types/interfaces"
import { useSelector } from "react-redux"
import { RootState } from "@/state/reducers"

const useSearch = () => {
  const [show, setShow] = useState(false)
  const [searchedLinks, setSearchedLinks] = useState<ILink[] | []>([])
  const [searchedFolders, setSearchedFolders] = useState<IFolder[] | []>([])
  const [searchString, setSearchString] = useState("")
  const { links, folders } = useSelector((state: RootState) => state.bookmark)
  const ref = useRef(null)

  const search = () => {
    setSearchedLinks(
      links.filter((link) =>
        link.name.toLowerCase().match(searchString.toLowerCase())
      )
    )
    setSearchedFolders(
      folders.filter((folder) =>
        folder.name.toLowerCase().match(searchString.toLowerCase())
      )
    )
  }

  const changeSearchString = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  const getLinksName = (folderLinks: string[]) => {
    return folderLinks
      .map((link) => links.find((l) => l._id === link)!.name)
      .join(",")
  }

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      e.preventDefault()
      if (ref.current && ref.current !== e.target) {
        setShow(false)
      }
    }
    document.addEventListener("click", listener)
    return () => document.removeEventListener("click", listener)
  }, [])

  useEffect(() => {
    if (searchString !== "") {
      setShow(true)
      search()
    } else {
      setShow(false)
    }
  }, [searchString])

  return {
    searchString,
    changeSearchString,
    setShow,
    ref,
    show,
    searchedLinks,
    searchedFolders,
    getLinksName,
  }
}

export default useSearch
