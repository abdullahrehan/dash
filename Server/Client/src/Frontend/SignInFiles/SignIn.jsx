import React,{useState,useContext,useRef,useEffect} from 'react'
import {RiAccountPinCircleFill} from "react-icons/ri";
import back from '../../images/g.jpg';
import Context from '../HooksFiles/Context'
import Shortcuts from '../Shortcuts.js'
import WelcomePage from './WelcomePage'
import SigninPart from './SigninPart';
import LoginPart from './LoginPart'
import '../../css/SignIn.css'
import axios from 'axios'
  

    function SignIn() { 
//----------------------------------------------------------------Assigning States-------------------------------------------------------------

        let {state,dispatch}=useContext(Context)  
        let [confirmationCodeInput,setconfirmationCodeInput]=useState({inputOne:"",inputTwo:"",inputThree:"",inputFour:""}) // ---- Confirmation Code Inputs which get the code ----//
        let [tab,settab]=useState("signin") //---- Show the current tab (Login or Signin) ----//

        // ------------- Login Greeting Message ----------------//
        
        let [LoginDemoMessage,setLoginDemoMessage]=useState(false)

        // ------------- User SignIn States ----------------//

        let [passwordIncorrectDiv,setpasswordIncorrectDiv]=useState(false) // ----If true than InCorrect Password Message is Shown ----//       
        let [showpassword,setshowpassword]=useState(false)  // ----If true than Password is Shown ----//
        let [confirmCode,setconfirmCode]=useState(false)    // ----If true it will disappear the login/Signin and show confirmationCode page ----//
        
        let [login,setlogin]=useState(false)   // ----If login is true than login Page is Shown ----//
        let [Sigin,setsignin]=useState(true)   // ----If signin is true than sign Page is Shown ----//

        let [signupmessage,setsignupmessage]=useState()
        let [signinInputNo,setsigninInputNo]=useState(1);
        let [loginInputNo,setloginInputNo]=useState(1);
        let [keys,setKeys]=useState([]);
            
        
        
        // ------------- References ----------------//

        const SignInPart=useRef()      // SignIn Div Reference 
        const signInFirstNameInputRef=useRef()
        const signInEmailInputRef=useRef()
        const signInPasswordInputRef=useRef()
        const logInPasswordInputRef=useRef()
        const logInEmailInputRef=useRef()
        

      // ------------------------- Sign In With Demo Account   -------------------------//

    const DemoAccount=()=>{   
        
        const userdetailslogin={email:"Demo",password:"Demo"}   //---- Give email and password to the demo account ----//
        SignInPart.current.style.display='none'                 //---- Hidding SignIn/Login Page ----//
        setLoginDemoMessage(true)                               //---- Showing the Welcome Message ----//

        //---- Sending Api request to /user/login to Signup with demo account ----//

        axios.post(`/user/login`,userdetailslogin, { withCredentials: true })
        .then(res=>!LoginDemoMessage ? dispatch({type:"setAccountData",accData:res.data}):null )     
        
        //---- This code Removes the welcome message after 4 secounds ----//

        setTimeout(() => {
            setLoginDemoMessage(false)
            setTimeout(() => {
                   
            }, 1000);
        }, 4000);
   
      
    }

    //---- Function to Move to the Signin Foam ----//

    const signInFoam=()=>{ 
        setlogin(false);
        setsignin(true);
        settab("signin")
    }

    //---- Function to Move to the login Foam ----//

    const logInFoam=()=>{
        setsignin(false);
        setlogin(true);
        settab("login");
    }

    if(keys[0]==="Alt" && keys[1]==="1"){
            signInFoam()
            setKeys(['Alt'])
        }
        
        if(keys[0]==="Alt" && keys[1]==="2"){
                logInFoam()
                setKeys(['Alt'])
        }       


        useEffect(() => {
            signInFirstNameInputRef.current.focus()    
           
        }, [])

        const resetKeys=()=>{

            setKeys([])

        }

                {/*------------------------------------------------------------ Html Section ------------------------------------------------------------*/}
  
        return (
            <div style={{display:state.accDataVerify.email_verified===true || state.accDataVerify.username!==undefined  ? "none" : "block"}}  onKeyDown={(ev)=>Shortcuts(ev,keys,setKeys)}>
             
                 <header id='header' style={{height:"11vh",position:'absolute',zIndex:2}}>
             
          {/*  ------------------------- Redirect to Main on removing Cookie  ------------------------- */}
         
              <div id='header_username' style={{width:"16%",height:'85%'}}>
           
              </div>
              
              <div id='heading'>
                Share your Data
              </div>
              <div style={{display:"flex",flex:2,justifyContent:'space-around',alignItems:"center"}}>
              </div>
          </header>

            <img id="blured_background_image" src={back}  alt={"Image loading"}/>

            <div className='Signin-page' >

            <div className="siginfoam" style={{display: confirmCode ? 'none' : 'block',zIndex:6}} >
         
            <div ref={SignInPart} style={{width:'100%',height:"100%",position:"inherit",zIndex:1,display: passwordIncorrectDiv ? 'none' : 'block'}}>
            <div className="signinfoam-divno1">
                 
            </div>
    
            <div className="signinfoam-divno2">
                <button className='btn btn-dark foambtn' >
                   <span>Welcome to DataSharing </span>
                </button>
            </div>
    
            <div className="signinfoam-divno3">
                <div className='btn btn-dark foambtn'  onClick={DemoAccount}>
                        <RiAccountPinCircleFill size={32} className="ggl-icon" />Demo Account
                </div>
            </div>
    
            <div className="signinfoam-divno4">
               
                "SignIn with Demo Account as Login System is <wbr/>in testing phase"
            </div>
            
            <div className="signinfoam-divno5"></div>
            
            <div className="signinfoam-divno6">
                <div className="signin-title" id="signin-title" onClick={signInFoam} style={{ borderBottom: Sigin? '2px solid white' :'0px solid black', transition:'0.2s'}}>Sign In</div>
                <div className="login-title" id="login-title" onClick={logInFoam}  style={{ borderBottom: login? '2px solid white' :'0px solid black', transition:'.2s'}}> Log In</div>
            </div>
         
            <SigninPart
                tab={tab}
                login={login}
                resetKeys={resetKeys}
                showpassword={showpassword}
                setshowpassword={(value)=>setshowpassword(value)}
                confirmationCodeInput={confirmationCodeInput}
                setconfirmationCodeInput={(value)=>setconfirmationCodeInput(value)}
                signupmessage={signupmessage}
                setsignupmessage={(value)=>setsignupmessage(value)}
                signinInputNo={signinInputNo}
                setsigninInputNo={(value)=>setsigninInputNo(value)}
                confirmCode={confirmCode}
                setconfirmCode={(value)=>setconfirmCode(value)}
                signInFirstNameInputRef={signInFirstNameInputRef}
                signInEmailInputRef={signInEmailInputRef}
                signInPasswordInputRef={signInPasswordInputRef}
            />

            <LoginPart 
            tab={tab}
            Sigin={Sigin}
            loginInputNo={loginInputNo}
            setloginInputNo={(value)=>setloginInputNo(value)}
            setpasswordIncorrectDiv={(value)=>setpasswordIncorrectDiv(value)}
            resetKeys={resetKeys}
            showpassword={showpassword}
            setshowpassword={(value)=>setshowpassword(value)}
            passwordIncorrectDiv={passwordIncorrectDiv}
            logInPasswordInputRef={logInPasswordInputRef}
            logInEmailInputRef={logInEmailInputRef}
            />
      
            </div>
           
            <WelcomePage LoginDemoMessage={LoginDemoMessage}/> 

            </div>


            </div>

            </div>
        )
    }
    
    export default SignIn
    