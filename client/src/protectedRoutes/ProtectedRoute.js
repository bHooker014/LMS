import React from 'react';
import { Redirect, Route} from "react-router-dom";

export const ProtectedRoute = ({component: Component, ...rest}) => {

  let run = true

    return (
        <Route {...rest } render ={
            (props) => {
                if (run) {
                return <Component {...props}/>
             }
             else {
                 return  <Redirect to= {
                     {
                         pathname: '/',
                         state: props.location
                         
                     }
                 } />
             }
            }}
        />
    );
};

export default ProtectedRoute