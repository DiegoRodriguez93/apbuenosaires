import React, { useRef, useState } from 'react';
import styles from './/PropertyUploader.module.css'; // Ensure the path is correct
import { Spinner } from 'react-bootstrap';
import { db, storage } from '../../firebase'; // Ensure these imports match your project setup
import withAuth from '../../hoc/withAuth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Storage functions
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { doc, updateDoc } from 'firebase/firestore'; // Import Firestore functions


const PropertyUploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imagesRef = useRef();
  const mts2Ref = useRef();
  const bathroomsRef = useRef();
  const addressRef = useRef();
  const bedroomsRef = useRef();
  const garageRef = useRef();
  const neighborhoodRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const title = titleRef.current.value;
    const price = priceRef.current.value;
    const description = descriptionRef.current.value;
    const images = imagesRef.current.files;
    
    const propertyData = {
      title,
      price,
      description,
      mts2: mts2Ref.current.value,
      bathrooms: bathroomsRef.current.value,
      bedrooms: bedroomsRef.current.value,
      garage: garageRef.current.checked,
      address: addressRef.current.value,
      neighborhood: neighborhoodRef.current.value,
      latitude: parseFloat(latitudeRef.current.value) || null,
      longitude: parseFloat(longitudeRef.current.value) || null,
    };


    const propertyId = await savePropertyData(propertyData);
    const imageUrls = await uploadPropertyImages(images, propertyId);

  
    await updatePropertyData(propertyId, { images: imageUrls });

    setIsSubmitting(false);
  
    alert('Property uploaded successfully!');
   };

   async function savePropertyData(propertyData) {
    try {
      const docRef = await addDoc(collection(db, 'properties'), propertyData);
      return docRef.id;
    } catch (error) {
      console.error('Error saving property data:', error);
      throw error;
    }
  }
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
    try {
      const propertyDocRef = doc(db, 'properties', propertyId);
      await updateDoc(propertyDocRef, updatedData);
    } catch (error) {
      console.error('Error updating property data:', error);
      throw error;
    }
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.formAndSpinnerContainer}>
      {isSubmitting && (
    <div className={styles.spinner}>
    <Spinner />
  </div>
)}

        <h1>Subir Propiedad</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="title" className={styles.formLabel}>Título:</label>
          <input type="text" id="title" name="title" ref={titleRef} className={styles.formInput} required />
  
          <label htmlFor="price" className={styles.formLabel}>Precio por noche:</label>
          <input type="number" id="price" name="price" ref={priceRef} className={styles.formInput} />
  
          <label htmlFor="description" className={styles.formLabel}>Descripción:</label>
          <textarea id="description" name="description" ref={descriptionRef} className={styles.formTextarea} ></textarea>
  
          <label htmlFor="images" className={styles.formLabel}>Imágenes:</label>
          <input type="file" id="images" name="images" ref={imagesRef} multiple className={styles.formInput}  />  

          <label htmlFor="mts2" className={styles.formLabel}>Metros cuadrados totales:</label>
          <input type="number" id="mts2" name="mts2" ref={mts2Ref} className={styles.formInput}  />
  
  
          <label htmlFor="bedrooms" className={styles.formLabel}>Habitaciones:</label>
<select id="bedrooms" name="bedrooms" ref={bedroomsRef} className={styles.formInput} >
  <option value="">Select</option>
  <option value="0">Monoambiente</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">4+</option>
</select>

<label htmlFor="bathrooms" className={styles.formLabel}>Baños:</label>
<select id="bathrooms" name="bathrooms" ref={bathroomsRef} className={styles.formInput} >
  <option value="">Select</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">4+</option>
</select>
  
          <label htmlFor="garage" className={styles.formLabel}>Cochera:</label>
          <input type="checkbox" id="garage" name="garage" ref={garageRef} className={styles.formCheckbox} />
  
  
          <label htmlFor="address" className={styles.formLabel}>Dirección:</label>
          <input type="text" id="address" name="address" ref={addressRef} className={styles.formInput}  />
  

          <label htmlFor="neighborhood" className={styles.formLabel}>Barrio:</label>
          <input type="text" id="neighborhood" name="neighborhood" ref={neighborhoodRef} className={styles.formInput} required />

  
          <label htmlFor="latitude" className={styles.formLabel}>Latitud:</label>
          <input type="text" id="latitude" name="latitude" ref={latitudeRef} className={styles.formInput} />
  
          <label htmlFor="longitude" className={styles.formLabel}>Longitud:</label>
          <input type="text" id="longitude" name="longitude" ref={longitudeRef} className={styles.formInput} />
  
          <button type="submit" className={styles.formButton}>Subir propiedad</button>

        </form>
      </div>
    </div>
  );
};

export default withAuth(PropertyUploadForm);