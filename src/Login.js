import React,{useState} from 'react';
import App from './App'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import NavBar from './NavBar';
import { BrowserRouter, Navigate, Routes,
    Route,
    Link } from 'react-router-dom';
import {auth} from './App'


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user,setUser] = useState({})

    onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
    })

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
        }catch(error){
            console.log(error)
        }
        
    }

    
    

    if(user){
        return(
            <div>
                <NavBar/>
            </div>
        )
    }else{
        return (
            <div className="d-flex justify-content-center" style={{marginTop:'25vh'}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="md" type="submit" disabled={!validateForm()} style={{marginTop:'10px'}}>
                        Login
                    </Button>
                </Form>
            </div>
        );
    }
   
}
