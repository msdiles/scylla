import { SortBy, SortDirection } from "@/types/types"
import { ILink } from "@/types/interfaces"

export default function (
  items: ILink[],
  sortBy: SortBy,
  sortDirection: SortDirection,
  positions: string[]
): any[] {
  const isRevere = sortDirection === "sort content descending"
  if (sortBy === "calendar") {
    return items.sort((a, b) =>
      isRevere ? +b.date - +a.date : +a.date - +b.date
    )
  }
  if (sortBy === "favorite") {
    return items.sort((a, b) =>
      isRevere
        ? favoriteToNumber(a.favorite, b.favorite)
        : favoriteToNumber(!a.favorite, !b.favorite)
    )
  }
  if (sortBy === "font") {
    return items.sort((a, b) =>
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

const findIndexes = (items: ILink[], positions: string[]): number[] => {
  return positions.map((linkId) => items.findIndex((i) => i._id === linkId))
}
