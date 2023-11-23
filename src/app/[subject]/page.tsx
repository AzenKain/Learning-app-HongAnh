'use client';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import style from '../style/subject.module.css';
import { useRouter } from 'next/navigation';
import { get, ref} from 'firebase/database';
import  { database} from '../firebaseConfig';
const Subject = ({ params }: { params: { subject: string } }) => {
    const [cardItems, setCardItems] = useState<JSX.Element[]>([]); 
    useEffect(() => {
        const fetchData = async () => {
            const classRef = ref(database, params.subject);
            get(classRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const items = [];
                    for (let i in data['data']) {
                        items.push(
                            <Card key={i} border="info" bg="dark" style={{ width: '18rem' }} className={style['card_md']}>
                                <Card.Img variant="top" src="subject.jpg" />
                                <Card.Body>
                                    <Card.Title>{i}</Card.Title>
                                    <Button onClick={() => handleSubmit(data['data'][i]['id'])} variant="primary">
                                        Xem nội dung
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
    const handleSubmit = (id: number) => {
        router.push(`/${params.subject}/${id}`);
    };

    return (
        <div className={style['container_md']}>
            <p className={style['title_md']}>Danh sách bài tập lớp {params.subject}</p>
            <Row>
                {cardItems}
            </Row>
        </div>
    );
};

export default Subject;
