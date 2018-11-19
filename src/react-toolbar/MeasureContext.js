import React from 'react';

const defaultContextValue = {
    onMeasure: (key, size) => {}
};

const MeasureContext = React.createContext(defaultContextValue);

export default MeasureContext;
