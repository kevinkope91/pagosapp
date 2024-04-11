import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import db from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
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
                console.log(selectedPayment)
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

    const handleSaveChanges = () => {
        // Aquí puedes implementar la lógica para guardar los cambios en el documento de Firestore
        handleCloseModal();
    };




    return (
        <>
            <div className="container" style={{ margin: "0 10% 0 10%" }}>
                {
                    !loading ? 
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
                                </tr>
                            </thead>
                            <tbody>
                                {pagos.map((pago) => (
                                    <tr key={pago.id}>
                                        <td>
                                            {pago.servicio}
                                            <button className="btn btn-primary ml-2" onClick={() => handleEditClick(pago.id)}>
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
                : <div>CARGANDO</div>
                }
                

            </div>
            {showModal && selectedPayment && (<EditModal payment={selectedPayment} showed={showModal} handleClose={handleCloseModal} handleSave={handleSaveChanges}></EditModal>)}
        </>
    );
};

export default DataViewer;
