"use client";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import styles from '../../page.module.css'

export default function Control() {

    const router = useRouter()
    const handleSubmit = (id: string) => {
        router.push(`/admin/control/${id}`);
    };

    return (
        <Row className={styles.main}>
            <p>Bảng điều khiển</p>
            <Col>
                <Button onClick={() => handleSubmit('class')} variant="danger" size="lg">
                    Xóa bài tập
                </Button>
            </Col>
            <Col>
                <Button onClick={() => handleSubmit('edit')} variant="success" size="lg">
                    Thêm bài tập
                </Button>
            </Col>
        </Row>
    )
}
