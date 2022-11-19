import React from "react";
import './form.scss'
const Form = () => {
    return (
        <div className="contactFormContainer">
            <div className="contactForm">
                <form action="">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <textarea name="message" id="" cols="30" rows="6" placeholder="Enter your message">
                        </textarea>
                    </div>
                    <div>
                        <button className="contactFormBtn">Send</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
