import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './PropertyDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faBath, faCar, faRuler, faDollarSign , faHandHoldingDollar, faCity, faAlignCenter } from '@fortawesome/free-solid-svg-icons';
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
  const [blockedDates, setBlockedDates] = useState([]);
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
          setBlockedDates(data.blockedDates || []);
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

  const isDayBlocked = day => {
    const sixMonthsFromNow = moment().add(6, 'months');
    
    // Check if the day is within the blockedDates array
    const isBlockedDate = blockedDates.some(blockedDate => day.isSame(moment(blockedDate), 'day'));
  
    // Check if the day is more than 6 months in the future
    const isAfterSixMonths = day.isAfter(sixMonthsFromNow, 'day');
    
    return isBlockedDate || isAfterSixMonths;
  };

  const isRangeIncludingBlockedDates = (startDate, endDate, blockedDates) => {
    let currentDate = moment(startDate);
    while (currentDate <= moment(endDate)) {
      if (blockedDates.some(blockedDate => currentDate.isSame(moment(blockedDate), 'day'))) {
        return true; // Found a blocked date within the range
      }
      currentDate = currentDate.add(1, 'days');
    }
    return false; // No blocked dates within the range
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    if (!focusedInput) { // First selection (start date)
      setStartDate(startDate);
      setEndDate(null); // Clear end date on start date selection
    } else if (!startDate || !endDate || !isRangeIncludingBlockedDates(startDate, endDate, blockedDates)) {
      // Update dates if no blocked dates are within the range
      setStartDate(startDate);
      setEndDate(endDate);
    } else {
      // Optionally, reset the dates or show an error message
      console.log('Selected range includes blocked dates.');
      // Keep or reset the dates based on your needs
      // Example: Resetting end date
      setEndDate(null);
      alert('El rango seleccionado incluye fechas bloqueadas. Por favor, elija un rango diferente.');
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
            //{ icon: faHandHoldingDollar, label: `Precio: ${property.price ? `USD ${property.price}` : 'Precio no disponible'}` },
            { icon: faRuler, label: `Mts<sup>2</sup>: ${property.mts2 || 'Mts no disponibles'}` },
            { icon: faBath, label: `Baños: ${property.bathrooms || 'Baños Not Available'}` },
            { icon: faBed, label: `Habitaciones: ${property.bedrooms || 'Habitaciones Not Available'}` },
            { icon: faCity, label: `Barrio: ${property.neighborhood || 'Barrio no disponible'}` },
            { icon: faDollarSign, label: `A partir de ${property.price || 'Barrio no disponible'} USD por noche` },
          ].map(({ icon, label }) => (
            <p key={label}>
              <div className={styles.iconTextWrapper}>
                <FontAwesomeIcon icon={icon} className={styles.bigIcon} />
                <span className={styles.characteristic} dangerouslySetInnerHTML={{ __html: label }} />
              </div>
            </p>
          ))}

          <a
            href={`https://wa.me/+5491156167916?text=Hola!%20Estoy%20interesado%20en%20la%20siguiente%20propiedad:%20${encodeURIComponent(
              currentURL
            )}`}
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
          withPortal={window.innerWidth < 768}
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
</button>      </div>
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