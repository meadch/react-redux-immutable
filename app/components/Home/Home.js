import React from 'react'
import { container, title, slogan } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>{'Dojo Algos'}</p>
      <p className={slogan}>{'Real-time, cloud-based algorithm application for Coding Dojo.'}</p>
    </div>
  )
}
