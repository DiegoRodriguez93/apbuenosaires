import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import styles from './PropertyDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faRuler, faDollarSign, faCity } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import 'moment/locale/es'; // Import Spanish locale
import { db } from '../../firebase'; // Ensure you have this import if you're using Firebase
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate } from 'react-router-dom';

const PropertyMap = dynamic(() => import('../PropertyMap'), {
  ssr: false,
});

const PropertyDetails = ({ property }) => {
  moment.locale('es');

  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentURL, setCurrentURL] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [blockedDateRanges, setBlockedDateRanges] = useState([]);
  const [adults, setAdults] = useState(1); // Start with 1 adult by default
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const handleReservation = () => {
    navigate('/payment', {
      state: {
        price: totalPrice,
        startDate: startDate.format('DD-MM-YYYY'), // Format the date
        endDate: endDate.format('DD-MM-YYYY'), // Format the date
        guests: adults + children + infants, // Combining adults and children for total guests
        title: property.title,
        // Include any other details you need
      }
    });
  };

  useEffect(() => {
    const fetchBlockedDates = async () => {
      if (property && property.id) {
        const docRef = doc(db, 'properties', property.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setBlockedDateRanges(data.blockedDateRanges || []);
        } else {
          console.log("No such property!");
        }
      }
    };

    fetchBlockedDates();

    if (typeof window !== 'undefined') {
      setCurrentURL(window.location.href);
    }
  }, [property]);

  // Identify single-night blocked dates
  const singleNightBlockedDates = useMemo(() => {
    return blockedDateRanges
      .filter(range => moment(range.end).diff(moment(range.start), 'days') === 1)
      .map(range => moment(range.start));
  }, [blockedDateRanges]);

  // Collect all internal blocked dates (excluding start and end dates)
  const allBlockedDates = useMemo(() => {
    const dates = new Set();

    blockedDateRanges.forEach(range => {
      const rangeDuration = moment(range.end).diff(moment(range.start), 'days');

      if (rangeDuration > 1) {
        // Multi-night reservation: block internal dates only
        let current = moment(range.start).add(1, 'days');
        while (current.isBefore(moment(range.end), 'day')) {
          dates.add(current.format('YYYY-MM-DD'));
          current.add(1, 'days');
        }
      }
      // Do not block the start and end dates of reservations
    });

    return dates;
  }, [blockedDateRanges]);

  // Memoize single-night blocked dates as a set for quick lookup
  const singleNightBlockedDatesSet = useMemo(() => {
    return new Set(singleNightBlockedDates.map(date => date.format('YYYY-MM-DD')));
  }, [singleNightBlockedDates]);

  // Create a set of start dates
  const startBlockedDates = useMemo(() => {
    return new Set(
      blockedDateRanges.map(range => moment(range.start).format('YYYY-MM-DD'))
    );
  }, [blockedDateRanges]);

  // Create a set of end dates
  const endBlockedDates = useMemo(() => {
    return new Set(
      blockedDateRanges.map(range => moment(range.end).format('YYYY-MM-DD'))
    );
  }, [blockedDateRanges]);

  // Create a set of overlapping dates (dates that are both start and end dates)
  const overlappingDates = useMemo(() => {
    const overlap = [...startBlockedDates].filter(date => endBlockedDates.has(date));
    return new Set(overlap);
  }, [startBlockedDates, endBlockedDates]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (!startDate || !endDate || !property.price) return;

      const nights = endDate.diff(startDate, 'days');
      const guestsCount = adults + children; // Assuming infants are free
      const pricePerNight = parseInt(property.price, 10);      

      const total = (pricePerNight + (guestsCount * 5)) * nights;
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [startDate, endDate, adults, children, property.price]);

  if (!property) {
    return <div>Loading property data...</div>;
  }

  const imageGalleryData = property?.images?.map((imageUrl) => ({
    original: imageUrl,
    thumbnail: imageUrl,
  })) || [];

  // Updated isDayBlocked function (includes overlapping dates)
  const isDayBlocked = (day) => {
    const sixMonthsFromNow = moment().add(6, 'months');

    // Block days after six months
    if (day.isAfter(sixMonthsFromNow, 'day')) {
      return true;
    }

    const dayStr = day.format('YYYY-MM-DD');

    // Block internal blocked dates and overlapping dates
    return allBlockedDates.has(dayStr) || overlappingDates.has(dayStr);
  };

  // Updated isRangeIncludingBlockedDates function
  const isRangeIncludingBlockedDates = (startDate, endDate) => {
    if (!startDate || !endDate) return false;

    // Iterate through each day between startDate and endDate (excluding endDate)
    let current = moment(startDate).add(1, 'days');
    while (current.isBefore(endDate, 'day')) {
      const dayStr = current.format('YYYY-MM-DD');
      if (allBlockedDates.has(dayStr) || singleNightBlockedDatesSet.has(dayStr)) {
        return true;
      }
      current.add(1, 'days');
    }

    return false;
  };

  const handleDatesChange = ({ startDate: newStartDate, endDate: newEndDate }) => {
    if (focusedInput === 'startDate') { // User is selecting the start date
      if (newStartDate && singleNightBlockedDates.some(singleDate => singleDate.isSame(newStartDate, 'day'))) {
        // Prevent selecting a checkout-only date as start date
        setStartDate(null);
        setEndDate(null);
        alert('No se puede seleccionar una fecha de solo checkout como fecha de llegada.');
      } else {
        setStartDate(newStartDate);
        setEndDate(null); // Clear end date on new start date selection
      }
    } else if (focusedInput === 'endDate') { // User is selecting the end date
      if (newStartDate && newEndDate && isRangeIncludingBlockedDates(newStartDate, newEndDate)) {
        // Range includes blocked dates
        setEndDate(null);
        alert('El rango seleccionado incluye fechas bloqueadas. Por favor, elija un rango diferente.');
      } else {
        setEndDate(newEndDate);
      }
    }
  };

  const GuestSelector = ({ adults, setAdults, children, setChildren, infants, setInfants }) => {
    return (
      <div className={styles.guestSelector}>
        <div className={styles.guestType}>
          <div className={styles.guestTypeLabel}>Adultos</div>
          <div className={styles.buttonsContainer}>
            <button className={styles.guestTypeButton} onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
            <span className={styles.guestTypeSpan}>{adults}</span>
            <button className={styles.guestTypeButton} onClick={() => setAdults(adults + 1)}>+</button>
          </div>
        </div>
        <div className={styles.guestType}>
          <div className={styles.guestTypeLabel}>Niños</div>
          <div className={styles.buttonsContainer}>
            <button className={styles.guestTypeButton} onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
            <span className={styles.guestTypeSpan}>{children}</span>
            <button className={styles.guestTypeButton} onClick={() => setChildren(children + 1)}>+</button>
          </div>
        </div>
        <div className={styles.guestType}>
          <div className={styles.guestTypeLabel}>Bebés</div>
          <div className={styles.buttonsContainer}>
            <button className={styles.guestTypeButton} onClick={() => setInfants(Math.max(0, infants - 1))}>-</button>
            <span className={styles.guestTypeSpan}>{infants}</span>
            <button className={styles.guestTypeButton} onClick={() => setInfants(infants + 1)}>+</button>
          </div>
        </div>
      </div>
    );
  };

  // Function to render custom day contents
  const renderDayContents = (day) => {
    const dayStr = day.format('YYYY-MM-DD');
    const isSingleNightBlocked = singleNightBlockedDates.some(singleDate => singleDate.isSame(day, 'day'));
    const isBlocked = isDayBlocked(day);

    let className = '';
    let tooltip = '';

    if (isSingleNightBlocked) {
      className = styles.singleNightBlocked; // Apply yellow style
      tooltip = 'Solo Checkout';
    } else if (isBlocked) {
      className = styles.multiNightBlocked; // Default red style
      tooltip = 'Fecha no disponible';
    }

    return (
      <div className={`${styles.dayCell} ${className}`} title={tooltip}>
        {day.format('D')}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{property.title || 'Title Not Available'} </h1>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <ImageGallery items={imageGalleryData} showPlayButton={false} />
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.propertyAndBookingDetails}>

            <h1>Características principales</h1>
            {[
              { icon: faRuler, label: `Mts<sup>2</sup>: ${property.mts2 || 'Mts no disponibles'}` },
              { icon: faBath, label: `Baños: ${property.bathrooms || 'Baños No Disponibles'}` },
              { icon: faBed, label: `Habitaciones: ${property.bedrooms || 'Habitaciones No Disponibles'}` },
              { icon: faCity, label: `Barrio: ${property.neighborhood || 'Barrio no disponible'}` },
              { icon: faDollarSign, label: `A partir de ${property.price || 'Precio no disponible'} USD por noche` },
            ].map(({ icon, label }) => (
              <p key={label}>
                <div className={styles.iconTextWrapper}>
                  <FontAwesomeIcon icon={icon} className={styles.bigIcon} />
                  <span className={styles.characteristic} dangerouslySetInnerHTML={{ __html: label }} />
                </div>
              </p>
            ))}

            <a
              href={`https://wa.me/+5491156167916?text=Hola!%20Estoy%20interesado%20en%20la%20siguiente%20propiedad:%20${encodeURIComponent(currentURL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              <FontAwesomeIcon icon={faWhatsapp} /> Contactar por WhatsApp
            </a>
          </div>

          <div className={styles.bookingDetailsContainer}>
            <h2>Seleccioná tus fechas</h2>

            <div className={styles.calendarContainer}>
              <DateRangePicker
                startDate={startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={handleDatesChange}
                hideKeyboardShortcutsPanel={true}
                startDatePlaceholderText="Llegada"
                endDatePlaceholderText="Salida"        
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                numberOfMonths={1}
                isDayBlocked={isDayBlocked}
                renderDayContents={renderDayContents} // Custom day rendering
                withPortal={typeof window !== 'undefined' && window.innerWidth < 768}
              />
            </div>
            <GuestSelector
              adults={adults}
              setAdults={setAdults}
              children={children}
              setChildren={setChildren}
              infants={infants}
              setInfants={setInfants}
            />

            <div className={styles.totalPrice}>
              <div className={styles.priceInfo}>
                <h2>Precio total</h2>
                <p>{`USD ${totalPrice}`}</p>
              </div>
              <button
                className={styles.reservarButton}
                onClick={handleReservation}
                disabled={!startDate || !endDate} // Button is disabled if either date is not selected
              >
                Reservar
              </button>
            </div>
          </div>
        </div>
      </div>  

      <div className={styles.description}>
        <h2>Descripción</h2>
        <div className={styles.description}>
          <p>{property.description || 'Description Not Available'}</p>
        </div>
      </div>

      <PropertyMap latitude={property.latitude} longitude={property.longitude} />
    </div>
  );
};

export default PropertyDetails;
