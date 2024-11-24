import React, { useState } from "react";

export default function ContactForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const postData = { fullName, email, phone, message };

        try {
            const response = await fetch('https://api.raidai.net/backend/apicontactus/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit the form. Please try again.');
            }

            const result = await response.json();
            setFullName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setSuccess('Your message has been sent successfully!');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="contact-area pb-120" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="contact-form-wrap">
                            <h2 className="title">Do you have <span>questions? Contact us</span></h2>
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="contact-form">
                                        <form onSubmit={handleSubmit}>
                                            {success && <p className="success-message">{success}</p>}
                                            {error && <p className="error-message">{error}</p>}
                                            <div className="form-grp">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    placeholder="Your Name"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-grp">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    placeholder="Your Email*"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-grp">
                                                <input
                                                    type="text"
                                                    id="phone"
                                                    placeholder="Phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-grp">
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    placeholder="Please describe what you need*"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button className="btn" type="submit" disabled={loading}>
                                                {loading ? 'Submitting...' : 'Submit Here'}
                                            </button>
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
