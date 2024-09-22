import Link from "next/link";
import ContactForm from "./ContactForm"; // Import the ContactForm component

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
                                        <p>Choose a licensing plan tailored to your needs, from single-site deployments to multi-location setups. Adapt your subscription as your security requirements change, all while adhering to GDPR and other data regulations—no internet needed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ContactForm /> {/* Include the ContactForm component here */}
        </>
    );
}
