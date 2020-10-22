import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { addFolderRequested } from "@/state/actions/bookmark.actions"
import { RootState } from "@/state/reducers"

const FolderList = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.auth.userId)
  return (
    <div className="folder-list">
      <button
        onClick={() =>
          dispatch(
            addFolderRequested({
              data: {
                userId,
                date: Date.now().toString(),
                name: "Folder4",
                parent: "",
                links: [],
                color: "",
                favorite: false,
              },
            })
          )
        }
      />
    </div>
  )
}

export default FolderList
