"use client"
import Loader from '@/components/Loader'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useCookies } from 'react-cookie'

const Page = () => {
  const [isLoad, setIsLoad] = useState(true)
  const [cookies] = useCookies(['auth'])
  const router = useRouter()
  useEffect(() => {
    if (!cookies?.auth) {
      router.push('/login')
    } else {
      setIsLoad(false)
    }
  }, [cookies])

  const data = [
    {
      id: 1,
      img: '/assets/1.png',
    },
    {
      id: 2,
      img: '/assets/2.png',
    },
    {
      id: 3,
      img: '/assets/3.png',
    },
    {
      id: 4,
      img: '/assets/4.png',
    },
    {
      id: 5,
      img: '/assets/5.png',
    },
    {
      id: 6,
      img: '/assets/6.png',
    },
    {
      id: 7,
      img: '/assets/7.png',
    },
    {
      id: 8,
      img: '/assets/8.png',
    },
  ]

  return (
    <div className="main pt-4" >
      {
        isLoad ? <Loader /> : <Container className='d-flex' style={{ minHeight: '100vh', alignItems: 'center' }}>
          <div>
            <Row>
              {
                data?.map((item, keys) => {
                  return <Col xxl={3} xl={3} lg={3} md={3} sm={6} xs={12} key={keys} className='p-4'>
                    <Card>
                      <img src={item?.img} alt="" />
                    </Card>
                  </Col>
                })
              }
            </Row>
            <div className="d-flex justify-content-center py-4">
              <Link href='/start' className='btn btn-success start-btn'>Start Now</Link>
            </div>
          </div>
        </Container >
      }
    </div >
  )
}

export default Page
