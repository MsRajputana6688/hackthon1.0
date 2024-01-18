"use client"
import { v4 as uuid } from 'uuid';
import Link from 'next/link'
import QRCode from 'qrcode.react'
import React, { useState } from 'react'
import { Container, Row, Col, Modal, Button } from 'react-bootstrap'
import { useRouter } from 'next/navigation'
import { FaHome } from 'react-icons/fa'
import axios from 'axios';
const Result = ({ result, setResult, url }) => {
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 5)
    const [email, setEmail] = useState('')
    const router = useRouter()
    const [showQr, setShowQr] = useState(false)
    const [qr, setQr] = useState('')
    const [show, setShow] = useState(false)
    const [resMSG, setresMSG] = useState('')
    const [showMSG, setShowMsg] = useState(false)

    const handleRedirect = () => {
        setTimeout(() => {
            router.push(`result/${small_id}`);
        }, 5000)
    }

    const handleQrCode = async () => {
        try {
            const data = await axios.post('https://dis2023.com/aiphotobooth/upload.php', {
                img: result.split(',')[1]
            })
            setQr(data?.data?.url)
            setShowQr(true)
        } catch (error) {
            console.log(error)
        }
    }

    

    const handalSendEmail = async () => {
        try {
            const res = await axios.post('https://adp24companyday.com/aiphotobooth/emailer/index.php', { 'email': email, 'url': url })
            setresMSG(res.data.message)
            setShowMsg(true)
            setShow(false)
            setEmail('')
        } catch (error) {
        }
    }

    const handleClose =()=>{
                setShowMsg(false)
            setShow(false)
    }
    return (
        <div className='d-flex align-items-center center_main pt-5' style={{ minHeight: '100vh' }}>
            <Container className='pt-5' style={{ paddingTop: '100px' }}>
                <h1 className='text-center pt-t mt-5 text-dark fw-bold'>Here is Your Photograph</h1>
                <Row className='justify-content-center align-items-center'>
                    <Col lg={9} md={12} sm={12} xs={12} className='d'>
                        <div style={{ width: '70%' }} className='m-auto'>
                            <div className="finalImag">
                                <img src={result} alt="" />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between flex-wrap py-4 m-auto" style={{ width: '80%' }}>

                            <div>
                                <a href={result} download={`${small_id}`} target="_blank" rel="noopener noreferrer" className='btn wt-border btn-warning start-btn'>Save</a>
                            </div>
                            <div>
                                <button onClick={handleQrCode} className='btn wt-border btn-warning start-btn'>QR</button>
                            </div>
                            <div>
                                <button onClick={() => setShow(true)} className='btn wt-border btn-warning start-btn'>Email</button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-warning wt-border start-btn' onClick={() => setResult('')}>Re-generate</button>
                        </div>
                    </Col>
                    <Modal
                        show={showQr}
                        onHide={() => { setShowQr(false) }}
                        aria-labelledby="contained-modal-title-vcenter"
                        centered >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Scan this QR to get image
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex justify-content-center">
                                <QRCode value={qr} size={200} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='btn btn-danger' onClick={() => setShowQr(false)}>Close</button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </Container>
            <Link href='/' className="back-home">
                <FaHome />
            </Link>


            <Modal show={show} animation={true} centered onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Please Enter Your Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input className='form-control' value={email} onChange={e => setEmail(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>

                    {
                        email ? <Button variant="secondary" onClick={handalSendEmail}>
                            Send
                        </Button> : <Button variant="secondary" disabled>
                            Send
                        </Button>
                    }


                </Modal.Footer>
            </Modal>
            <Modal show={showMSG} onHide={handleClose} animation={true} centered>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Please Enter Your Email</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <h3 className='text-center py-3'>
                        {resMSG}
                    </h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowMsg(false)}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}

export default Result
