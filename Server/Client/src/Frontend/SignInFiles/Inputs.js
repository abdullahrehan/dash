import React from 'react'

function Inputs({inputReference,inputType,inputClassName,inputPlaceholder,inputValue,inputOnchangeFunction,inputOnfocusFunction,inputMaxLength,inputMinLength}) {
    return (
        <input  
        ref={inputReference} 
        type={inputType} 
        className={inputClassName} placeholder={inputPlaceholder} 
        value={inputValue} 
        onFocus={inputOnfocusFunction}
        onChange={inputOnchangeFunction} 
        minLength={inputMaxLength} maxLength={inputMinLength}/>
    )
}

export default Inputs
