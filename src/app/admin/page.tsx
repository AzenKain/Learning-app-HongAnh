"use client";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import styles from '../page.module.css'
import { get, ref } from 'firebase/database';
import { database } from '../firebaseConfig';

export default function Admin() {
    const router = useRouter()
    const [dataFetch, setDataFetch] = useState(Object)
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            const classRef = ref(database, 'admin');
            get(classRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setDataFetch(data)
                }
                else {
                    console.log('No Data value');
                }
            }).catch((error) => {
                console.log(error);
            },);

        };

        fetchData();
    },);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(Email)
        console.log(Password)
        for (let i in dataFetch) {
            if (dataFetch[i]['email'] === Email && dataFetch[i]['password'] == Password) {
                router.push(`/admin/control`)
            }
        }
        setEmail('');
        setPassword('');
    };

    return (
        <Row className={styles.main}>
            <p>Admin</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nhập tài khoản</Form.Label>
                    <Form.Control
                        onChange={event => setEmail(event.target.value)}
                        value={Email}
                        placeholder="Nhập tài khoản"
                    />
                    <Form.Label>
                        Mật khẩu
                    </Form.Label>
                    <Form.Control
                        type="password"
                        onChange={event => setPassword(event.target.value)}
                        value={Password}
                        placeholder="Mật khẩu"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Xác Nhận
                </Button>
            </Form>
        </Row>
    )
}
