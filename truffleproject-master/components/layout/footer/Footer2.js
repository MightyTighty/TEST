import Link from "next/link"

export default function Footer2() {
    return (
        <>
            <footer>
                <div className="footer-area-two">
                    <div className="footer-top-two">
                        <div className="container">
                            <div className="footer-features-wrap">
                                <div className="row justify-content-center">
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="footer-features-item">
                                            <div className="icon">
                                                <img src="/assets/img/icon/f_features_icon01.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4 className="title">Create Your Video Now</h4>
                                                <Link href="/contact">Start using our AI<i className="fal fa-arrow-right" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="footer-features-item">
                                            <div className="icon">
                                                <img src="/assets/img/icon/f_features_icon02.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4 className="title">Get Start a Free Trial</h4>
                                                <Link href="/contact">Start free our AI<i className="fal fa-arrow-right" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="footer-features-item">
                                            <div className="icon">
                                                <img src="/assets/img/icon/f_features_icon03.svg" alt="" />
                                            </div>
                                            <div className="content">
                                                <h4 className="title">Join Our Community</h4>
                                                <Link href="/contact">Join our AI<i className="fal fa-arrow-right" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="footer-widget-wrap">
                                <div className="row row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
                                    <div className="col">
                                        <div className="footer-widget">
                                            <h4 className="fw-title-two">company</h4>
                                            <div className="footer-link-two">
                                                <ul className="list-wrap">
                                                    <li><Link href="/about">About Us</Link></li>
                                                    <li><Link href="/contact">AI Research</Link></li>
                                                    <li><Link href="/contact">Jobs</Link></li>
                                                    <li><Link href="/contact">Press Kit</Link></li>
                                                    <li><Link href="/contact">Contact Sales</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="footer-widget">
                                            <h4 className="fw-title-two">Features</h4>
                                            <div className="footer-link-two">
                                                <ul className="list-wrap">
                                                    <li><Link href="/faq">85+ Video Avatars</Link></li>
                                                    <li><Link href="/faq">120+ Languages</Link></li>
                                                    <li><Link href="/contact">Custom Avatars</Link></li>
                                                    <li><Link href="/contact">Text to Video</Link></li>
                                                    <li><Link href="/contact">Online Video Maker</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="footer-widget">
                                            <h4 className="fw-title-two">Resources</h4>
                                            <div className="footer-link-two">
                                                <ul className="list-wrap">
                                                    <li><Link href="/contact">Pricing</Link></li>
                                                    <li><Link href="/contact">Book a Demo</Link></li>
                                                    <li><Link href="/contact">Case Studies</Link></li>
                                                    <li><Link href="/contact">Example videos</Link></li>
                                                    <li><Link href="/work">Tools</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="footer-widget">
                                            <h4 className="fw-title-two">Use Cases</h4>
                                            <div className="footer-link-two">
                                                <ul className="list-wrap">
                                                    <li><Link href="/contact">Training Videos</Link></li>
                                                    <li><Link href="/contact">How-to Videos</Link></li>
                                                    <li><Link href="/contact">Marketing Videos</Link></li>
                                                    <li><Link href="/contact">Service Providers</Link></li>
                                                    <li><Link href="/contact">Product Updates</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="footer-widget">
                                            <h4 className="fw-title-two">Need Emergency Help?</h4>
                                            <div className="footer-contact-two">
                                                <Link href="/tel:0123456789" className="phone">+(1) 123 656 7866</Link>
                                                <Link href="/tel:0123456789" className="phone">+(1) 123 656 7866</Link>
                                                <Link href="/mailto:dex.aiinfotive@.com" className="email">dex.ai infotive@.com</Link>
                                            </div>
                                            <div className="footer-social-two">
                                                <ul className="list-wrap">
                                                    <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-pinterest-p" /></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom-two">
                        <div className="container">
                            <div className="row">
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
