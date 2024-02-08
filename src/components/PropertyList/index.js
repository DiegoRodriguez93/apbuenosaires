import React from 'react';
import Link from 'next/link';
import styles from './FilteredPropertyList.module.css'; // Ensure the path is correct

const PropertyList = ({ properties, loading }) => {
  if (loading || !properties || properties.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.propertyList}>
      {properties.map((property) => (
        property && property.id ? (
          <Link href={`/property/${property.id}`} key={property.id} passHref>
            <div className={styles.propertyCard}>
              <div
                className={styles.propertyImage}
                style={{ backgroundImage: `url(${property.images && property.images[0] ? property.images[0] : ''})` }}
              />
              <div className={styles.propertyInfo}>
                <h3 className={styles.propertyTitle}>{property.title || 'No Title'}</h3>
                <p className={styles.propertyPrice}>{property.price ? `${property.price} USD` : 'Price not available'}</p>
                <p className={styles.propertyDetails}>
                  {property.description 
                    ? (property.description.length > 100 
                      ? `${property.description.substring(0, 100)}...`
                      : property.description)
                    : 'No Description'}
                </p>
              </div>
            </div>
          </Link>
        ) : null
      ))}
    </div>
  );
};

export default PropertyList;
