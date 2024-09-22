import React from "react";

export default function ContactForm() {
    return (
        <section className="contact-area pb-120" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="contact-form-wrap">
                            <h2 className="title">Do you have <span>question? Contact us</span></h2>
                            <div className="row">
                                <div className="col-lg-5">
                                    <div className="responds-wrap">
                                        <ul className="list-wrap">
                                            <li><img src="assets/img/images/m_voice_img01.png" alt="" /></li>
                                            <li><img src="assets/img/images/m_voice_img02.png" alt="" /></li>
                                            <li><img src="assets/img/images/m_voice_img03.png" alt="" /></li>
                                            <li><img src="assets/img/images/m_voice_img04.png" alt="" /></li>
                                            <li><img src="assets/img/images/m_voice_img05.png" alt="" /></li>
                                        </ul>
                                        <p>Responds in 4-8 hours</p>
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <div className="contact-form">
                                        <form action="#">
                                            <div className="form-grp">
                                                <input type="text" id="name" placeholder="Your Name" required />
                                            </div>
                                            <div className="form-grp">
                                                <input type="email" id="email" placeholder="Your email*" required />
                                            </div>
                                            <div className="form-grp">
                                                <input type="text" id="phone" placeholder="Phone" required />
                                            </div>
                                            <div className="form-grp">
                                                <textarea name="message" id="message" placeholder="Please describe what you need*" />
                                            </div>
                                            <button className="btn" type="submit">submit here</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-shape">
                                <img src="assets/img/images/contact_shape.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
