import React from "react"
import { Dimmer, Loader } from "semantic-ui-react"

interface Props {
  loading: boolean
  inverted: boolean
}

const PageLoader = ({ loading, inverted }: Props) => {
  return (
    <Dimmer active={loading} inverted={inverted}>
      <Loader />
    </Dimmer>
  )
}

export default PageLoader
