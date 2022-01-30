import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PlayApp from './PlayApp'
import Splash from './Splash'
import Login from '../Login/Login'

const HighLevelApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="*" element={<PlayApp/>}/>
    </Routes>
  )
}

export default HighLevelApp
