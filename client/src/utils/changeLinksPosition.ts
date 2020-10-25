interface IArguments {
  links: string[]
  source: number
  destination: number
}

export default function ({ links, source, destination }: IArguments) {
  const newSequence = [...links]
  const targetId = links[source]
  newSequence.splice(source, 1)
  newSequence.splice(destination, 0, targetId)
  return newSequence
}
