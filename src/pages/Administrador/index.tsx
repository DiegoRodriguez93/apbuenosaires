import { Col, Row, Button } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import { Dispatch, SetStateAction, useState } from "react";
import { useGetScheduleDates } from "../../hooks/useGetScheduleDates";
import "./administrador.css";
import { APTO_ENDPOINTS } from "../../api/apto_api";

type BlockNewDate = {
  startDate?: string;
  endDate?: string;
  aptoId: number;
};

export const Administrador = () => {
  const [isAdmin, setIsAdmin] = useState(
    Boolean(localStorage.getItem("isAdmin"))
  );
  const [blockNewDate, setBlockNewDate] = useState<BlockNewDate>({
    startDate: undefined,
    endDate: undefined,
    aptoId: 1,
  });
  const { data, refetch, setRefetch } = useGetScheduleDates();

  const getNewInfoFromTable = () => setRefetch(refetch + 1);

  console.log("data", data);

  if (!isAdmin) {
    return (
      <Layout>
        <Password setIsAdmin={setIsAdmin} />
      </Layout>
    );
  }

  const handleReserveDate = async () => {
    if (
      blockNewDate.startDate === undefined ||
      blockNewDate.endDate === undefined
    ) {
      return;
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...blockNewDate }),
    };

    await fetch(APTO_ENDPOINTS.SAVE_SCHEDULE_DATE, options)
      .then((response) => response.json())
      .catch((err) => console.error(err))
      .finally(() => {
        setBlockNewDate({
          endDate: undefined,
          startDate: undefined,
          ...blockNewDate,
        });
        if (
          document.getElementById("startDate") != null &&
          document.getElementById("endDate") != null
        ) {
          // @ts-expect-error
          document.getElementById("startDate").value = "";
          // @ts-expect-error
          document.getElementById("endDate").value = "";
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
        method: "DELETE",
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
          <Button onClick={handleLogout} variant="danger">
            Cerrar sesión
          </Button>
          <h4>Bloquear Fecha</h4>
          <label htmlFor="startDate">Desde</label>
          <input
            value={blockNewDate.startDate}
            onChange={(e) =>
              setBlockNewDate({
                ...blockNewDate,
                startDate: e.target.value,
              })
            }
            type="date"
            name="startDate"
            id="startDate"
          />
          <label htmlFor="endDate">Hasta</label>
          <input
            value={blockNewDate.endDate}
            onChange={(e) =>
              setBlockNewDate({
                ...blockNewDate,
                endDate: e.target.value,
              })
            }
            type="date"
            name="endDate"
            id="endDate"
          />
          <label htmlFor="apto">Apto</label>
          <select
            onChange={(e) =>
              setBlockNewDate({
                ...blockNewDate,
                aptoId: Number(e.target.value),
              })
            }
            style={{ marginRight: "10px" }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <Button onClick={handleReserveDate}>Bloquear</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <table className="tableSchedule">
            <thead>
              <tr>
                <th>ID</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Apto</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.initial_date}</td>
                  <td>{row.final_date}</td>
                  <td>{row.apto_id}</td>
                  <td>
                    <button onClick={() => handleDelete(row.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Layout>
  );
};

const Password = ({
  setIsAdmin,
}: {
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}) => {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleIngresar = () => {
    if (pass === "Montevideo314") {
      localStorage.setItem("isAdmin", "true");
      setIsAdmin(true);
    } else {
      setError("Contraseña incorrecta!");
    }
  };

  return (
    <Row>
      <Col>
        <label htmlFor="">Contraseña: </label>
        <br />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          name="pass"
          id="pass"
        />
        <br />
        <br />
        <Button onClick={handleIngresar}>Ingresar</Button>
        <br />
        <br />
        <span style={{ color: "red" }}>{error}</span>
      </Col>
    </Row>
  );
};
