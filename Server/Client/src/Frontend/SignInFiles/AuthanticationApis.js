import React from 'react'
import axios from 'axios'

       // ------------------------- First Sign Up button -------------------------//
    
const firstSignupbtn=async(props)=>{
    
    const {
        signinErrorsUsername,
        SetsigninErrorsUsername,
        signinErrorsEmail,
        signinErrorsPassword,
        SetsigninErrorsPassword,
        username,
        useremail,
        userpassword,
        SetallFieldMandatorySigninErrror,
        validator,
        isValid,
        allFieldMandatorySigninErrror,
        Setsignupmessage,
        SetconfirmCode,
        SetsigninErrorsEmail,
        SetsigninErrorsEmailDBCheck,
        signinErrorsEmailDBCheck
        
        
    }=props
    const signinFieldsError=!signinErrorsUsername && !signinErrorsEmail  && !signinErrorsPassword
        
        if(username=='' || useremail=='' || userpassword==''){
        
            SetallFieldMandatorySigninErrror(true)
            
        }
        else {
            SetallFieldMandatorySigninErrror(false)

            if (!validator.validate(useremail)){
                SetsigninErrorsEmail(true)
            }
            else{
                SetsigninErrorsEmail(false)
                if(!isValid){SetsigninErrorsPassword(true)}
                else {
                    SetsigninErrorsPassword(false)
                    if(!allFieldMandatorySigninErrror && !signinErrorsEmail && !signinErrorsPassword){
            
                    
                    await axios.post(`http://localhost:2000/emailverify`,{email:useremail})
                        .then((res)=>{
                            if(res.data==='available'){
                                SetsigninErrorsEmailDBCheck(false)
                                axios.post(`http://localhost:2000/nameverify`,{name:username})
                                .then((res)=>{
                                
                                if(res.data==='available'){
                                    SetsigninErrorsUsername(false)
                                
                                    
                                    if(!signinErrorsEmailDBCheck && !signinErrorsUsername){
                                        
                                        SetsigninErrorsPassword(false)
                                            axios.post(`http://localhost:2000/user/sendConfirmation`,{name:username,email:useremail}, { withCredentials: true })
                                            .then(res=>{Setsignupmessage(res.data)})    
                                            SetconfirmCode(true)
                                    }
                                
                                }
                            
                                else{ SetsigninErrorsUsername(true)}})
                            }
                            else {SetsigninErrorsEmailDBCheck(true) }
                        
                        
                        })}}}}  


}


export default firstSignupbtn
