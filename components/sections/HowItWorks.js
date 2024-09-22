import Link from "next/link"


export default function HowItWorks() {
    return (
        <>
            <section className="writing-area pb-120" id="howitwork">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title text-center mb-80">
                            <i className="far fa-cube" />
                         
                                <h2 className="title title-animation">Deploy on your own <br></br><span>Infrastructure</span></h2>
                              
                           
                            </div>
                        </div>
                    </div>
                 
                            <div className="contact-info-wrap">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="contact-info-item">
                                            <div className="icon">
                                            <i className="far fa-chart-line"></i>
                                            </div>
                                            <div className="content">
                                                <h2 className="title">Effortless Installation</h2>
                                                <p>Deploying our solution is simple and secure with a step-by-step installation guide. Configure everything in your environment offline, ensuring a smooth setup process without any need for external network access.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="contact-info-item">
                                            <div className="icon">
                                                <i className="far fa-chart-line" />
                                            </div>
                                            <div className="content">
                                                <h2 className="title">Secure and Self-Contained</h2>
                                                <p>Operate all processes within your isolated infrastructure. With no internet connectivity required, our air-gapped deployment keeps your data fully protected and inaccessible to external threats, maintaining maximum security.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="contact-info-item">
                                            <div className="icon">
                                                <i className="far fa-chart-line" />
                                            </div>
                                            <div className="content">
                                                <h2 className="title">Scalable Licensing</h2>
                                                <p>Choose a licensing plan tailored to your needs, from single-site deployments to multi-location setups. Adapt your subscription as your security requirements change, all while adhering to GDPR and other data regulations—no internet needed.

</p>
                                           
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="contact-form-wrap">
                                        <h2 className="title">Do you have <span>question contact us</span></h2>
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

        </>
    )
}
