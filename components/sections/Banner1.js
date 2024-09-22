import Link from "next/link";
import Typewriter from 'typewriter-effect';

export default function Banner1() {
    return (
        <>
            <section className="banner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="banner-content ta-animated-headline">
                                <h2 className="title ah-headline wow fadeInUp" data-wow-delay=".2s">
                                    <span>Redefining Digital Forensics with </span>
                                    <Typewriter tag="span"
                                        options={{
                                            wrapperClassName: "ah-words-wrapper",
                                            strings: ['Advanced AI', 'Innovation', 'Integrity'],
                                            autoStart: true,
                                            loop: true,
                                        }}
                                    />
                                </h2>
                                <h2 className="title d-none wow fadeInUp" data-wow-delay=".2s">
                                    Redefining Digital Forensics with <span>Advanced AI,</span> <span>Innovation,</span> <span>Integrity</span>
                                </h2>
                                <p className="wow fadeInUp" data-wow-delay=".4s">
                                    We deliver groundbreaking AI solutions for deepfake detection and digital forensics, setting new standards in the industry. As a promising startup, we are on a mission to become your trusted partner in digital security, driving innovation with precision and reliability.
                                </p>
                                <div className="banner-btn">
                                    <Link href="/demo" className="gradient-btn wow fadeInLeft" data-wow-delay=".6s">Start a Free Trial</Link>
                                    <Link href="/work" className="gradient-btn gradient-btn-two wow fadeInRight" data-wow-delay=".6s">Learn How It Works</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
