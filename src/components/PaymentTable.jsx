import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import db from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const DataViewer = () => {
    const [pagos, setPagos] = useState([]);

    useEffect(() => {
        const fetchPagos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'pagos'));
                const pagoData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setPagos(pagoData);
            } catch (error) {
                console.error('Error al obtener los pagos:', error);
            }
        };

        fetchPagos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(collection(db, 'pagos').doc(id));
            const updatedPagos = pagos.filter(pago => pago.id !== id);
            setPagos(updatedPagos);
        } catch (error) {
            console.error('Error al eliminar el pago:', error);
        }
    };

    return (
        <div className="container" style={{ margin: "0 10% 0 10%" }}>
            <div className="row justify-content-center">
                <div className="col">
                    <h2 className="text-center">Tabla de Pagos</h2>
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Servicio</th>
                                <th>Monto</th>
                                <th>Fecha Pago</th>
                                <th>Método de Pago</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagos.map((pago) => (
                                <tr key={pago.id}>
                                    <td>
                                        {pago.servicio}
                                        <button className="btn btn-primary ml-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button className="btn btn-danger ml-2" onClick={() => handleDelete(pago.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
                                    <td>{pago.monto}</td>
                                    <td>{pago.fechapago}</td>
                                    <td>{pago.metodopago}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DataViewer;
