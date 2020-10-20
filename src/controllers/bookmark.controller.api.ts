import { NextFunction, Request, Response } from "express"
import { Folder, Link } from "../models/Bookmark"

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
      const { id, target } = req.body.data
      await Link.findByIdAndUpdate(id, { ...target })
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
      res.status(200).send({ success: true, target: { ...target } })
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

  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body.data
      const [links, folders] = await Promise.all([
        Link.find({ userId: data.userId }),
        Folder.find({ userId: data.userId }),
      ])

      res.status(200).send({ success: true, data: { links, folders } })
      return
    } catch (e) {
      next(e)
    }
  }
}

export default BookmarkControllerApi
