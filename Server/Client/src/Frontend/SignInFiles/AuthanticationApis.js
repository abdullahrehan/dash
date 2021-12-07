import React from 'react'

function AuthanticationApis() {



       // ------------------------- First Sign Up button -------------------------//
    
       const firstSignupbtn=async()=>{
        
        const signinFieldsError=!signinErrorsUsername && !signinErrorsEmail  && !signinErrorsPassword
            
            if(username=='' || useremail=='' || userpassword==''){
          
                setallFieldMandatorySigninErrror(true)
               
            }
            else {
                setallFieldMandatorySigninErrror(false)

                if (!validator.validate(useremail)){
                    setsigninErrorsEmail(true)
                }
                else{
                    setsigninErrorsEmail(false)
                    if(!isValid){setsigninErrorsPassword(true)}
                    else {
                        setsigninErrorsPassword(false)
                        if(!allFieldMandatorySigninErrror && !signinErrorsEmail && !signinErrorsPassword){
              
                      
                     await axios.post(`http://localhost:2000/emailverify`,{email:useremail})
                            .then((res)=>{
                                if(res.data==='available'){
                                    setsigninErrorsEmailDBCheck(false)
                                    axios.post(`http://localhost:2000/nameverify`,{name:username})
                                    .then((res)=>{
                                    
                                    if(res.data==='available'){
                                        setsigninErrorsUsername(false)
                                  
                                        
                                        if(!signinErrorsEmailDBCheck && !signinErrorsUsername){
                                            
                                            setsigninErrorsPassword(false)
                                                axios.post(`http://localhost:2000/user/sendConfirmation`,{name:username,email:useremail}, { withCredentials: true })
                                                .then(res=>{setsignupmessage(res.data)})    
                                                setconfirmCode(true)
                                        }
                                    
                                    }
                                
                                    else{ setsigninErrorsUsername(true)}})
                                }
                                else {setsigninErrorsEmailDBCheck(true) }
                            
                           
                            })}}}}  
    

    }
 


    return (
        <div>
            
        </div>
    )
}

export default AuthanticationApis
