import React, { useState, useEffect } from 'react';
import PropertyList from '../PropertyList';
import styles from '../PropertyList/FilteredPropertyList.module.css'; // Ensure the path is correct
import { db } from '../../firebase'; // Ensure this import matches the new setup
import { collection, query, where, getDocs } from 'firebase/firestore';

const MainContentPropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // Use the query function to create queries
        const q = query(collection(db, 'properties'));
        const querySnapshot = await getDocs(q);
        const propertyData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propertyData);
      } catch (error) {
        console.error("Error fetching properties: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className={styles.mainContentPropertyList}>
      {loading ? (
        <div>Cargando...</div>
      ) : properties.length === 0 ? (
        <div>No existen propiedades destacadas.</div>
      ) : (
        <PropertyList properties={properties} />
      )}
    </div>
  );
};

export default MainContentPropertyList;
