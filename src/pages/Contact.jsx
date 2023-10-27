import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { validateEmail } from "../utils/helpers";
import emailjs from '@emailjs/browser'

export default function Contact() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const handleInputChange = (e) => {
        
        const { target } = e
        const inputType = target.name
        const inputValue = target.value

        if(inputType === 'name'){
            setName(inputValue)
        } else if(inputType === 'email'){
            setEmail(inputValue)
        }else if (inputType === 'subject'){
            setSubject(inputValue)
        }else{
            setMessage(inputValue)
        }
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if(!message || !email | !name || !subject){
            alert('Please fill out all fields, thank you')
            return
        }
        if(!validateEmail(email)){
            alert('Email format is invalid')
            return
        }
      
        let form = document.getElementById('contact-form')
        emailjs.sendForm('service_603mx0m', 'template_x04vxpm', form, 'ZgucGgPcbHdpduhSp')
        .then((result) => {
          console.log(result.text);
          }, (error) => {
          console.log(error.text);
          });

        setName('');
        setEmail('');
        setMessage('')
        setSubject('')
        alert(`message sent!`);
    }


    return(
        <div>
  
<section className="mb-4">


    <h2 className="font-weight-bold text-center my-4 contact_header">Contact me</h2>

    <div className="row">


        <div className="col-md-9 mb-md-0 mb-5 mx-auto">
            <form id="contact-form" name="contact-form" action="mail.php" method="POST">


                <div className="row">


                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <label>Your name</label>
                            <input type="text" id="name" name="name" className="form-control" onChange={handleInputChange} value={name}/>
                        </div>
                    </div>


                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <label>Your email</label>
                            <input type="text" id="email" name="email" className="form-control" onChange={handleInputChange} value={email}/>
                        </div>
                    </div>


                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="md-form mb-0">
                            <label>Subject</label>
                            <input type="text" id="subject" name="subject" className="form-control" onChange={handleInputChange} value={subject}/>  
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-12">

                        <div className="md-form">
                            <label>Your message</label>
                            <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea" onChange={handleInputChange} value={message}></textarea>
                        </div>

                    </div>
                </div>


            </form>

            <div className="text-center text-md-left">
                <a className="btn btn-dark" onClick={handleFormSubmit}>Send</a>
            </div>
            <div className="status"></div>
        </div>

    </div>

</section>
        </div>
    )
}
