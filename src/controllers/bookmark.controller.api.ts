import { NextFunction, Request, Response } from "express"
import { Bookmark, Folder, Link } from "../models/Bookmark"

class BookmarkControllerApi {
  static async addLink(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body.data
      const newLink = await Link.create(data)
      await (newLink.folders as any).map(
        async (f: string) =>
          await Folder.findByIdAndUpdate(f, { $push: { links: newLink._id } })
      )
      await Bookmark.findOneAndUpdate(
        { userId: data.userId },
        {
          $push: { links: newLink._id },
        }
      )
      if (newLink) {
        res.status(200).send({ success: true, target: newLink })
        return
      } else {
        res.status(500).send({ success: false })
      }
    } catch (e) {
      next(e)
    }
  }

  static async changeLink(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { target } = req.body.data
      await Link.findByIdAndUpdate(target._id, { ...target })
      res.status(200).send({ success: true, target: { ...target } })
    } catch (e) {
      next(e)
    }
  }

  static async deleteLink(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { target } = req.body.data
      await Link.findByIdAndDelete(target._id)
      await (target.folders as any).map(
        async (f: string) =>
          await Folder.findByIdAndUpdate(f, { $pull: { links: target._id } })
      )
      await Bookmark.findOneAndUpdate(
        { userId: target.userId },
        {
          $pull: { links: target._id },
        }
      )
      res.status(200).send({ success: true, target: { ...target } })
    } catch (e) {
      next(e)
    }
  }

  static async addLinkToFolder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { link, folder } = req.body.data
      await Link.findByIdAndUpdate(link, { $push: { folders: folder } })
      await Folder.findByIdAndUpdate(folder, { $push: { links: link } })

      res.status(200).send({ success: true, target: { link, folder } })
    } catch (e) {
      next(e)
    }
  }

  static async removeLinkFromFolder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { link, folder } = req.body.data
      await Link.findByIdAndUpdate(link, { $pull: { folders: folder } })
      await Folder.findByIdAndUpdate(folder, { $pull: { links: link } })

      res.status(200).send({ success: true, target: { link, folder } })
    } catch (e) {
      next(e)
    }
  }

  static async sequenceLink(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId, links } = req.body.data
      await Bookmark.findOneAndUpdate(
        { userId: userId },
        {
          links,
        }
      )
      res.status(200).send({ success: true, target: links })
    } catch (e) {
      next(e)
    }
  }

  static async addFolder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body.data
      const newFolder = await Folder.create(data)
      await Bookmark.findOneAndUpdate(
        { userId: data.userId },
        {
          $push: { folders: newFolder._id },
        }
      )
      if (newFolder) {
        res.status(200).send({ success: true, target: newFolder })
        return
      } else {
        res.status(500).send({ success: false })
      }
    } catch (e) {
      next(e)
    }
  }

  static async changeFolder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { target } = req.body.data
      await Folder.findByIdAndUpdate(target._id, { ...target })
      res.status(200).send({ success: true, target: { ...target } })
    } catch (e) {
      next(e)
    }
  }

  static async deleteFolder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { target } = req.body.data
      await Folder.findByIdAndDelete(target._id)
      await (target.links as any).map(
        async (f: string) =>
          await Link.findByIdAndUpdate(f, { $pull: { folders: target._id } })
      )
      await Bookmark.findOneAndUpdate(
        { userId: target.userId },
        {
          $pull: { folders: target._id },
        }
      )
      res.status(200).send({ success: true, target: { ...target } })
    } catch (e) {
      next(e)
    }
  }

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body.data
      const [links, folders, bookmarks] = await Promise.all([
        Link.find({ userId: data.userId }),
        Folder.find({ userId: data.userId }),
        Bookmark.find({ userId: data.userId }),
      ])

      res.status(200).send({
        success: true,
        data: { links, folders, bookmarks: bookmarks[0] },
      })
      return
    } catch (e) {
      next(e)
    }
  }
}

export default BookmarkControllerApi
