import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import PropertyDetails from '../../components/PropertyDetails';
import { Layout } from '../../components/Layout';
import { doc, getDoc } from 'firebase/firestore'; // Import doc and getDoc from the modular SDK

const SingleProperty = () => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const propertyDocRef = doc(db, 'properties', propertyId); // Reference to the property document
        const propertyDocSnapshot = await getDoc(propertyDocRef); // Get the property document snapshot
        if (propertyDocSnapshot.exists()) { // Check if the document exists
          setProperty({ id: propertyDocSnapshot.id, ...propertyDocSnapshot.data() });
        } else {
          console.log('Property not found');
        }
      } catch (error) {
        console.error('Error fetching property data:', error);
      }
    };

    if (propertyId) {
      fetchPropertyData();
    }
  }, [propertyId]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
    <div>
      <main>
        {property ? <PropertyDetails property={property} /> : 'Loading...'}
      </main>
    </div>
    </Layout>

  );
};

export default SingleProperty;