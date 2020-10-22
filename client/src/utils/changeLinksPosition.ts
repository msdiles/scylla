interface IArguments {
  links: string[]
  source: number
  destination: number
}

export default function ({ links, source, destination }: IArguments) {
  // console.log(links, source, destination)
  const newSequence = [...links]
  const targetId = links[source]
  // console.log(newSequence)
  newSequence.splice(source, 1)
  // console.log(newSequence)
  newSequence.splice(destination, 0, targetId)
  // console.log(newSequence)
  return newSequence
}
