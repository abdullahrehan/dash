import React,{useState,useContext} from 'react'
import {BiError} from "react-icons/bi";
import back from '../../images/g.jpg';
import {IoMdArrowRoundBack as Back} from "react-icons/io";
import axios from 'axios'
import Context from '../HooksFiles/Context'

function ConfirmationCode(porps) {
    
    const {
        username,
        useremail,
        userpassword,
        confirmCode,
        setsignupmessage,
        setinCompleteCodeError,
        setconfirmCode,
        signupmessage,
        inCompleteCodeError,
        confirmationCodeInput,
        setconfirmationCodeInput
    }=porps


    
    let {state,dispatch}=useContext(Context)  
    let Confirmation_Code=confirmationCodeInput.inputOne+confirmationCodeInput.inputTwo+confirmationCodeInput.inputThree+confirmationCodeInput.inputFour
    let userdetails={name:username,email:useremail,password:userpassword,confirmation_Code:Confirmation_Code}
    
    const secoundSignupbtn=()=>{
        
        // -------- Creating new Model in Database for the User -------- //
 
         axios.post(`http://localhost:2000/user/SignIn`,userdetails, { withCredentials: true })
         .then(res=>{
        
         
         if(res.data=='Data Inserted'){
 
             axios.post(`http://localhost:2000/setMainfolder`,{email:useremail,name:username})
             jwtfunction()
        
         }
         else if(res.data==="Incorrect"){
             setsignupmessage(`Confirmation code is incorect`);
         }
         
         console.log(res.data,"Incorrect")
        
     })
         
         setconfirmCode(true)  // ------ Tells that ConfirmationCode is confirmed Now Remove The SignIn Div
 
         
        // -------- if Confirmation Code is Incomplete -------- //
 
         if(Confirmation_Code.length!==4){ 
             
             setinCompleteCodeError(true)
         
         }
         else{ setinCompleteCodeError(false) } 
        
 
         
     }
 


  // ------------------------- Confirm Sign Up button   -------------------------//

  const jwtfunction=()=>{ 
    
    axios("/jwt",{withCredentials: true})
    
    .then(res=>{

      if (res.status !== 200) { console.log('Looks like there was a problem. Status Code: ' + res.status); }

      else{ return res.data[0] }
    
    })
    
    .then(res2=> res2!==undefined ? dispatch({type:"setAccountData",accData:res2}) : null )
  

}


    return (
        <div id='confirmation_code' style={{display:confirmCode ? 'block' : 'none'}}>
        <Back onClick={()=>{return setconfirmCode(false)}} size={30} style={{cursor:"pointer"}}/>
       
        <div id='confirmation_code_header_text' >
        <a style={{fontSize:'1.2em'}}>We have sent an activation code on your email</a>
        <a > Write the received code in the section below </a>
        </div>

         <div id='confirmation_code_inputs_maindiv'>
        <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setconfirmationCodeInput({...confirmationCodeInput,inputOne:e.target.value})}}/>
        <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setconfirmationCodeInput({...confirmationCodeInput,inputTwo:e.target.value})}}/>
        <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setconfirmationCodeInput({...confirmationCodeInput,inputThree:e.target.value})}}/>
        <input type='text'id='confirmation_code_input1' maxLength={1} onChange={(e)=>{return setconfirmationCodeInput({...confirmationCodeInput,inputFour:e.target.value})}}/>
        </div> 
       
        <button id='confirmation_code_submit_btn' className='btn btn-dark' onClick={secoundSignupbtn} >Submit</button>
        <div id="confirmation_code_incorrect_error">{signupmessage}</div>
        <div id='confirmation_code_incomplete_error' style={{display: inCompleteCodeError ? "block" : "none"}}><BiError/>  All the filds Are Mandatory</div>
        <div id='confirmation_code_resend_email_text'>If you haven't received any email yet .<br/>Click this Link :<a href='/'> Resend Email </a> </div>
   
        
        </div>
    )
}

export default ConfirmationCode
