import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';

function App() {
  return (
    <Router>
      <div>
        <Navbar bg="dark" variant="dark">
          <Container className="d-flex justify-content-center">
            <Navbar.Brand href="/">TV Shows</Navbar.Brand>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<ShowList />} />
            <Route path="/show/:id" element={<ShowDetails />} />
          </Routes>
        </Container>
      </div>
    </Router>
    
  );
}

export default App;
