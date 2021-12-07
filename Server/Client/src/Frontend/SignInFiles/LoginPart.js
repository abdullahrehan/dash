import React,{useState,useContext,useRef,useEffect} from 'react'
import {BsFillEyeSlashFill as Eyecross} from "react-icons/bs";
import {BsFillEyeFill as Eye} from "react-icons/bs";
import {BiError} from "react-icons/bi";
import {IoMdArrowRoundBack as Back} from "react-icons/io";
import Context from '../HooksFiles/Context'
import axios from 'axios'

function LoginPart(props) {

    const {
        tab,
        Sigin,
        loginInputNo,
        setloginInputNo,
        setpasswordIncorrectDiv,
        resetKeys,
        showpassword,
        setshowpassword,
        passwordIncorrectDiv,
        logInPasswordInputRef,
        logInEmailInputRef
    }=props

    let {state,dispatch}=useContext(Context)  

    let [loginuseremail,setloginuseremail]=useState('')
    let [loginuserpassword,setloginuserpassword]=useState('')
    let [passwordIncorrectPageError,setpasswordIncorrectPageError]=useState(false)

    // ------------------------- States for LogIn Errors  -------------------------//
    
    let [logininErrorsEmail,setlogininErrorsEmail]=useState(false)
    let [logininErrorsPassword,setlogininErrorsPassword]=useState(false)
    let [allFieldMandatoryLoginErrror,setallFieldMandatoryLoginErrror]=useState(false)
    let [passwordWrongUsername,setpasswordWrongUsername]=useState(false)
    let [passwordWrongUserImg,setpasswordWrongUserImg]=useState(false)

    const userdetailslogin={email:loginuseremail,password:loginuserpassword}
    const LogIn = {display: Sigin ? "none" : "block", width:"100%", height:"53%" ,cursor: "pointer"}

    
    // ------------------------- Log In button   -------------------------//

     const loginbtn=()=>{
            
        if(loginuseremail=='' || loginuserpassword==''){setallFieldMandatoryLoginErrror(true)}
       
        else{ 
        setallFieldMandatoryLoginErrror(false)
        loginuseremail.length<3 ? setlogininErrorsEmail(true) :  setlogininErrorsEmail(false)         
        loginuserpassword.length<3 ? setlogininErrorsPassword(true) :setlogininErrorsPassword(false)
        }
      
       
        axios.post(`http://localhost:2000/user/login`,userdetailslogin, { withCredentials: true })
        
        .then(res=>{
        
            if(res.data.msg=='invalid email'){
                setlogininErrorsEmail(true)
            }
            else if(res.data.msg=='password incorrect'){
                setpasswordIncorrectDiv(true)
                setlogininErrorsPassword(true)
                setloginuserpassword('')
                setpasswordWrongUsername(res.data.data[0])
                setpasswordWrongUserImg(res.data.data[1].url)
                setpasswordIncorrectPageError(true)
                console.log(res.data.data[0],res.data.data[1].url)
            }
            else{
                dispatch({type:"setAccountData",accData:res.data});
            }
            
        })        
        
    }


    
    useEffect(() => {

      if(tab==="login"){

            if(loginInputNo===1) logInEmailInputRef.current.focus()    
            if(loginInputNo===2) logInPasswordInputRef.current.focus()
        }
    },[tab])

    return (
        <>
        <div style={LogIn} id='login'>

            <div className="signinfoam-divno12">
                
                <input 
                ref={logInEmailInputRef}
                type="text" 
                className="inputstyl" placeholder="Email"
                value={loginuseremail} 
                onFocus={()=>{setloginInputNo(1);resetKeys()}}
                onChange={(e)=>setloginuseremail(e.target.value)}/>
            
                <div id='login_errors_email' style={{display: logininErrorsEmail ? 'block' : "none" }}>
                    <BiError/> Email does not Match !
                </div>
            
            </div>
        
            <div className="signinfoam-divno13">
                    <input ref={logInPasswordInputRef} type={showpassword ? "text" : "password" } className="inputstyl" placeholder="Password" value={loginuserpassword} onFocus={()=>{setloginInputNo(2);resetKeys()}} onChange={(e)=>setloginuserpassword(e.target.value)}/>
            
                <div id='login_errors_password' style={{display: logininErrorsPassword ? 'block' : "none" }}>
                
                    <BiError/>Password does not matched
                
                </div>
                
                <div id='show_password_icon_login'  onClick={()=> {return setshowpassword(!showpassword)}}>
                    {showpassword ? <Eyecross/> :<Eye/>}
                </div>
            
            </div>

            <div className="signinfoam-divno14">
                
                <a href="#" style={{color:'white',borderBottom:'1 px solid white'}}>Forget Password ?</a>
            
                <div id='login_fill_all_fields_error' style={{display: allFieldMandatoryLoginErrror ? 'block' : "none" }}>
                    <BiError/> All the fields are mandatory !
                </div>
            </div>
       
            <div className="signinfoam-divno15">
                <button className='btn btn-dark foambtn2' onClick={loginbtn}>Log In</button>
            </div>
            
        </div>
           <div style={{display: passwordIncorrectDiv  ? 'block' : 'none'}} id='passwordIncorrectDiv'>
           <Back onClick={()=>{return setpasswordIncorrectDiv(false)}} size={30} style={{cursor:"pointer",position:'absolute'}}/>
           <img src={passwordWrongUserImg} id="passwordIncorrectUserImg"/>
           <span id='passwordIncorrectText'>Hello {passwordWrongUsername} ! </span>
           <span id="passwordIncorrectTextPI" style={{display:passwordIncorrectPageError?"block":"none"}}><br/> Password didn't match </span>
           <div className="passwordIncorrectPasswordDiv"><input type={showpassword ? "text" : "password" } className="passwordIncorrectPasswordInput" placeholder="Password" value={loginuserpassword} onChange={(e)=>{setloginuserpassword(e.target.value);setpasswordIncorrectPageError(false)}}/>
           <div id='show_password_icon_login'  onClick={()=> {return setshowpassword(!showpassword)}} style={{bottom:'55%',cursor:"pointer"}}>{showpassword ? <Eyecross/> :<Eye/>}</div>
           </div>
           <button className="btn btn-dark" id="passwordIncorrectLogonBtn" onClick={loginbtn}>Login</button>
           <a href='/' id='passwordIncorrectForgetText'>Forget Password</a>
           </div>
           </>
    )
}

export default LoginPart
