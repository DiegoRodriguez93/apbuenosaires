import React, { useRef, useState, useEffect } from 'react';
import styles from './/../PropertyUploader/PropertyUploader.module.css';
import { Spinner } from 'react-bootstrap';
import { db, storage } from '../../firebase';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Storage functions


const EditPropertyForm = ({ property, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingImages, setExistingImages] = useState(property?.images || []);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [startDate, setStartDate] = useState(property && property.availableStartDate ? moment(property.availableStartDate) : null);
  const [endDate, setEndDate] = useState(property && property.availableEndDate ? moment(property.availableEndDate) : null);
    const [focusedInput, setFocusedInput] = useState(null);
  const [blockedDates, setBlockedDates] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [forceUpdate, setForceUpdate] = useState(false);


  const propertyId = property.id;
  const titleRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const mts2Ref = useRef();
  const bathroomsRef = useRef();
  const bedroomsRef = useRef();
  const garageRef = useRef();
  const addressRef = useRef();
  const neighborhoodRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const imagesRef = useRef(); // Ref for file input

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const docRef = doc(db, 'properties', propertyId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setExistingImages(data.images || []);
          setBlockedDates(data.blockedDates || []);
        } else {
          console.log("No such property!");
        }
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  const isDayBlocked = () => false;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const propertyData = {
      availableStartDate: startDate ? startDate.format('YYYY-MM-DD') : null,
      availableEndDate: endDate ? endDate.format('YYYY-MM-DD') : null,
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      mts2: mts2Ref.current.value,
      bathrooms: bathroomsRef.current.value,
      bedrooms: bedroomsRef.current.value,
      garage: garageRef.current.checked,
      address: addressRef.current.value,
      neighborhood: neighborhoodRef.current.value,
      latitude: parseFloat(latitudeRef.current.value) || null,
      longitude: parseFloat(longitudeRef.current.value) || null,
    };


    const newImageUrls = await uploadPropertyImages(imagesRef.current.files, propertyId);
    setNewImages(newImageUrls); 

    const updatedImages = [...existingImages, ...newImageUrls];
    const finalImages = updatedImages.filter(image => !removedImages.includes(image));
    await updatePropertyData(propertyId, { ...propertyData, images: finalImages });
    setIsSubmitting(false);
    alert('Property updated successfully!');
    if (onSubmit) {
      onSubmit();
    }
  };

  async function uploadPropertyImages(images, propertyId) {
    try {
      const imageUrls = [];
  
      for (const image of images) {
        const imagePath = `property_images/${propertyId}/${image.name}`;
        const storageRef = ref(storage, imagePath);
        await uploadBytes(storageRef, image);
        const downloadURL = await getDownloadURL(storageRef);
        imageUrls.push(downloadURL);
      }
  
      return imageUrls;
    } catch (error) {
      console.error('Error uploading property images:', error);
      throw error;
    }
  }

  async function updatePropertyData(propertyId, updatedData) {
    const propertyDocRef = doc(db, 'properties', propertyId);
    await updateDoc(propertyDocRef, updatedData);
  }

  const removeImage = (index) => {
    const updatedImages = [...existingImages];
    const removed = updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
    setRemovedImages([...removedImages, removed[0]]);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    const range = getDatesInRange(startDate, endDate);
    setSelectedDates(range);
  };

  const handleBlockedDaySelection = (day) => {
    // Determine if we're setting the start or end date based on the current focus
    if (!focusedInput || focusedInput === 'startDate') {
      // Manually set the startDate and pretend like it was typed in
      const newStartDate = day;
      setStartDate(newStartDate);
      // If you need to trigger handleDateChange logic, do it here
      handleDateChange({ startDate: newStartDate, endDate });
  
      // Advance focus to the endDate
      setFocusedInput('endDate');
    } else if (focusedInput === 'endDate') {
      // Manually set the endDate and pretend like it was typed in
      const newEndDate = day;
      setEndDate(newEndDate);
      // Trigger any logic that depends on the endDate being set
      handleDateChange({ startDate, endDate: newEndDate });
  
      // Optionally reset focus or set it to startDate
      setFocusedInput(null); // or 'startDate'
    }
  };


  const getDatesInRange = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = moment(startDate).startOf('day');
    const stopDate = moment(endDate).startOf('day');
    while (currentDate.diff(stopDate, 'days') <= 0) {
        dateArray.push(currentDate.format('YYYY-MM-DD'));
        currentDate.add(1, 'days');
    }
    return dateArray;
};

  const handleBlockDates = async () => {
    setBlockedDates([...blockedDates, ...selectedDates]);
    setSelectedDates([]);
    try {
      const propertyDocRef = doc(db, 'properties', propertyId);
      await updateDoc(propertyDocRef, { blockedDates: [...blockedDates, ...selectedDates] });
      // Show a success alert
      alert('Blocked dates updated successfully!');
    } catch (error) {
      console.error('Error updating blocked dates:', error);
      // Show an error alert
      alert('Failed to block dates. Please try again.');
    }
  };

  const handleUnblockDates = async () => {
    const updatedBlockedDates = blockedDates.filter(
      (blockedDateStr) => {
        // Convert string to Moment object for comparison
        const blockedDate = moment(blockedDateStr);
        // Ensure each selectedDate is also a Moment object before comparison
        return !selectedDates.some(selectedDateStr => {
          const selectedDate = moment(selectedDateStr);
          return blockedDate.isSame(selectedDate, 'day');
        });
      }
    );
  
    // Convert updatedBlockedDates back to strings if necessary for Firestore
    const updatedBlockedDatesStr = updatedBlockedDates.map(date => moment(date).format('YYYY-MM-DD'));
  
    try {
      const propertyDocRef = doc(db, 'properties', propertyId);
      await updateDoc(propertyDocRef, { blockedDates: updatedBlockedDatesStr });
      alert('Selected dates have been unblocked successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error unblocking dates:', error);
      alert('Failed to unblock dates. Please try again.');
    }
  };  

  if (!property) {
    return <div>Loading property data...</div>;
  }

  
  return (

    
    <div className={styles.formContainer}>
   <div>
  <DateRangePicker
    minimumNights={0}
    key={blockedDates.length} // This key will force the component to re-render when blockedDates changes
    startDate={startDate} // The currently selected start date
    startDateId="start_date_id" // A string identifier for the start date input
    endDate={endDate} // The currently selected end date
    endDateId="end_date_id" // A string identifier for the end date input
    onDatesChange={handleDateChange} // Handler for date changes
    focusedInput={focusedInput} // The input currently in focus (startDate or endDate)
    onFocusChange={focusedInput => setFocusedInput(focusedInput)} // Handler for changing focus between inputs
    numberOfMonths={1} // Number of calendar months to show
    isDayBlocked={day => blockedDates.some(date => day.isSame(moment(date), 'day'))} // Function to determine if a day is blocked
    renderDayContents={(day) => {
      const isBlocked = blockedDates.some(blockedDate =>
        day.isSame(moment(blockedDate), 'day')
      );
      return (
        <div
          onClick={() => isBlocked && handleBlockedDaySelection(day)}
          // You may want to add a class or style for cursor to indicate it's clickable
          style={{ cursor: isBlocked ? 'pointer' : 'default' }}
        >
          {day.format("D")}
        </div>
      );
    }}
  />
  <button onClick={handleBlockDates}>Block Selected Dates</button>
  <button onClick={() => {
    if (window.confirm("Are you sure you want to unblock the selected dates?")) {
      handleUnblockDates();
    }
  }}>Unblock Selected Dates</button>
</div>
      <div className={styles.formAndSpinnerContainer}>
        {isSubmitting && (
          <div className={styles.spinner}>
            <Spinner />
          </div>
        )}
        <h1>Edit Property</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="title" className={styles.formLabel}>Título:</label>
        <input type="text" id="title" name="title" ref={titleRef} defaultValue={property.title} className={styles.formInput}  />
        
        <label htmlFor="price" className={styles.formLabel}>Precio:</label>
        <input type="number" id="price" name="price" ref={priceRef} defaultValue={property.price} className={styles.formInput}  />
        
        <label htmlFor="description" className={styles.formLabel}>Descripción:</label>
        <textarea id="description" name="description" ref={descriptionRef} defaultValue={property.description} className={styles.formTextarea} ></textarea>
      
    
        <label htmlFor="images" className={styles.formLabel}>Agregar imágenes (Esto suma a las existentes):</label>
          <input type="file" id="images" name="images" ref={imagesRef} multiple className={styles.formInput}  />
        
        <label htmlFor="mts2" className={styles.formLabel}>Metros cuadrados totales:</label>
        <input type="number" id="mts2" name="mts2" ref={mts2Ref} defaultValue={property.mts2} className={styles.formInput}  />
                        
        <label htmlFor="bedrooms" className={styles.formLabel}>Dormitorios:</label>
        <input type="number" id="bedrooms" name="bedrooms" ref={bedroomsRef} defaultValue={property.bedrooms} className={styles.formInput}  />
        
        <label htmlFor="bathrooms" className={styles.formLabel}>Baños:</label>
        <input type="number" id="bathrooms" name="bathrooms" ref={bathroomsRef} defaultValue={property.bathrooms} className={styles.formInput}  />
        
        <label htmlFor="garage" className={styles.formLabel}>Cochera:</label>
        <input type="checkbox" id="garage" name="garage" ref={garageRef} defaultChecked={property.garage} className={styles.formCheckbox} />
        
                
        <label htmlFor="address" className={styles.formLabel}>Dirección:</label>
        <input type="text" id="address" name="address" ref={addressRef} defaultValue={property.address} className={styles.formInput}  />
        
        <label htmlFor="neighborhood" className={styles.formLabel}>Barrio:</label>
        <input type="text" id="neighborhood" name="neighborhood" ref={neighborhoodRef} defaultValue={property.neighborhood} className={styles.formInput}  />


        
        <label htmlFor="latitude" className={styles.formLabel}>Latitud:</label>
        <input type="text" id="latitude" name="latitude" ref={latitudeRef} defaultValue={property.latitude} className={styles.formInput} />
        
        <label htmlFor="longitude" className={styles.formLabel}>Longitud:</label>
        <input type="text" id="longitude" name="longitude" ref={longitudeRef} defaultValue={property.longitude} className={styles.formInput} />

  

          <div className={styles.existingImagesWrapper}>
  <div className={styles.existingImages}>
    {existingImages.map((imageUrl, index) => (
      <div key={index} className={styles.imageContainer}>
        <img src={imageUrl} alt={`Property image ${index + 1}`} className={styles.editPropertyImage} />
        <button type="button" className={styles.removeImageButton} onClick={() => removeImage(index)}>Eliminar</button>
      </div>
    ))}
  </div>
</div>  
 
          <button type="submit" className={styles.formButton}>Save Property</button>
        </form>
      </div>
    </div>
  );
};


export default EditPropertyForm;