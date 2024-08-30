import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { db } from '../../firebase'; // Import Firebase
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';

const DiscountCodeManager = () => {
  const [discountCodes, setDiscountCodes] = useState([]);
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(''); // Initialize as an empty string
  const [editMode, setEditMode] = useState(null);
  const [editCode, setEditCode] = useState('');
  const [editDiscount, setEditDiscount] = useState(''); // Initialize as an empty string
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submitting

  // Fetch discount codes from Firestore
  const fetchDiscountCodes = async () => {
    const querySnapshot = await getDocs(collection(db, 'discountCodes'));
    const codes = [];
    querySnapshot.forEach((doc) => {
      codes.push({ id: doc.id, ...doc.data() });
    });
    setDiscountCodes(codes);
  };

  useEffect(() => {
    fetchDiscountCodes();
  }, []);

  // Add a new discount code to Firestore
  const handleAddDiscountCode = async () => {
    if (!newCode || !newDiscount || Number(newDiscount) <= 0) {
      alert('Please enter a valid code and discount percentage.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Ensure percentage is sent as a number
      const discountCodeData = {
        name: newCode.trim(),
        percentage: Number(newDiscount), // Convert to number
      };

      await addDoc(collection(db, 'discountCodes'), discountCodeData);
      setNewCode('');
      setNewDiscount('');
      fetchDiscountCodes(); // Refresh the list
    } catch (error) {
      console.error('Error adding discount code:', error);
      alert('Error adding discount code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit an existing discount code in Firestore
  const handleEditDiscountCode = async (id) => {
    if (!editCode || !editDiscount || Number(editDiscount) <= 0) {
      alert('Please enter a valid code and discount percentage.');
      return;
    }

    setIsSubmitting(true);
    try {
      const discountDoc = doc(db, 'discountCodes', id);
      await updateDoc(discountDoc, { 
        name: editCode.trim(),
        percentage: Number(editDiscount), // Convert to number
      });
      setEditMode(null);
      fetchDiscountCodes(); // Refresh the list
    } catch (error) {
      console.error('Error updating discount code:', error);
      alert('Error updating discount code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete a discount code from Firestore
  const handleDeleteDiscountCode = async (id) => {
    setIsSubmitting(true);
    try {
      const discountDoc = doc(db, 'discountCodes', id);
      await deleteDoc(discountDoc);
      fetchDiscountCodes(); // Refresh the list
    } catch (error) {
      console.error('Error deleting discount code:', error);
      alert('Error deleting discount code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Administrar codigos de descuento</h2>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Porcentaje</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {discountCodes.map((code) => (
            <tr key={code.id}>
              {editMode === code.id ? (
                <>
                  <td><input value={editCode} onChange={(e) => setEditCode(e.target.value)} /></td>
                  <td>
                    <input 
                      type="number" 
                      value={editDiscount} 
                      onChange={(e) => setEditDiscount(e.target.value)} // Keep as string
                    />
                  </td>
                  <td>
                    <Button onClick={() => handleEditDiscountCode(code.id)} disabled={isSubmitting}>
                      Save
                    </Button>
                    <Button onClick={() => setEditMode(null)} disabled={isSubmitting}>
                      Cancel
                    </Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{code.name}</td>
                  <td>{code.percentage}%</td>
                  <td>
                    <Button onClick={() => {
                      setEditMode(code.id);
                      setEditCode(code.name);
                      setEditDiscount(String(code.percentage)); // Convert number to string for editing
                    }} disabled={isSubmitting}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDeleteDiscountCode(code.id)} variant="danger" disabled={isSubmitting}>
                      Eliminar
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Crear nuevo codigo</h3>
      <Form>
        <Form.Group controlId="discountCode">
          <Form.Label>Codigo</Form.Label>
          <Form.Control type="text" value={newCode} onChange={(e) => setNewCode(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="discountPercentage">
          <Form.Label>Porcentaje de descuento</Form.Label>
          <Form.Control 
            type="number" 
            value={newDiscount} 
            onChange={(e) => setNewDiscount(e.target.value)} // Keep as string
          />
        </Form.Group>
        <Button onClick={handleAddDiscountCode} disabled={isSubmitting} style={{ marginTop: '10px' }}>
          {isSubmitting ? 'Adding...' : 'Add Discount Code'}
        </Button>
      </Form>
    </div>
  );
};

export default DiscountCodeManager;
