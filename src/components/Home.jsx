import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1 className="mb-4">Bienvenido</h1>
                <div>
                    <Link to="/pagos" className="btn btn-primary btn-lg mx-2">Ver Listado de Pagos</Link>
                    <Link to="/nuevo-pago" className="btn btn-success btn-lg mx-2">Nuevo Pago</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
