import React, { useState } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import Login from './Login';

import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

import {
  BrowserRouter, Navigate, Routes,
  Route,
  Link
} from 'react-router-dom';




const firebaseConfig = {
  apiKey: "AIzaSyDOCEbc4gU0IOjqXy3JloYFMTkTw1VUFS8",
  authDomain: "logindoentes.firebaseapp.com",
  projectId: "logindoentes",
  storageBucket: "logindoentes.appspot.com",
  messagingSenderId: "128173150629",
  appId: "1:128173150629:web:307fc4b1a040d65840d84c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

function App() {
  return (
    <div>
      <Login/>
    </div>
  )
}

export default App;
