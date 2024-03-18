import React from 'react'
import Template from '../components/common/Template'
import signupImg from '../assets/Images/signup.webp'
function SignUp(props) {
 let setIsLoggedIn=props.setIsLoggedIn
  return (
    <Template
    title="Join the millions learning to code with StudyNotion for free"
    desc1="Build skills for today, tomorrow, and beyond."
    desc2='Education to future-proof your career.'
    image={signupImg}
    formtype="signup"
    setIsLoggedIn={setIsLoggedIn}
    ></Template>
  )
}

export default SignUp