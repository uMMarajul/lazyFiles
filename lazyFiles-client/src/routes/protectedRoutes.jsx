import { Navigate } from "react-router-dom";

import Cookies from 'js-cookie';


function ProtectedRoute({ children }) {

    const isLoggedIn = Cookies.get('access-token');

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
function PublicRoute({ children }) {

    const isLoggedIn = Cookies.get('access-token');

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export {
    ProtectedRoute,
    PublicRoute
}