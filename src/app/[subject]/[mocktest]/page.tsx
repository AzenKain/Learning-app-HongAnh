"use client";
import React, { useState, useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import style from '../../style/mocktest.module.css'
import { useRouter } from 'next/navigation'
import Button from 'react-bootstrap/Button';
import { get, ref } from 'firebase/database';
import { database } from '../../firebaseConfig';
import styles from '../../page.module.css'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
type Question = {
    question: string;
    choices: string[];
};

type AllQuestions = {
    [key: string]: Question;
};
const MockTest = ({ params }: { params: { subject: string, mocktest: string } }) => {
    const [dataFetch, setDataFetch] = useState<AllQuestions>({})
    const [dataAns, setDataAns] = useState<string[]>([]);
    const router = useRouter()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let count: number = 0;
    
        // Assuming these arrays are available in your scope
        // dataAns and radioValues should be defined earlier
    
        // Logging for debugging purposes
        console.log(dataAns);
        console.log(radioValues);
    
        if (Array.isArray(dataAns)) {
            for (let i: number = 0; i < radioValues.length; i++) {
                if (typeof dataAns[i] !== 'undefined' && typeof radioValues[i] !== 'undefined') {
                    if (radioValues[i] === '1' && dataAns[i].toUpperCase() === 'A') {
                        count++;
                    } else if (radioValues[i] === '2' && dataAns[i].toUpperCase() === 'B') {
                        count++;
                    } else if (radioValues[i] === '3' && dataAns[i].toUpperCase() === 'C') {
                        count++;
                    } else if (radioValues[i] === '4' && dataAns[i].toUpperCase() === 'D') {
                        count++;
                    }
                }
            }
    
            // Displaying the result using toast notifications
            toast.success(`Đúng ${count}/${dataAns.length} câu!`);
        } else {
            // Handling the case where dataAns is not an array
            toast.error('No data available');
        }
    }

    const [radioValues, setRadioValues] = useState(['', '', '', '']);

    const radios = [
        { name: 'A', value: '1' },
        { name: 'B', value: '2' },
        { name: 'C', value: '3' },
        { name: 'D', value: '4' },
    ];

    const handleRadioChange = (index: number, value: string,) => {
        const updatedRadioValues = [...radioValues];
        if (radioValues.length < dataAns.length) {
            for (let i = 0; i < (dataAns.length / radioValues.length)+1; i++) updatedRadioValues.push(...radioValues);
        }
        updatedRadioValues[index] = value;
        console.log(index, value)
        setRadioValues(updatedRadioValues);
    };

    useEffect(() => {
        const fetchData = async () => {
            const classRef = ref(database, params.subject);
            get(classRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();

                    for (let i in data['data']) {
                        if (parseInt(params.mocktest) == parseInt(data['data'][i]['id'])) {
                            setDataFetch(data['data'][i]['AllQuestions'])
                            setDataAns(data['data'][i]['Answer']);
                            break;
                        }
                    }
                }
                else {
                    console.log('No Data value');
                }
            }).catch((error) => {
                console.log(error);
            },);

        };

        fetchData();
    }, []);
    const genData = () => {
        const items = [];
        let index: number = 1;
        for (let j in dataFetch) {
            items.push(
                <Container fluid key={index} className={style['question_md']}>
                    <Row>
                        <Col align='center'>
                            <Card border="info" style={{ width: '70%' }}>
                                <Card.Body>

                                    <Card.Text>
                                        {dataFetch[j]['question']}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row align='center'>
                        <ButtonGroup className="mb-2">
                            {radios.map((radio, idx) => (
                                <Col sm={3} key={idx}>
                                    <ToggleButton
                                        id={`radio-${index}-${idx}`}
                                        type="radio"
                                        style={{ wordWrap: 'break-word', height: 'auto', width: '90%', wordBreak: 'break-all' }}
                                        variant='outline-success'
                                        name={`radio-${index}`}
                                        value={radio.value}
                                        checked={radioValues[parseInt(j.replace("Ex", ''))] === radio.value}
                                        onChange={() => handleRadioChange(parseInt(j.replace("Ex", '')), radio.value)}
                                    >
                                        {`${radio.name}${dataFetch[j]['choices'][parseInt(radio.value) - 1]}`}
                                    </ToggleButton>
                                </Col>
                            ))}
                        </ButtonGroup>
                    </Row>
                </Container>
            );
            index++;
        }
        return items
    }
    return (
        <form onSubmit={handleSubmit}>
            <p className={styles.text_base}>Nội dung bài tập</p>
            <div>
                {genData()}
            </div>
            <Row>
                <Button type="submit" variant="primary">Nộp bài</Button>
            </Row>
        </form>
    );
};


export default MockTest;
