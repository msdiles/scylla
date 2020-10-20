import { Bookmark } from "../models/Bookmark"
import { IFolder } from "../../client/src/types/interfaces"

class BookmarkController {
  static async createCollectionsIfNotExist(userId: string) {
    try {
      const isExist = await Bookmark.countDocuments({ userId })
      if (isExist) {
        return
      } else {
        await Bookmark.create({ userId, links: [], folders: [] })
        return
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}

export default BookmarkController
