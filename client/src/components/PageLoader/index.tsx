import React from "react"
import { Dimmer, Loader } from "semantic-ui-react"
import "./pageLoader.scss"

interface Props {
  loading: boolean
  inverted: boolean
}

const PageLoader = ({ loading, inverted }: Props) => {
  return (
    <div className="page-loader">
      <Dimmer active={loading} inverted={inverted}>
        <Loader />
      </Dimmer>
    </div>
  )
}

export default PageLoader
