"use client";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import styles from '../../../page.module.css'
import { get, set, ref } from 'firebase/database';
import { database } from '../../../firebaseConfig';

export default function Admin() {
    const router = useRouter()
    const [dataFetch, setDataFetch] = useState(Object)
    const [Class, setClass] = useState('');
    const [Subject, setSubject] = useState('');
    const [MockTest, setMockTest] = useState('');
    const [AnsTest, setAnsTest] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const classRef = ref(database, Class);
        console.log(MockTest);
        get(classRef).then((snapshot) => {
            if (snapshot.exists()) {

                const data = snapshot.val();
                let id: string = (Math.floor(Math.random() * 1999) + data.size()).toString();
                const Ans = AnsTest.split(' ').map(line => line.trim()).filter(line => line !== '');
                const result: { [key: string]: { question: string; choices: string[] } } = {};
                const lines = MockTest.split('#').map(line => line.trim()).filter(line => line !== '');
              
                let i = 0;
                for (let j = 0; j < lines.length; j += 5) {
                    const question = lines[j]; 
                    const choices = lines.slice(j + 1, j + 5).map(choice => choice.substring(1));; // Removing the '#X. ' from each choice
              
                    result[`Ex${i}`] = {
                        question,
                        choices,
                    };
                    i++;
                }
               const dataSet = {

                    "id": id,
                    "AllQuestions": result[0],
                    "Answer": Ans
               }
                data[Subject] = dataSet;
                set(classRef, data);
            }
            else {
                let id: string = (Math.floor(Math.random() * 1999)).toString();
                const Ans = AnsTest.split(' ').map(line => line.trim()).filter(line => line !== '');
                const result: { [key: string]: { question: string; choices: string[] } } = {};
                const lines = MockTest.split('#').map(line => line.trim()).filter(line => line !== '');
              
                let i = 0;
                for (let j = 0; j < lines.length; j += 5) {
                    const question = lines[j]; 
                    const choices = lines.slice(j + 1, j + 5).map(choice => choice.substring(1));; // Removing the '#X. ' from each choice
              
                    result[`Ex${i}`] = {
                        question,
                        choices,
                    };
                    i++;
                }
                const dataSet = {
                        data: {
                            [Subject]: {
                                id: [id],
                                AllQuestions: [result][0],
                                Answer: [Ans]
                            }
                        }
                };

                get(ref(database)).then((snapshot)=>{
                    const data = snapshot.val();
                    data[Class.toLowerCase()] = dataSet
                    set(ref(database), data)
                })

            }
        }).catch((error) => {
            console.log(error);
        },);

        setClass('');
        setSubject('');
        setMockTest('');
        setAnsTest('');
    };

    return (
        <Row className={styles.main}>
            <p>Admin</p>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nhập tên lớp</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={event => setClass(event.target.value)}
                        value={Class}
                        placeholder="Nhập tên lớp"
                    />
                    <Form.Label>Nhập tên bài tập</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={event => setSubject(event.target.value)}
                        value={Subject}
                        placeholder="Nhập tên bài tập"
                    />
                    <Form.Label>Đề bài</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        onChange={event => setMockTest(event.target.value)}
                        value={MockTest}
                        placeholder="Đề bài"
                        rows={6} 
                    />
                    <Form.Label>Đáp án của đề</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={event => setAnsTest(event.target.value)}
                        value={AnsTest}
                        placeholder="Đáp án của đề"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Xác Nhận
                </Button>
            </Form>
        </Row>
    )
}
