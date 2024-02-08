import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; 
import withAuth from '../../hoc/withAuth';
import { collection, getDocs } from 'firebase/firestore'; // Import collection and getDocs from firebase/firestore

const PropertyManageList = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const propertyCollectionRef = collection(db, 'properties');
      const propertyDocsSnapshot = await getDocs(propertyCollectionRef);
      const fetchedProperties = propertyDocsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(fetchedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleEdit = (propertyId) => {
    navigate(`/properties/${propertyId}`); 
  };

  return (
    <div>
      <h2>Propiedades:</h2>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            {property.title}
            <button onClick={() => handleEdit(property.id)}>Administrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withAuth(PropertyManageList);
