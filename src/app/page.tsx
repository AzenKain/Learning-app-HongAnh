"use client";
import styles from './page.module.css'
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
 
export default function Home() {
  const router = useRouter()

  const [Class, setClass] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
    event.preventDefault();;
    setClass('');
    router.push(`/${Class.toLowerCase( )}`)
  };

  return (
    <Row className={styles.main}>
        <p>Admin</p>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nhập Tên Lớp</Form.Label>
          <Form.Control 
            onChange={event => setClass(event.target.value)}
            value={Class}
            placeholder="Nhập Tên Lớp" 
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Xác Nhận
        </Button>
      </Form>
    </Row>
  )
}
