import Link from "next/link"
import Slider from "react-slick"
const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows: false,
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false,
            }
        },
    ]
}

export default function Footer1() {
    return (
        <>
            <footer>
                <div className="footer-area">
                    <div className="container">
                  
                        <div className="footer-top">
                            <div className="row">
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="footer-widget">
                                        <h4 className="fw-title">Use Case</h4>
                                        <div className="footer-link">
                                            <ul className="list-wrap">
                                                <li><Link href="/contact">For teams</Link></li>
                                                <li><Link href="/contact">For blog writer</Link></li>
                                                <li><Link href="/contact">For social media</Link></li>
                                                <li><Link href="/contact">Report  Outage</Link></li>
                                                <li><Link href="/contact">Email Marketing</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="footer-widget">
                                        <h4 className="fw-title">company</h4>
                                        <div className="footer-link">
                                            <ul className="list-wrap">
                                                <li><Link href="/contact">Affiliate program</Link></li>
                                                <li><Link href="/login">Account</Link></li>
                                                <li><Link href="/contact">Invite a friend</Link></li>
                                                <li><Link href="/contact">Privacy policy</Link></li>
                                                <li><Link href="/contact">Terms of use</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                                    <div className="footer-widget">
                                        <h4 className="fw-title">Product</h4>
                                        <div className="footer-link">
                                            <ul className="list-wrap">
                                                <li><Link href="/">DEX. AI</Link></li>
                                                <li><Link href="/work">Our work</Link></li>
                                                <li><Link href="/about">About us</Link></li>
                                                <li><Link href="/help">Support</Link></li>
                                                <li><Link href="/contact">Contact us</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                                    <div className="footer-widget">
                                        <h4 className="fw-title">Need help?</h4>
                                        <div className="footer-contact">
                                            <Link href="tel:0123456789" className="phone">+(1) 123 656 7866</Link>
                                            <Link href="mailto:dex.aiinfotive@.com" className="email">dex.ai infotive@.com</Link>
                                            <Link href="mailto:dex.aiinfotive@.com" className="email">webdexai.com</Link>
                                        </div>
                                        <div className="footer-social">
                                            <ul className="list-wrap">
                                                <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-pinterest-p" /></Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-6">
                                    <div className="footer-widget">
                                        <div className="footer-newsletter">
                                            <h6 className="title">Join our AI experts community</h6>
                                            <p>Meet and learn from 70k+ creators  companies</p>
                                            <Link href="/contact" className="btn btn-two">join the community</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="copyright-text">
                                        <p>Copyright © {new Date().getFullYear()} DEX.AI All rights reserved.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="footer-menu">
                                        <ul className="list-wrap">
                                            <li><Link href="/contact">Terms  Conditions</Link></li>
                                            <li><Link href="/contact">Refund Policy</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}
