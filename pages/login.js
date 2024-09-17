import DataBg from "@/components/elements/DataBg"
import Header1 from "@/components/layout/header/Header1"
import Header2 from "@/components/layout/header/Header2"
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    const [tokan, setToken] = useState("")
    useEffect(() => {
        const tok=localStorage.getItem("token");
        console.log(tok);
        if(tok!=undefined && tok!=""){
          router.push("/demo");
        }
      }, []);


    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
  
      try {
        const response = await fetch('http://localhost:8000/apilogin/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        const data = await response.json();
  
        console.log(data);
        if(data.access!=""){
          localStorage.setItem("token",data.access);
          router.push("/demo");
        } else {
          // Handle login failure
          setError(data.message || 'Login failed');
        }
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
                                    <h3 className="title">Login to your account</h3>
                                    <span>👋 Welcome back! Please enter your details.</span>
                                    <form  onSubmit={handleSubmit}>
                                        <div className="form-grp">
                                            <label htmlFor="email">Your Email</label>
                                            <input type="email" id="email"
                                             value={email}
                                             onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-grp">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" id="password"
                                             value={password}
                                             onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="password-wrap">
                                            <button type="reset">Forgot Password</button>
                                        </div>
                                        <button type="submit" className="sine-btn">sing in</button>
                                   
                                        <span>Don’t have an account? <a href="/signup">Sign up for free</a></span>
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