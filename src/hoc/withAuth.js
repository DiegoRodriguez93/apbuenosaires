import React, { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Adjust the import path as needed
import { Navigate } from 'react-router-dom'; // This is for redirection

/**
 * A Higher-Order Component that wraps a component to enforce authentication.
 * @param Component The component to be wrapped.
 * @returns The wrapped component or a redirection if the user is not authenticated.
 */
const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user); // User is signed in.
        } else {
          setUser(null); // No user is signed in.
        }
        setLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }, []);

    if (loading) {
      return <div>Loading...</div>; // Or any loading indicator you prefer
    }

    if (!user) {
      return <Navigate to="/administrador" replace />;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;