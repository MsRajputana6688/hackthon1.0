"use client"
import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import data from '@/image-data'
import Capture from '@/components'
import Result from '@/components/Result'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'
const Home = () => {
    const [isUpload, setIsUpload] = useState(false)
    const [imgFile, setImgFile] = useState('')
    const [select, setSelect] = useState()
    const [result, setResult] = useState('')
    const [isLoad, setIsLoad] = useState(true)
    const [cookies] = useCookies(['auth'])
    const router = useRouter()
    const domain = 'https://photo-ai-auth.vercel.app'
    useEffect(() => {
        const getVerify = async () => {
            try {
                const res = await axios.get(`${domain}/verify`, {
                    headers: {
                        auth: cookies?.auth
                    }
                })
            } catch (error) {
                router.push(`/login`);
                console.log(error)
            }
        }
        setTimeout(() => {
            if (!cookies?.auth) {
                router.push('/login')
            } else {
                getVerify()
                setIsLoad(false)
            }
        }, 1000)
    }, [cookies])

    // select Template 
    const handleStart = () => {
        if (imgFile) {
            setIsUpload(true)
        }
    }


    const handleSelect = (pyload) => {
        setSelect(pyload)
    }

    const handleEnhance = (encodedImage) => {
        setResult(`data:image/webp;base64,${encodedImage}`)
        setIsLoad(false)
    }

    const [imgURL, setImgURL] = useState('')
    const handleGenrate = async () => {
        setIsLoad(true)
        try {
            const res = await axios.post('https://bb22-103-17-110-13.ngrok-free.app/rec', {
                image: imgFile.split(',')[1],
                choice: select
            })
            const resUp = await axios.post(' https://adp24companyday.com/aiphotobooth/upload.php', {
                img: res.data?.result
            })

            handleEnhance(res.data?.result)
            setImgURL(resUp.data.url)

            // const data = await axios.post('https://dis2023.com/aiphotobooth/upload.php', {
            //     img: result.split(',')[1]
            // })
        } catch (error) {
            console.log(error?.message)
            setIsLoad(false)
        }
    }

    return (
        !result ? <div className='d-flex justify-content-center' style={{ minHeight: '100vh',paddingTop:'180px', alignItems: 'center' }}>
            {
                isLoad && <div className="isLoad">
                    <div className="spinner-border text-light" role="status">
                    </div>
                </div>
            }

            {
                isUpload ? <div className='pt-5'>
                    <div className='center_main pt-5'>
                        <h1 className='text-center pt-4 text-primary'>Select Your Avatar</h1>
                        <Container className='px-4'>
                            <Row className='justify-content-center px-4'>

                                {
                                    data?.map((arr, ind) => {
                                        return <Col key={ind} xl={4} lg={4} sm={4} md={4} xs={4}>
                                            {
                                                arr?.map((Item, keys) => {
                                                    return <div key={keys + ind} className={`genrate my-3 ${select === Item?.encode ? 'selectImg' : ''}`}>
                                                        <img src={Item?.img} alt="" onClick={() => handleSelect(Item?.encode)} />
                                                    </div>
                                                })
                                            }
                                        </Col>
                                    })
                                }

                            </Row>
                            <div className="d-flex justify-content-center py-1">
                                <button className='btn btn-success start-btn' onClick={handleGenrate}>Generate Image</button>
                            </div>
                        </Container>
                    </div>
                </div> : <>
                    <div className='center_main pt-5'>
                        {/* <h1 className='text-center pt-4 font-weight-bold'>Click Your Picture</h1> */}
                        <Container className='px-5 pt-5'>
                            <Row className='justify-content-center'>
                                <Col lg={7} className='my-4'>
                                    <div className="card-bord py-4 px-3">
                                        <div className="imgDemo">
                                            <Capture setImgFile={setImgFile} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className="d-flex py-5 justify-content-center">
                                {imgFile && <button className='btn btn-success fs-2 start-btn' onClick={handleStart} >Generate Now</button>}
                            </div>
                        </Container>
                    </div>
                </>
            }
        </div> : <>
            <Result result={result} setResult={setResult} url={imgURL} />
        </>
    )
}

export default Home
