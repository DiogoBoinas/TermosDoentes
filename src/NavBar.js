import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import AddPatient from "./AddPatient";
import App from "./App";
import {auth} from './App';


import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";
import SeePatients from './SeePatients';
import { signOut } from 'firebase/auth';



export default function NavBar() {

    const logout = async() =>{
        await signOut(auth)
    }


    return (
        <BrowserRouter>
        <div>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Doentes</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/inserir">Inserir Doente</Nav.Link>
                        <Nav.Link as={Link} to="/ver">Ver Doentes</Nav.Link>
                        <Nav.Link onClick={()=>{logout()}} as={Link} to="/">Sair</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
        <div>
            <Routes path="/" element={<App/>}>
                <Route path="/inserir" element={<AddPatient/>}></Route>
                <Route path="/ver" element={<SeePatients/>}></Route>
            </Routes>
        </div>
        </BrowserRouter>
    )
}
