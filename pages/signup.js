import DataBg from "@/components/elements/DataBg"
import Header1 from "@/components/layout/header/Header1"
import Header2 from "@/components/layout/header/Header2"
import { useState, useRef, useEffect } from 'react'

import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        setLoading(true);
        setError(null);
        setSuccess(null);
    
        const postData = { first_name, last_name,phone,country,email,password };
    
        try {
         
          const response = await fetch('http://localhost:8000/apiregister/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(postData),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log(result);
          setSuccess('User registered successfully!');
          router.push('/login');
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

    return (
        <>
            <DataBg />
            <Header1 />
            <main className="main-content">
                <div className="noise-bg" data-background="/assets/img/bg/noise_bg.png" />
                <div className="main-shape" data-background="/assets/img/images/main_shape.png" />
                <section className="login-area">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-md-10">
                                <div className="login-content">
                                    <h3 className="title">Create your account</h3>
                                    <span>👋 Welcome back! Please enter your details.</span>
                                    <form  onSubmit={handleSubmit}>
                                    <div className="form-grp">
                                            <label htmlFor="first_name">First Name</label>
                                            <input type="text" id="first_name"
                                             value={first_name}
                                             onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-grp">
                                            <label htmlFor="last_name">Last Name</label>
                                            <input type="text" id="last_name"
                                             value={last_name}
                                             onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-grp">
                                            <label htmlFor="phone">Phone</label>
                                            <input type="phone" id="phone"
                                             value={phone}
                                             onChange={(e) => setPhone(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-grp">
                                            <label htmlFor="country">Country</label>
                                            <input type="text" id="country"
                                             value={country}
                                             onChange={(e) => setCountry(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-grp">
                                            <label htmlFor="email">Your Email</label>
                                            <input type="email" id="email"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-grp">
                                            <label htmlFor="word">Password</label>
                                            <input type="password" id="password"
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                      
                                        <button type="submit" className="sine-btn">sing up</button>
                                   
                                        <span>have an account? <a href="/login"></a>login</span>
                                    </form>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="login-right-content-wrap">
                                    <div className="login-right-bg" data-background="assets/img/bg/error_bg.jpg" />
                                    <div className="login-right-content-inner">
                                        <img src="assets/img/images/login_img.png" alt="" />
                                        <h4 className="title">Revolutionize your writing: Try <span>AI writer today</span> and watch your content soar</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

        </>
    )
}