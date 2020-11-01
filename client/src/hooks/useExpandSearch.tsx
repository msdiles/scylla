import React, { useState } from "react"

type Target = "link" | "folder"

const useExpandSearch = () => {
  const [expandFolder, setExpandFolder] = useState("")
  const [expandLink, setExpandLink] = useState("")

  const expand = (target: Target, id: string) => {
    if (target === "link") {
      setExpandLink(id)
      setTimeout(() => {
        setExpandLink("")
      }, 0)
    } else if (target === "folder") {
      setExpandFolder(id)
      setTimeout(() => {
        setExpandFolder("")
      }, 0)
    }
  }

  return { expandFolder, expandLink, expand }
}

export default useExpandSearch
