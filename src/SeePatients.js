import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './SeePatients.css';

export default function SeePatients() {

    const [pacientList, setPacientList] = useState([]);
    const [modalShow, setModalShow] = React.useState({ show: false, nProcesso: 0 });
    const [pacientListFiltered, setPacientListFiltered] = useState([])
    const [filter, setFilter] = useState("") 


    useEffect(() => {
        getPatients()
    }, [])


    const getPatients = () => {
        axios.get("https://termos-doentes.herokuapp.com/patients").then((response) => {
            setPacientList(response.data)
            setPacientListFiltered(response.data)
        })
    }

    const eliminate = (nProcesso) => {
        const array = pacientList.filter((item) => item.nProcesso !== nProcesso);
        if(filter==""){
            setPacientList(array);
            setPacientListFiltered(array);
        }else{
            setPacientList(array);
            const array2 = pacientListFiltered.filter((item) => item.nProcesso !== nProcesso);
            setPacientListFiltered(array2)
        }
        axios.post("https://termos-doentes.herokuapp.com/delete", { nProcesso }).then((response) => {
            console.log(response.data)
        })
    }

    const changeTermo = (nProcesso, newTermo) => {
        var result = pacientList.filter(obj => {
            return obj.nProcesso === nProcesso
        })

        const object = result.at(0)
        object.termos = newTermo

        const index = pacientList.findIndex((item) => item.nProcesso === nProcesso);
        const newPacientList = [...pacientList];
        newPacientList.splice(index, 1);
        console.log(newPacientList)
        newPacientList.splice(index, 0, object)

        setPacientList(newPacientList)
        if(filter==""){
            setPacientListFiltered(newPacientList)
        }else{
            filterTable(filter)
        }
        axios.post("https://termos-doentes.herokuapp.com/updatetermo", { newTermo, nProcesso }).then((response) => {
            const resfromdb = response.data
            setModalShow({ show: false, nProcesso: 0 })
            alert(resfromdb)
        })
    }

    const filterTable = (termos) => {
        const arr = pacientList.filter((item) => item.termos === termos);
        setFilter(termos)
        setPacientListFiltered(arr)
    }

    const desfilter = () => {
        setFilter("")
        setPacientListFiltered(pacientList)
    }


    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Mudar Termos
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex justify-content-center'>
                    <Row>
                        <Col>
                            <Button onClick={props.onNaoTem} variant="danger">Não tem</Button>
                        </Col>
                        <Col>
                            <Button onClick={props.onPendente} variant="warning">Pendente</Button>
                        </Col>
                        <Col>
                            <Button onClick={props.onTem} variant="success">Tem</Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        );
    }



    return (
        <div>
            <div className="d-flex justify-content-center" style={{ marginTop: '50px'}}>
                 <Row>
                    <Col>
                        <h3>Filtrar</h3>
                    </Col>
                </Row>
            </div>
            <div className="d-flex justify-content-center" style={{ marginTop: '10px'}}>
                <Row>
                    <Col>
                        {filter==""?<Button variant='primary' block size="md" onClick={()=>{desfilter()}}>Todos</Button>:<Button variant='outline-primary' block size="md" onClick={()=>{desfilter()}}>Todos</Button>}
                    </Col>
                    <Col>
                        {filter=="Não tem"?<Button variant='danger' block size="md" onClick={()=>{filterTable("Não tem")}}>Não Tem</Button>:<Button variant='outline-danger' block size="md" onClick={()=>{filterTable("Não tem")}}>Não Tem</Button>}
                    </Col>
                    <Col>
                        {filter=="Pendente"?<Button variant='warning' block size="md" onClick={()=>{filterTable("Pendente")}}>Pendente</Button>:<Button variant='outline-warning' block size="md" onClick={()=>{filterTable("Pendente")}}>Pendente</Button>}
                    </Col>
                    <Col>
                        {filter=="Tem"?<Button variant='success' block size="md" onClick={()=>{filterTable("Tem")}}>Tem</Button>:<Button variant='outline-success' block size="md" onClick={()=>{filterTable("Tem")}}>Tem</Button>}
                    </Col>
                </Row>
            </div>
            <div className="d-flex justify-content-center" style={{ marginTop: '50px', marginLeft: '10vw', marginRight: '10vw' }}>
                <Row>
                    <Col>
                        <Table striped bordered>
                            <thead>
                                <tr>
                                    <th>Nr. do Processo</th>
                                    <th>Nome</th>
                                    <th>Hospital de Proveniência</th>
                                    <th>Data da Consulta</th>
                                    <th>Termo</th>
                                    <th>Urgente</th>
                                    <th>Data da Urgência</th>
                                    <th>Número de Sessões</th>
                                    <th>Eliminar Doente</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pacientListFiltered.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val.nProcesso}</td>
                                            <td>{val.nome}</td>
                                            <td>{val.hospital}</td>
                                            <td>{val.dataConsulta}</td>
                                            <td className='tohover' onClick={() => setModalShow({ show: true, nProcesso: val.nProcesso })} style={{ cursor: 'pointer' }}>{val.termos == 'Não tem' ? <Badge pill bg="danger">Não Tem</Badge> : (val.termos == 'Pendente' ? <Badge pill bg="warning">Pendente</Badge> : <Badge pill bg="success">Tem</Badge>)}</td>
                                            <td>{val.urgent === 0 ? <Badge pill bg="danger">Não</Badge> : <Badge pill bg="success">Sim</Badge>}</td>
                                            <td>{val.dataUrgencia}</td>
                                            <td>{val.nrSessoes}</td>
                                            <td><Button onClick={() => eliminate(val.nProcesso)}>Eliminar</Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <MyVerticallyCenteredModal
                    show={modalShow.show}
                    onHide={() => setModalShow({ show: false, nProcesso: 0 })}
                    onNaoTem={() => changeTermo(modalShow.nProcesso, "Não tem")}
                    onPendente={() => changeTermo(modalShow.nProcesso, "Pendente")}
                    onTem={() => changeTermo(modalShow.nProcesso, "Tem")}
                />
            </div>
        </div>
    )
}
