import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import db from '../firebase';
import EditModal from './EditModal';

const DataViewer = () => {
    const [pagos, setPagos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPagos();
    }, []);

    const fetchPagos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'pagos'));
            const pagoData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setPagos(pagoData);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener los pagos:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "pagos", id));
            const updatedPagos = pagos.filter(pago => pago.id !== id);
            setPagos(updatedPagos);
        } catch (error) {
            console.error('Error al eliminar el pago:', error);
        }
    };

    const handleEditClick = async (id) => {
        try {
            const docSnapshot = await getDoc(doc(db, "pagos", id));
            if (docSnapshot.exists()) {
                setSelectedPayment({ id: docSnapshot.id, ...docSnapshot.data() });
                setShowModal(true);
                console.log("Se activo el edit")
                console.log("Este es els selected paymente del handeleEdit: ", selectedPayment)
            } else {
                console.error('El documento no existe.');
            }
        } catch (error) {
            console.error('Error al obtener el pago:', error);
        }
    };

    const handleCloseModal = () => {
        setSelectedPayment(null);
        setShowModal(false);
    };

    const handleSaveChanges = async (data) => {
        try {
            if (data) {
                const { id, ...updatedPayment } = data;
                await updateDoc(doc(db, "pagos", id), updatedPayment);
                const updatedPagos = pagos.map(pago => {
                    if (pago.id === id) {
                        return { id, ...updatedPayment };
                    }
                    return pago;
                });
                setPagos(updatedPagos);
                handleCloseModal();
            } else {
                console.error('No se ha seleccionado ningún pago para guardar cambios.');
            }
        } catch (error) {
            console.error('Error al guardar los cambios en el pago:', error);
        }
    };

    return (
        <>
            {/* Botón de regreso */}
            <Link to="/" className="btn btn-secondary position-absolute start-0 top-0 m-3">
                <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            {/* Fin del botón de regreso */}
            <div className="container" style={{ margin: "0 10% 0 10%" }}>
                {
                    !loading ?
                        <div className="row justify-content-center">
                            <div className="col">
                                <h2 className="text-center mt-2">Tabla de Pagos</h2>
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Servicio</th>
                                            <th>Monto</th>
                                            <th>Fecha Pago</th>
                                            <th>Método de Pago</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pagos.map((pago) => (
                                            <tr key={pago.id}>
                                                <td className="d-flex justify-content-between align-items-center"> {/* Usamos flexbox para alinear elementos */}
                                                    <div> {/* Contenedor para el texto */}
                                                        {pago.servicio}
                                                    </div>
                                                    <div> {/* Contenedor para los botones */}
                                                        <button className="btn btn-primary ml-2" onClick={() => handleEditClick(pago.id)}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </button>
                                                        <button className="btn btn-danger ml-2 pr-8" onClick={() => handleDelete(pago.id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
                                                    </div>
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
                        : <div style={{ display: "flex", justifyContent: "center", marginTop: "20%", fontSize: "40px", color: "red" }}>CARGANDO....</div>
                }
            </div>
            {showModal && selectedPayment && (<EditModal payment={selectedPayment} showed={showModal} handleClose={handleCloseModal} handleSave={handleSaveChanges}></EditModal>)}
        </>
    );
};

export default DataViewer;
