import React, { Fragment } from 'react';
import { useAlert } from 'react-alert';

const Alertt = () => {
    const alert = useAlert();
    alert.error('Device not compatible! Try on a mobile browser');
    return null;
};

export default Alertt;
