import React, { useState, useEffect } from 'react';

const EditModal = ({ showed, payment, handleClose, handleSave }) => {
    const [editedPayment, setEditedPayment] = useState(payment);

    useEffect(() => {
        setEditedPayment(payment);
    }, [payment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPayment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(editedPayment);
    };

    return (
        <div className="modal" style={{display: showed ? 'flex' : 'none'}} >
            <div class="modal-dialog" role="document">

            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Editar Pago</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="monto">Monto:</label>
                        <input type="number" id="monto" name="monto" value={editedPayment.monto} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="fechaPago">Fecha de Pago:</label>
                        <input type="date" id="fechaPago" name="fechaPago" value={editedPayment.fechapago} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="servicio">Servicio:</label>
                        <input type="text" id="servicio" name="servicio" value={editedPayment.servicio} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="metodoPago">Método de Pago:</label>
                        <input type="text" id="metodoPago" name="metodoPago" value={editedPayment.metodopago} onChange={handleChange} required />
                    </div>
                    <div>
                        <button type="submit">Guardar Cambios</button>
                        <button type="button" onClick={handleClose}>Salir</button>
                    </div>
                </form>

                
            </div>
        </div>
        </div>
    );
};

export default EditModal;