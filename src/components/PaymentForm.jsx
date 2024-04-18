import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"
import db from '../firebase';
import { getStorage, ref, uploadBytes} from 'firebase/storage';
import { storage } from '../firebase';

const PaymentForm = () => {
    const [monto, setMonto] = useState('');
    const [fechaPago, setFechaPago] = useState('');
    const [servicio, setServicio] = useState('');
    const [metodoPago, setMetodoPago] = useState('');
    const [archivo, setArchivo] = useState(null); // Nuevo estado para manejar el archivo
    



    const clearFields = () => {
        setMonto(''); // Limpiar el campo después de enviar el formulario
        setFechaPago(''); // Limpiar el campo después de enviar el formulario
        setServicio(''); // Limpiar el campo después de enviar el formulario
        setMetodoPago(''); // Limpiar el campo después de enviar el formulario
        setArchivo(null); // Limpiar el archivo después de enviar el formulario
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArchivo(file);
        console.log(file)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Subir el archivo a Firebase Storage
            const storageRef = ref(storage, archivo.name);
            await uploadBytes(storageRef,archivo)


            await addDoc(collection(db, "pagos"), {
                monto: monto,
                fechapago: fechaPago,
                servicio: servicio,
                metodopago: metodoPago
            })
            clearFields();
            alert('Nombre agregado exitosamente');
        } catch (error) {
            console.error('Error al agregar nombre:', error);
        }
    };




    return (
        <form onSubmit={handleSubmit} className="container mt-5">
            <div className="mb-3">
                <label htmlFor="monto" className="form-label">Monto:</label>
                <input
                    type="number"
                    className="form-control"
                    id="monto"
                    min="0"
                    inputMode='numeric'
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="fechaPago" className="form-label">Fecha de Pago:</label>
                <input
                    type="date"
                    className="form-control"
                    id="fechaPago"
                    value={fechaPago}
                    onChange={(e) => setFechaPago(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="servicio" className="form-label">Servicio:</label>
                <select
                    className="form-select"
                    id="servicio"
                    value={servicio}
                    onChange={(e) => setServicio(e.target.value)}
                    required
                >
                    <option value="">Selecciona un servicio</option>
                    <option value="electricidad">Edesur</option>
                    <option value="agua">AySA</option>
                    <option value="gas">MetroGas</option>
                    <option value="telecentro">Telecentro</option>
                    <option value="movistar">Movistar</option>
                    <option value="seguro">Federacion Patronal</option>
                    {/* Agrega más opciones según sea necesario */}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="metodoPago" className="form-label">Método de Pago:</label>
                <select
                    className="form-select"
                    id="metodoPago"
                    value={metodoPago}
                    onChange={(e) => setMetodoPago(e.target.value)}
                    required
                >
                    <option value="">Seleccione un método de pago</option>
                    <option value="mp">Mercado Pago</option>
                    <option value="bn">Banco Nacion</option>
                    <option value="bru">Brubank</option>
                    <option value="tdeb">Tarjeta Debito Naicon</option>
                    <option value="tcred">Tarjeta de Credito Visa</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="archivo" className="form-label">Archivo:</label>
                <input
                    type="file"
                    className="form-control"
                    id="archivo"
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Registrar Pago</button>
        </form>
    );
};

export default PaymentForm;
