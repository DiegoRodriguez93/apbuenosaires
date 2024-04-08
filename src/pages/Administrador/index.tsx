import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { Layout } from '../../components/Layout';
import { useGetScheduleDates } from '../../hooks/useGetScheduleDates';
import { APTO_ENDPOINTS } from '../../api/apto_api';
import { auth, db } from '../../firebase';
import './administrador.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import PropertyManageList from '../../components/PropertyManageList';
import { Timestamp, collection, getDocs } from "firebase/firestore";
import { ToastItem } from 'react-toastify';


type BlockNewDate = {
  startDate?: string;
  endDate?: string;
  aptoId: number;
};

type Reservation = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  createdAt: Timestamp;
  guests: number;
  price: number;
  paymentDetails: {
    payer: {
      email_address: string;
      name: {
        given_name: string;
        surname: string;
      };
      address: {
        country_code: string;
      };
    };
  };
};
export const Administrador = () => {
  const [isAdmin, setIsAdmin] = useState(Boolean(localStorage.getItem('isAdmin')));
  const [blockNewDate, setBlockNewDate] = useState<BlockNewDate>({ startDate: undefined, endDate: undefined, aptoId: 1 });
  const { data, refetch, setRefetch } = useGetScheduleDates();
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const getNewInfoFromTable = () => setRefetch(refetch + 1);

  const fetchReservations = async () => {
    const querySnapshot = await getDocs(collection(db, "reservations"));
    const fetchedReservations: Reservation[] = [];
    querySnapshot.forEach((doc) => {
      fetchedReservations.push({ id: doc.id, ...doc.data() as Omit<Reservation, 'id'> });
    });
    setReservations(fetchedReservations);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (!isAdmin) {
    return <Layout><Login setIsAdmin={setIsAdmin} /></Layout>;
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
    await fetch(APTO_ENDPOINTS.SAVE_SCHEDULE_DATE, options).then(response => response.json()).catch(err => console.error(err)).finally(() => {
      setBlockNewDate({ endDate: undefined, startDate: undefined, aptoId: blockNewDate.aptoId });
      const startDateInput = document.getElementById('startDate') as HTMLInputElement | null;
      const endDateInput = document.getElementById('endDate') as HTMLInputElement | null;
      if (startDateInput !== null) startDateInput.value = '';
      if (endDateInput !== null) endDateInput.value = '';
    });
    getNewInfoFromTable();
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAdmin(false);
  };

  return (
    <Layout>
      <Row>
        <Col>
          <Button onClick={handleLogout} variant="danger">Cerrar sesión</Button>
          <PropertyManageList />
          <div>
            <h2>Reservas</h2>
            <table>
              <thead>
                <tr>
                  <th>Propiedad</th>
                  <th>Fecha inicio</th>
                  <th>Fecha final</th>
                  <th>Fecha reservado</th>
                  <th>Huespedes</th>
                  <th>Precio total</th>
                  <th>Email</th>
                  <th>Nombre</th>
                  <th>Pais</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                  <td>{reservation.title}</td>
                  <td>{reservation.startDate}</td>
                  <td>{reservation.endDate}</td>
                  <td>{reservation.createdAt.toDate().toLocaleString()}</td>
                  <td>{reservation.guests}</td>
                  <td>{reservation.price}</td>
                  <td>{reservation.paymentDetails?.payer?.email_address}</td>
                  <td>{reservation.paymentDetails?.payer?.name?.given_name} {reservation.paymentDetails?.payer?.name?.surname}</td>
                  <td>{reservation.paymentDetails?.payer?.address?.country_code}</td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
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
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
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
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" />
        <br />
        <label htmlFor="password">Password: </label>
        <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" />
        <br /><br />
        <Button onClick={handleLogin}>Login</Button>
        <br /><br />
        <span style={{ color: 'red' }}>{error}</span>
      </Col>
    </Row>
  );
};