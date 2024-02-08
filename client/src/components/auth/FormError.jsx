import React from "react";

const FormError = ({ error }) => {

    return (
        <>
            <p className="error"><i class="fa-solid fa-triangle-exclamation"></i>{error}</p>
        </>
    );
    
};

export default FormError;