import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth_context';

function PrivateRoute({ children }: any) {
  const { isAuthenticated } = useContext(AuthContext);
  // const isAuthenticated = false;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// PrivateRoute.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default PrivateRoute;
