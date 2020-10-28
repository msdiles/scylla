import { SortBy, SortDirection } from "@/types/types"
import { IFolder, ILink } from "@/types/interfaces"

type Item = ILink | IFolder

export default function (
  items: ILink[] | IFolder[],
  sortBy: SortBy,
  sortDirection: SortDirection,
  positions: string[]
): any[] {
  const isRevere = sortDirection === "sort content descending"
  if (sortBy === "calendar") {
    return items.sort((a: Item, b: Item) =>
      isRevere ? +b.date - +a.date : +a.date - +b.date
    )
  }
  if (sortBy === "favorite") {
    return items.sort((a: Item, b: Item) =>
      isRevere
        ? favoriteToNumber(a.favorite, b.favorite)
        : favoriteToNumber(!a.favorite, !b.favorite)
    )
  }
  if (sortBy === "font") {
    return items.sort((a: Item, b: Item) =>
      isRevere
        ? fontToNumber(a.name, b.name) * -1
        : fontToNumber(a.name, b.name)
    )
  }
  if (sortBy === "setting") {
    const newItems = findIndexes(items, positions).map((index) => items[index])
    return isRevere ? newItems.reverse() : newItems
  }
  return items
}

const favoriteToNumber = (a: boolean, b: boolean) => {
  return a && b ? 0 : a && !b ? 1 : -1
}

const fontToNumber = (a: string, b: string) => {
  return a > b ? 1 : a < b ? -1 : 0
}

const findIndexes = (
  items: ILink[] | IFolder[],
  positions: string[]
): number[] => {
  return positions.map((linkId) =>
    items.findIndex((i: Item) => i._id === linkId)
  )
}
