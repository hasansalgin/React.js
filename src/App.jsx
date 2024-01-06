import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [bilgi, setBilgi] = useState(null);
  const refYer = useRef(null);

  const ara = function (yer) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${yer}&appid=a57ff31813aadd18480feae635befdc5&units=metric&lang=tr`
      )
      .then((response) => {
        setBilgi({
          name: response.data.name,
          country: response.data.sys.country,
          temp: response.data.main.temp,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon,
        });
      })
      .catch((error) => {
        toast.error("Aradığınız yer bulunamadı.");
      });
  };

  useEffect(() => {
    ara("İstanbul");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    ara(refYer.current.value);
  };

  return (
    <div className="tumu">
      <header>
        <h1 className="fw-bold text-light">Hava Durumu</h1>
        <Form className="mb-5" onSubmit={handleSubmit}>
          <InputGroup size="lg">
            <Form.Control
              ref={refYer}
              placeholder="Yer adını giriniz.."
              required
            />
            <Button className="btn-ara" type="submit" variant="secondary">
              Ara
            </Button>
          </InputGroup>
        </Form>
        <ToastContainer />
      </header>
      <main>
        {bilgi && (
          <Row className="rounded overflow-hidden text-center">
            <Col xs={12} className="bg-white py-3">
              <img
                src={`https://openweathermap.org/img/wn/${bilgi.icon}@2x.png`}
                alt={bilgi.description}
              />
            </Col>
            <Col
              xs={6}
              sm={4}
              className="ortali bg-dark text-light py-4 fs-1 fw-bold py-3"
            >
              {bilgi.temp}°
            </Col>
            <Col xs={6} sm={4} className="ortali bg-dark text-light fs-4 py-3">
              <div className="text-uppercase">{bilgi.description}</div>
              <div>
                {bilgi.name}, {bilgi.country}
              </div>
            </Col>
            <Col xs={12} sm={4} className="ortali tarih fs-3 py-3">
              {new Date().toLocaleDateString()}
            </Col>
          </Row>
        )}
      </main>
    </div>
  );
}

export default App;
