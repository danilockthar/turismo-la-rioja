import React, {useState, useEffect} from 'react'

export const StepContext = React.createContext();

export const StepProvider = (props) => {
    const [step, setStep] = useState(1);


    return(
        <StepContext.Provider value={[step, setStep]}>
                {props.children}
        </StepContext.Provider>
    )
}
