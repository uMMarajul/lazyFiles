import {BrowserRouter, Route, Routes} from 'react-router'
import {Dashboard, LoginPage, NotFound } from '../pages'
import {ProtectedRoute, PublicRoute} from './protectedRoutes.jsx'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute> }/>
                <Route path="/login" element={<PublicRoute> <LoginPage/> </PublicRoute>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}