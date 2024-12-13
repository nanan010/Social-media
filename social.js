
const { useState } = React;

function UserForm(){
    let [showLogin, setShowLogin] = useState(true);

    function OpenSignupPage(){
        setShowLogin(false);
    }
    
    function GoBack(){
        setShowLogin(true);
    }

    function UserSignupForm(){
        return(
            <div>
                <form id="userform">
                    <a id="backToLogin" href="#" onClick={GoBack}>Back</a>
                    <Username></Username>
                    <Password></Password>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" id="cpwd"></input>
                    <Button text={'Sign Up'} onClick={()=>{Signup()}}></Button>
                </form>
            </div>
        );
    } 

    function UserLoginForn(){
        return(
            <div>
                <form id="userform">
                    <Username></Username>
                    <Password></Password>
                    <Button text={'Login'} onClick={Login}></Button>
                    <a id="signup" href="#" onClick={OpenSignupPage}>Sign Up</a>
                </form>
            </div>
        );
    }

    function Signup(){
        preventDefault();
        console.log("Clicked");
    }
    function Login(){
        console.log("Clicked");
    } 

    if(showLogin){
        return(
            <>
                <UserLoginForn/>
            </>
        );
    } else{
        return(
            <>
                <UserSignupForm/>
            </>
        );
    }
}



function Username(){
    return(
        <div className="formElement">
            <label htmlFor="name">User Name/Email</label><br></br>
            <input type="text" id="name"></input>
        </div>
    );
}
function Password(){
    return(
        <div className="formElement">
            <label htmlFor="pwd">Password</label><br></br>
            <input type="password" id="pwd"></input>
        </div>
    );
}

function Button({text, clickfunc}){
    return(<>
        <button onClick={clickfunc} className="buttonClass">{text}</button>
    </>);
}

function SocialMedia(){
    return(
        <div>
            <UserForm></UserForm>
        </div>
    );
}

ReactDOM.render(<SocialMedia />, document.getElementById('root'));