import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; 
import withAuth from '../../hoc/withAuth';
import { collection, getDocs } from 'firebase/firestore'; 

// Import necessary components and styles from 'react-dates'
import 'react-dates/initialize';
import { DayPickerSingleDateController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';

// Import your CSS module or stylesheet
import styles from './PropertyManageList.module.css'; // Adjust the path accordingly

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

  // Helper function to determine if a day is blocked
  const isDayBlocked = (day, blockedDates) => {
    const today = moment().startOf('day');
    return (
      day.isBefore(today, 'day') || // Block days before today
      blockedDates.some(dateStr => day.isSame(moment(dateStr, 'YYYY-MM-DD'), 'day'))
    );
  };

  return (
    <div>
      <h2>Propiedades:</h2>
      <div className={styles.propertiesGrid}>
        {properties.map(property => (
          <div key={property.id} className={styles.propertyItem}>
            <div className={styles.propertyHeader}>
              <strong>{property.title}</strong>
              <button 
                onClick={() => handleEdit(property.id)} 
                className={styles.manageButton}
              >
                Administrar
              </button>
            </div>
            <div className={styles.calendarContainer}>
              <DayPickerSingleDateController
                date={null} // No date selected
                onDateChange={() => {}}
                isDayBlocked={day => isDayBlocked(day, property.blockedDates || [])}
                numberOfMonths={1}
                hideKeyboardShortcutsPanel
                noBorder
                navPrev={null}
                navNext={null}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(PropertyManageList);
