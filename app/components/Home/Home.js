import React from 'react'
import { container, title, slogan } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>{'React/Redux Twitter (Duckr)'}</p>
      <p className={slogan}>{'Real-time, cloud-based blah blah blah.'}</p>
    </div>
  )
}
