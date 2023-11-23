import React from 'react';
import style from '../style/footer.module.css';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer>
        <Row>
        <div className={style.footer}>
                <Row>
                    <Col>
                        <div className={style.footer_menu}>
                            <ul>
                                <li><img src='/icon.jpg' alt="HTML5 Icon" width="60" height="60" /></li>
                                <li><a href="/">Home</a></li>
                                <li><a href="/admin">Admin</a></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={style.footer_end}>
                            <h4>Everything goes on</h4>
                        </div>
                    </Col>
                </Row>
            </div>
        </Row>
        </footer>
    );
}

export default Footer;
