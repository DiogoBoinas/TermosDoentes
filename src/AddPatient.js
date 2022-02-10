import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Axios from 'axios'


export default function AddPatient() {
    const [nrProcesso, setNrProcesso] = useState("");
    const [nome, setNome] = useState("");
    const [hospital, setHospital] = useState("");
    const [termos, setTermos] = useState("Não tem");
    const [date, setDate] = useState("");
    const [urgente, setUrgente] = useState(false);
    const [dateUrgencia, setDateUrgencia] = useState("");
    const [nrSessoes, setNrSessoes] = useState("");

    const addToDatabase = (nrProcesso, nome, hospital, termos, date,urgente,dateUrgencia,nrSessoes) => {
        Axios.post("https://termos-doentes.herokuapp.com/add", {
            nrProcesso,
            nome,
            hospital,
            termos,
            date,
            urgente,
            dateUrgencia,
            nrSessoes
        }).then((response) => {
            alert(response.data)
        })
        setNrProcesso("")
        setNome("")
        setHospital("")
        setTermos("Não tem")
        setDate("")
        setUrgente(false)
        setDateUrgencia("")
        setNrSessoes("")
    }

    const submit = (event) => {
        event.preventDefault();
        addToDatabase(nrProcesso, nome, hospital, termos, date,urgente,dateUrgencia,nrSessoes);
    };


    return (
        <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
            <Form onSubmit={submit} id="myForm" style={{ flexGrow: 0.5 }}>
                <Form.Group className="mb-6" controlId="formNrProcesso">
                    <Form.Label>Número do Processo</Form.Label>
                    <Form.Control type="number" placeholder="Inserir número do processo"
                        value={nrProcesso}
                        onChange={(e) => setNrProcesso(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-6" controlId="formNome" style={{ marginTop: '20px' }}>
                    <Form.Label>Nome do doente</Form.Label>
                    <Form.Control type="text" placeholder="Inserir nome do doente"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-6" controlId="formHospital" style={{ marginTop: '20px' }}>
                    <Form.Label>Hospital de Proveniência</Form.Label>
                    <Form.Control type="text" placeholder="Inserir hospital de proveniência"
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-6" controlId="formDate" style={{ marginTop: '20px' }}>
                    <Form.Label>Data da consulta</Form.Label>
                    <Form.Control type="date" placeholder='Inserir data da consulta'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-6" controlId="formDate" style={{ marginTop: '20px' }}>
                    <Form.Check type="checkbox" label="Utente Urgente" defaultChecked={false} value={urgente} checked={urgente} onChange={(e) => { e.target.checked ? setUrgente(true) : setUrgente(false) }} />
                    {urgente ?
                        <div>
                            <Form.Label>Data da entrada na urgência</Form.Label>
                            <Form.Control type="date" placeholder='Inserir data da entrada na urgência'
                                value={dateUrgencia}
                                onChange={(e) => setDateUrgencia(e.target.value)}
                            />

                            <Form.Label style={{ marginTop: '10px' }}>Número de Sessões</Form.Label>
                            <Form.Control type="number" placeholder="Inserir número de sessões"
                                value={nrSessoes}
                                onChange={(e) => setNrSessoes(e.target.value)} /></div>
                        : <div />}
                </Form.Group>


                <fieldset style={{marginTop:'20px'}}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label as="legend" column sm={2}>
                            Termo de Responsabilidade
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check
                                type="radio"
                                label="Não tem"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios1"
                                value="Não tem"
                                checked={termos === "Não tem"}
                                onChange={(e)=>setTermos(e.target.value)}
                                defaultChecked
                            />
                            <Form.Check
                                type="radio"
                                label="Pendente"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                value="Pendente"
                                checked={termos === "Pendente"}
                                onChange={(e)=>setTermos(e.target.value)}
                            />
                            <Form.Check
                                type="radio"
                                label="Tem"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios3"
                                Value="Tem"
                                checked={termos === "Tem"}
                                onChange={(e)=>setTermos(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                </fieldset>
                {(nrProcesso==="" || nome==="" || hospital==="" || date==="")?
                <Button variant="primary" type="submit" style={{ marginTop: '20px' }} disabled>
                    Adicionar Doente
                </Button>
                :
                <Button variant="primary" type="submit" style={{ marginTop: '20px' }} >
                    Adicionar Doente
                </Button>
                }
            </Form>
        </div>
    )
}

