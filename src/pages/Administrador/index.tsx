import React, { Dispatch, SetStateAction, useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { Layout } from '../../components/Layout';
import { useGetScheduleDates } from '../../hooks/useGetScheduleDates';
import { APTO_ENDPOINTS } from '../../api/apto_api';
import { auth } from '../../firebase';
import './administrador.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PropertyManageList from '../../components/PropertyManageList';


type BlockNewDate = {
  startDate?: string;
  endDate?: string;
  aptoId: number;
};

export const Administrador = () => {
  console.log("Administrador component is rendering");

  const [isAdmin, setIsAdmin] = useState(Boolean(localStorage.getItem('isAdmin')));
  const [blockNewDate, setBlockNewDate] = useState<BlockNewDate>({
    startDate: undefined,
    endDate: undefined,
    aptoId: 1,
  });
  const { data, refetch, setRefetch } = useGetScheduleDates();

  const getNewInfoFromTable = () => setRefetch(refetch + 1);

  if (!isAdmin) {
    return (
      <Layout>
        <Login setIsAdmin={setIsAdmin} />
      </Layout>
    );
  }

  const handleReserveDate = async () => {
    if (blockNewDate.startDate === undefined || blockNewDate.endDate === undefined) {
      return;
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...blockNewDate }),
    };
  
    await fetch(APTO_ENDPOINTS.SAVE_SCHEDULE_DATE, options)
      .then(response => response.json())
      .catch(err => console.error(err))
      .finally(() => {
        setBlockNewDate({
          endDate: undefined,
          startDate: undefined,
          aptoId: blockNewDate.aptoId,
        });
  
        const startDateInput = document.getElementById('startDate') as HTMLInputElement | null;
        const endDateInput = document.getElementById('endDate') as HTMLInputElement | null;
  
        if (startDateInput !== null) {
          startDateInput.value = '';
        }
  
        if (endDateInput !== null) {
          endDateInput.value = '';
        }
      });
    getNewInfoFromTable();
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAdmin(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(APTO_ENDPOINTS.DELETE_SCHEDULE_DATE(String(id)), {
        method: 'DELETE',
      });
      getNewInfoFromTable();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Row>
        <Col>
          <Button onClick={handleLogout} variant="danger">Cerrar sesión</Button>
          <PropertyManageList />
         </Col>
      </Row>
    </Layout>
  );
};

const Login = ({
  setIsAdmin,
}: {
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('isAdmin', 'true'); // This is correct
      setIsAdmin(true); // This is correct
    } catch (error) {
      if (error instanceof Error) {
        setError("Login failed! " + error.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };


  return (
    <Row>
      <Col>
        <label htmlFor="email">Email: </label>
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
        />
        <br />
        <label htmlFor="password">Password: </label>
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
        />
        <br />
        <br />
        <Button onClick={handleLogin}>Login</Button>
        <br />
        <br />
        <span style={{ color: 'red' }}>{error}</span>
      </Col>
    </Row>
  );
};
