import React, { PropTypes } from 'react'

Feed.propTypes = {
  duckId: PropTypes.string.isRequired,
  duck: PropTypes.object.isRequired,
}

export default function Feed (props) {
  console.log(props)
  const duck = props.duck
  return (
    <div>
      <img src={duck.avatar} />
    </div>
  )
}
