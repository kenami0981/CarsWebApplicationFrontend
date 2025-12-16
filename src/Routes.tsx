import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import App from "./App";
import CarList from "./Components/CarList";
import CarDetails from "./Components/CarDetails";
import NotFound from "./Components/NotFound";
import CarForm from "./Components/CarForm";
import Login from "./Components/Login";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        children: [
            {path: 'cars', element: <CarList />},
            {path: 'cars/:id', element: <CarDetails />},
            {path: 'edit/:id', element: <CarForm />},
            {path: 'add-car', element: <CarForm />},
            {path: 'not-found', element: <NotFound />},
            {path: 'login', element: <Login/>},
            {path: '*', element: <Navigate replace to='/not-found' />}


        ]
    }
]
export const router = createBrowserRouter(routes);