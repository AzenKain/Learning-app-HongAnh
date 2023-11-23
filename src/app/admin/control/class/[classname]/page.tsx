'use client';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import style from '../../../../style/subject.module.css';
import { useRouter } from 'next/navigation';
import { get, ref, set} from 'firebase/database';
import  { database} from '../../../../firebaseConfig';
const ClassName = ({ params }: { params: { classname: string } }) => {
    const [cardItems, setCardItems] = useState<JSX.Element[]>([]); 
    useEffect(() => {
        const fetchData = async () => {
            const classRef = ref(database, params.classname);
            get(classRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const items = [];
                    for (let i in data['data']) {
                        items.push(
                            <Card key={i} border="info" bg="dark" style={{ width: '18rem' }} className={style['card_md']}>
                                <Card.Img variant="top" src="../../../subject.jpg" />
                                <Card.Body>
                                    <Card.Title>{i}</Card.Title>
                                    <Button onClick={() => handleSubmit(i)} variant="danger">
                                        Xóa
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
        
                    }
                    setCardItems(items);
                }
                else {
                    console.log('No Data value');
                }
            }).catch((error) => {
                console.log(error);
            },);

        }

        fetchData();
    }, []);

    const router = useRouter();
    const handleSubmit = (id: string) => {
        const classRef = ref(database, params.classname);
        get(classRef).then((snapshot) => {
            const data = snapshot.val();
            delete data['data'][id];
            set(classRef, data);
        }).catch((error) => {
            console.log(error);
        },);
    };

    return (
        <div className={style['container_md']}>
            <p className={style['title_md']}>Danh sách bài tập lớp {params.classname}</p>
            <Row>
                {cardItems}
            </Row>
        </div>
    );
};

export default ClassName;
