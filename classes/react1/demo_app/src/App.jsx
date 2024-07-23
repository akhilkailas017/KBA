import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Demo from './Demo'

function App() {
  const name = 'Akhil'
  const x = 10
  const y = 5
  const colors = ["red", "green", "blue", "purple"]
  const loggedin = true
  const user = {
    name: "akhil",
    age: 20
  }
  const h1style = {
    color: "blue"
  }

  // return <h1>{name}</h1>
  return (
    <>
      <h1 style={h1style}>{name}</h1>
      <h1>{name}</h1>
      <p>sum of {x} and {y} is {x + y}</p>
      <h1>ABC</h1>
      <ul>
        <li>{colors[0]}</li>
        <li>{colors[1]}</li>
        <li>{colors[2]}</li>
      </ul>
      <Demo/>
    </>
  )
}

export default App
