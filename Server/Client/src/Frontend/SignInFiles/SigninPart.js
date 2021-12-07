import React,{useState,useContext,useRef,useEffect} from 'react'
import {BsFillEyeSlashFill as Eyecross} from "react-icons/bs";
import {BsFillEyeFill as Eye} from "react-icons/bs";
import {BiError} from "react-icons/bi";
import Inputs from './Inputs'
import Context from '../HooksFiles/Context'
import usePasswordValidator from 'react-use-password-validator'
import ConfirmationCode from './ConfirmationCode'
import validator from 'email-validator'
import axios from 'axios'

function SigninPart(props) {

    const {
        tab,
        login,
        resetKeys,
        showpassword,
        setshowpassword,
        confirmationCodeInput,
        setconfirmationCodeInput,
        signupmessage,
        setsignupmessage,
        signinInputNo,
        setsigninInputNo,
        confirmCode,
        setconfirmCode,
        signInFirstNameInputRef,
        signInEmailInputRef,
        signInPasswordInputRef
        
    }=props

    let {state,dispatch}=useContext(Context)  
    let [username,setusername]=useState('')
    let [useremail,setuseremail]=useState('')
    let [userpassword,setuserpassword]=useState('')
    let [signinErrorsEmailDBCheck,setsigninErrorsEmailDBCheck]=useState(false)
    let [inCompleteCodeError,setinCompleteCodeError]=useState(false)

    const SignIn= {display: login ? "none": "block" , width:"100%", height:"53%" ,cursor: "pointer"}

    // ------------------------- States for SignIn Errors -------------------------// 

    let [allFieldMandatorySigninErrror,setallFieldMandatorySigninErrror]=useState(false)
    let [signinErrorsUsername,setsigninErrorsUsername]=useState(false)
    let [signinErrorsEmail,setsigninErrorsEmail]=useState(false)
    let [signinErrorsPassword,setsigninErrorsPassword]=useState(false)

    // const signinFieldsError=!signinErrorsUsername && !signinErrorsEmail  && !signinErrorsPassword
        
    let [ isValid, setIsValid ] = usePasswordValidator({
            digits: 2,
            lowercase: true,
            uppercase: 1,
            spaces: false
        })
    // ------------------------- First Sign Up button -------------------------//
    
    const firstSignupbtn=async()=>{
        
            
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
 
     
    useEffect(() => {

        if(tab==="signin"){
        
            if(signinInputNo===1 ) signInFirstNameInputRef.current.focus()        
            if(signinInputNo===2 ) signInEmailInputRef.current.focus()
            if(signinInputNo===3 ) signInPasswordInputRef.current.focus()

        }
        
    },[tab])

     
    return (
        <div style={SignIn}  id='signin'>
               
            <div className="signinfoam-divno7">


                <Inputs 
                inputReference={signInFirstNameInputRef}
                inputType="text"
                inputClassName="inputstyl"
                inputPlaceholder="First Name"
                inputValue={username}
                inputOnchangeFunction={(e)=>setusername(e.target.value)}
                inputOnfocusFunction={()=>{setsigninInputNo(1);resetKeys()}}
                inputMaxLength={3}
                inputMinLength={10}/>

                <div id='signin_errors_name' style={{display: signinErrorsUsername ? 'block' : "none" }}>
        
                    <BiError/> Name is already taken !
        
                </div>
            
            </div>

            <div className="signinfoam-divno8">
                
                <Inputs 
                inputReference={signInEmailInputRef}
                inputType="text"
                inputClassName="inputstyl2"
                inputPlaceholder="Email"
                inputValue={useremail}
                inputOnchangeFunction={(e)=>setuseremail(e.target.value)}
                inputOnfocusFunction={()=>{setsigninInputNo(2);resetKeys()}}
                inputMaxLength={null}
                inputMinLength={null}/>


                <div id='signin_errors_email' style={{display: signinErrorsEmail ? 'block' : "none" }}>
                
                    <BiError className='signin_error_icon'/> Email Must Valid !
                
                </div>
        
                <div id='signin_errors_email' style={{display: signinErrorsEmailDBCheck ? 'block' : "none" }}>
                    
                    <BiError className='signin_error_icon'/> Account already available !
                    
                </div>
                
            </div>
            
            <div className="signinfoam-divno9">
                
                <Inputs 
                inputReference={signInPasswordInputRef}
                inputType={showpassword ? "text" : "password" } 
                inputClassName="inputstyl3"
                inputPlaceholder="Password"
                inputValue={userpassword}
                inputOnchangeFunction={(e)=>{setuserpassword(e.target.value);setIsValid(e.target.value)}}
                inputOnfocusFunction={()=>{setsigninInputNo(3);resetKeys()}}
                inputMaxLength={8}
                inputMinLength={20}/>

                <div id='signin_errors_password' style={{display: signinErrorsPassword ? 'block' : "none" }}>
                    
                    <BiError id='signin_error_icon_password' className='signin_error_icon'/> 
                
                    <span style={{position:'absolute',left:"10%",top:"4%"}}>
                
                        Password must be a combination of digits (atleast 2) , lower and uppercase  letters without any spaces
                
                    </span>
                
                </div>
                
                <div id='show_password_icon'  onClick={()=> {return setshowpassword(!showpassword)}}>{showpassword ? <Eyecross/> :<Eye/>}</div>
                
            </div>
            
            <div className="signinfoam-divno10">
            
                <a className='receivemail' style={{marginTop:'4%',display:allFieldMandatorySigninErrror?'none':'block'}}>
               
                    <input type='checkbox' /> Receive welcome emails
               
                </a>
            
                <div id='signin_fill_all_fields_error' style={{display: allFieldMandatorySigninErrror ? 'block' : "none" }}>
               
                    <BiError/> All the fields are mandatory !
               
                </div>
            
            </div>
            
            <div className="signinfoam-divno11">
                
                <button className='btn btn-dark foambtn2' onClick={firstSignupbtn}>
               
                    Sign Up
               
                </button>
            
            </div>
            
            
            <ConfirmationCode 
                username={username}
                useremail={useremail}
                userpassword={userpassword}
                confirmationCodeInput={confirmationCodeInput}
                confirmCode={confirmCode}
                setsignupmessage={setsignupmessage}
                setinCompleteCodeError={(value)=>setinCompleteCodeError(value)}
                setconfirmCode={(value)=>setconfirmCode(value)}
                signupmessage={signupmessage}
                inCompleteCodeError={inCompleteCodeError} 
                setconfirmationCodeInput={(value)=>setconfirmationCodeInput(value)}
            />

    </div>
    )
}

export default SigninPart
