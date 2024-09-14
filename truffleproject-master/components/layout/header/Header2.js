import LanguageDropdown from "@/components/elements/LanguageDropdown"
import Link from "next/link"
import Sidebar from "../Sidebar"

export default function Header2({ scroll, isMobileMenu, handleMobileMenu }) {
    return (
        <>
            <header>
                <div id="header-fixed-height" />
                <div className="header-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header-top-content text-center">
                                    <p>Sign up and receive 20% bonus discount on checkout. <Link href="/contact">Learn more <i className="far fa-angle-right" /></Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sticky-header" className="menu-area menu-area-two">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="mobile-nav-toggler" onClick={handleMobileMenu}><i className="fas fa-bars" /></div>
                                <div className="menu-wrap">
                                    <nav className="menu-nav">
                                        <div className="logo">
                                            <Link href="/"><img src="/assets/img/logo/logo02.png" alt="Logo" /></Link>
                                        </div>
                                        <div className="navbar-wrap main-menu d-none d-lg-flex">
                                            <ul className="navigation">
                                            <li><Link href="/">Home</Link></li>
                                              
                                             
                                                <li><Link href="/contact">contacts</Link></li>
                                                <li><Link href="/#Pricing">Pricing</Link></li>
                                            </ul>
                                        </div>
                                        <div className="header-action d-none d-md-block">
                                            <ul className="list-wrap">
                                                <li className="header-lang">
                                                    <LanguageDropdown />
                                                </li>
                                                <li className="header-btn"><Link href="/login" className="btn">sign up</Link></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                {/* Mobile Menu  */}
                                <div className="mobile-menu">
                                    <nav className="menu-box">
                                        <div className="close-btn" onClick={handleMobileMenu}><i className="fas fa-times" /></div>
                                        <div className="nav-logo">
                                            <Link href="/"><img src="/assets/img/logo/logo02.png" alt="Logo" /></Link>
                                        </div>
                                        <div className="menu-outer">
                                            <Sidebar />
                                        </div>
                                        <div className="social-links">
                                            <ul className="clearfix list-wrap">
                                                <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-youtube" /></Link></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="menu-backdrop" onClick={handleMobileMenu} />
                                {/* End Mobile Menu */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}
