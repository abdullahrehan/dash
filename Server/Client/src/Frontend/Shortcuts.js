import React from 'react'

// Login Page Shortkeys Alt+1 for Signin and Alt+2 for Login

const Shortcuts=(ev,keys,setKeys)=> {
   
    if(ev.key==="Alt" || ev.key==="1"|| ev.key==="2"){
        
        if(ev.key==="Alt"){setKeys(["Alt"])}
        if(!keys.includes(ev.key)){

                if(keys.includes("Alt")){
            setKeys([...keys,ev.key])
        }
          
        }
            else if(ev.key==="Alt" && keys.includes("Alt")){
                setKeys(['Alt'])
            }
        
    }                    
     
}

export default Shortcuts
