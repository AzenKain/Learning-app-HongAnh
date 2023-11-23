import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Container, Row, Col } from 'react-bootstrap';
const inter = Inter({ subsets: ['latin'] })
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: 'leaning',
  description: 'Learning app',
  icons: {
    icon: ['icon.jpg?v=4'],
    apple: ['icon.jpg?v=4']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 
{

  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <Container>
            <Navbar/>
            {children}
          <Footer/>
          <ToastContainer />
        </Container>
        </body>
    </html>
  )
}
