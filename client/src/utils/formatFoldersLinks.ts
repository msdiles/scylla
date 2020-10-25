import { ILink } from "@/types/interfaces"

export default function (linksId: string[], links: ILink[]): ILink[] {
  // @ts-ignore
  return linksId.map((linkId) => links.find((l) => l._id === linkId))
}
