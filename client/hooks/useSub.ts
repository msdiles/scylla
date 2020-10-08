import { useEffect, useState } from "react"

export default () => {
  const [subber, setSubber] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSubber(subber - 1)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [subber])

  return { subber }
}
