// PropertyManageList.jsx

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

// Import the shared CSS module
import calendarStyles from './PropertyManageList.module.css'; // Ensure this path is correct

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

  // Function to determine if a day is blocked, including overlapping dates
  const isDayBlocked = (day, property) => {
    const today = moment().startOf('day');
    const dayStr = day.format('YYYY-MM-DD');

    // Block days before today
    if (day.isBefore(today, 'day')) {
      return true;
    }

    // Extract blockedDateRanges
    const blockedDateRanges = property.blockedDateRanges || [];

    // Collect all internal blocked dates (excluding start and end dates)
    const allBlockedDates = new Set();
    blockedDateRanges.forEach(range => {
      const rangeDuration = moment(range.end).diff(moment(range.start), 'days');

      if (rangeDuration > 1) {
        // Multi-night reservation: block internal dates only
        let current = moment(range.start).add(1, 'days');
        while (current.isBefore(moment(range.end), 'day')) {
          allBlockedDates.add(current.format('YYYY-MM-DD'));
          current.add(1, 'days');
        }
      }
      // Do not block the start and end dates of reservations
    });

    // Collect start and end dates
    const startBlockedDates = new Set(
      blockedDateRanges.map(range => moment(range.start).format('YYYY-MM-DD'))
    );

    const endBlockedDates = new Set(
      blockedDateRanges.map(range => moment(range.end).format('YYYY-MM-DD'))
    );

    // Identify overlapping dates (dates that are both start and end dates)
    const overlappingDates = new Set(
      [...startBlockedDates].filter(date => endBlockedDates.has(date))
    );

    // Determine if the day is in internal blocked dates or overlapping dates
    if (allBlockedDates.has(dayStr) || overlappingDates.has(dayStr)) {
      return true;
    }

    return false;
  };

  // Function to render custom day contents with tooltip and class
  const renderDayContents = (day, property) => {
    const dayStr = day.format('YYYY-MM-DD');

    // Extract blockedDateRanges
    const blockedDateRanges = property.blockedDateRanges || [];

    // Collect start and end dates
    const startBlockedDates = new Set(
      blockedDateRanges.map(range => moment(range.start).format('YYYY-MM-DD'))
    );

    const endBlockedDates = new Set(
      blockedDateRanges.map(range => moment(range.end).format('YYYY-MM-DD'))
    );

    // Identify overlapping dates
    const overlappingDates = new Set(
      [...startBlockedDates].filter(date => endBlockedDates.has(date))
    );

    // Collect all internal blocked dates (excluding start and end dates)
    const allBlockedDates = new Set();
    blockedDateRanges.forEach(range => {
      const rangeDuration = moment(range.end).diff(moment(range.start), 'days');

      if (rangeDuration > 1) {
        // Multi-night reservation: block internal dates only
        let current = moment(range.start).add(1, 'days');
        while (current.isBefore(moment(range.end), 'day')) {
          allBlockedDates.add(current.format('YYYY-MM-DD'));
          current.add(1, 'days');
        }
      }
      // Do not block the start and end dates of reservations
    });

    let className = '';
    let tooltip = '';

    if (overlappingDates.has(dayStr)) {
      className = calendarStyles.overlappingBlocked; // Apply purple style
      tooltip = 'Dia de salida y entrada de huespedes';
    } else if (startBlockedDates.has(dayStr) || endBlockedDates.has(dayStr)) {
      className = calendarStyles.singleNightBlocked; // Apply yellow style
      tooltip = 'Fecha de inicio o fin de reserva';
    } else if (allBlockedDates.has(dayStr)) {
      className = calendarStyles.multiNightBlocked; // Apply red style
      tooltip = 'Fecha no disponible';
    }

    // Debugging: Log which class is applied
    // Uncomment the line below to see logs in the console
    // console.log(`Day: ${dayStr}, Class: ${className}, Tooltip: ${tooltip}`);

    return (
      <div
        className={`${calendarStyles.dayCell} ${className}`}
        title={tooltip}
      >
        {day.format("D")}
      </div>
    );
  };

  return (
    <div>
      <h2>Propiedades:</h2>
      <div className={calendarStyles.propertiesGrid}>
        {properties.map(property => (
          <div key={property.id} className={calendarStyles.propertyItem}>
            <div className={calendarStyles.propertyHeader}>
              <strong>{property.title}</strong>
              <button 
                onClick={() => handleEdit(property.id)} 
                className={calendarStyles.manageButton}
              >
                Administrar
              </button>
            </div>
            <div className={calendarStyles.calendarContainer}>
              <DayPickerSingleDateController
                date={null} // No date selected
                onDateChange={() => {}}
                isDayBlocked={day => isDayBlocked(day, property)}
                numberOfMonths={1}
                hideKeyboardShortcutsPanel
                noBorder
                navPrev={null}
                navNext={null}
                renderDayContents={day => renderDayContents(day, property)} // Corrected prop name
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(PropertyManageList);
