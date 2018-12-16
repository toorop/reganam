import React from 'react'


export const LoaderContext = React.createContext({
    isVisible: false,
    setVisibility: (isVisible) => {},
})