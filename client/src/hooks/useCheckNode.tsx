import React, { useEffect, useState } from "react"

const useCheckNode = () => {
  const [element, setElement] = useState<HTMLElement | undefined>()

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      e.stopPropagation()
      setElement(e.target as HTMLElement | undefined)
    }
    document.addEventListener("click", listener)
    return () => {
      document.removeEventListener("click", listener)
    }
  }, [])

  const checkNode = (ref: HTMLElement | null) => {
    return !!ref?.contains(element as Node)
  }
  return { checkNode }
}

export default useCheckNode
