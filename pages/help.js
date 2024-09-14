import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
export default function Help() {
    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={<>👋 Hello, How can <span>we help?</span></>}>
                <div>
                    {/* faq-area */}
                    <section className="faq-area-two pb-130">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-10">
                                    <div className="problem-search-wrap text-center">
                                        <form action="#">
                                            <div className="form-grp">
                                                <label htmlFor="search"><i className="far fa-search" /></label>
                                                <input type="text" id="search" placeholder="Write a question or problem" />
                                                <button type="submit" className="gradient-btn">search</button>
                                            </div>
                                            <span>Or choose a category to quickly find the help you need</span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="faq-tab-wrap">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" onClick={() => handleOnClick(1)}>
                                                <button className={activeIndex == 1 ? "nav-link active" : "nav-link"}><img src="assets/img/icon/faq_icon01.svg" alt="" />Getting Started</button>
                                            </li>
                                            <li className="nav-item" onClick={() => handleOnClick(2)}>
                                                <button className={activeIndex == 2 ? "nav-link active" : "nav-link"}><img src="assets/img/icon/faq_icon02.svg" alt="" />pricing  Plans</button>
                                            </li>
                                            <li className="nav-item" onClick={() => handleOnClick(3)}>
                                                <button className={activeIndex == 3 ? "nav-link active" : "nav-link"}><img src="assets/img/icon/faq_icon03.svg" alt="" />Usage Guides</button>
                                            </li>
                                            <li className="nav-item" onClick={() => handleOnClick(4)}>
                                                <button className={activeIndex == 4 ? "nav-link active" : "nav-link"}><img src="assets/img/icon/faq_icon04.svg" alt="" />Sales Question</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">
                                            <div className={activeIndex == 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                                                <div className="faq-wrap">
                                                    <div className="accordion" id="accordionExample">
                                                        <div className={isActive.key == 1 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(1)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 1 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Can AI content writing replace human writers?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className={isActive.key == 1 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 2 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(2)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 2 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    How does AI content writing work?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className={isActive.key == 2 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 3 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(3)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 3 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    What is AI content writing?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className={isActive.key == 3 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 4 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(4)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 4 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                    What are the benefits of using AI content writing?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseFour" className={isActive.key == 4 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 5 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(5)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 5 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                    Is AI content writing ethical?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseFive" className={isActive.key == 5 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                                <div className="faq-wrap">
                                                    <div className="accordion" id="accordionExample">
                                                        <div className={isActive.key == 6 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(6)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 6 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Can AI content writing replace human writers?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className={isActive.key == 6 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 7 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(7)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 7 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    How does AI content writing work?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className={isActive.key == 7 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 8 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(8)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 8 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    What is AI content writing?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className={isActive.key == 8 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 9 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(9)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 9 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                    What are the benefits of using AI content writing?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseFour" className={isActive.key == 9 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 10 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(10)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 10 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                    Is AI content writing ethical?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseFive" className={isActive.key == 10 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex == 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                                <div className="faq-wrap">
                                                    <div className="accordion" id="accordionExample">
                                                        <div className={isActive.key == 11 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(11)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 11 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Can AI content writing replace human writers?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className={isActive.key == 11 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 12 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(12)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 12 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    How does AI content writing work?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className={isActive.key == 12 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 13 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(13)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 13 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    What is AI content writing?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className={isActive.key == 13 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 14 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(14)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 14 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                    What are the benefits of using AI content writing?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseFour" className={isActive.key == 14 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 15 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(15)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 15 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                    Is AI content writing ethical?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseFive" className={isActive.key == 15 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={activeIndex == 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                                                <div className="faq-wrap">
                                                    <div className="accordion" id="accordionExample">
                                                        <div className={isActive.key == 16 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(16)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 16 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    Can AI content writing replace human writers?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseOne" className={isActive.key == 16 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 17 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(17)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 17 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                                    How does AI content writing work?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseTwo" className={isActive.key == 17 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 18 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(18)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 18 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                    What is AI content writing?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseThree" className={isActive.key == 18 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 19 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(19)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 19 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                                    What are the benefits of using AI content writing?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseFour" className={isActive.key == 19 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={isActive.key == 20 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(20)}>
                                                            <h2 className="accordion-header">
                                                                <button className={isActive.key == 20 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                                                    Is AI content writing ethical?
                                                                </button>
                                                            </h2>
                                                            <div id="collapseFive" className={isActive.key == 20 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body">
                                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* faq-area-end */}
                    {/* help-area */}
                    <section className="help-area pb-110">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-6 col-lg-8">
                                    <div className="help-title text-center mb-70">
                                        <h2 className="title">You still have a <span>question?</span></h2>
                                        <p>If you cannot find the answer to your question in our FAQ, you can always contact us. We will answer you shortly!</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-xl-8 col-lg-10">
                                    <div className="help-center-wrap">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="help-center-item">
                                                    <div className="icon">
                                                        <img src="assets/img/icon/help_icon01.svg" alt="" />
                                                    </div>
                                                    <div className="content">
                                                        <Link href="tel:0123456789">+(1) 123 656 7865</Link>
                                                        <p>We are always happy to help.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="help-center-item">
                                                    <div className="icon">
                                                        <img src="assets/img/icon/help_icon02.svg" alt="" />
                                                    </div>
                                                    <div className="content">
                                                        <Link href="mailto:dex.aiinfotive@.com">dex.ai infotive@.com</Link>
                                                        <p>The best way to get answer faster.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* help-area-end */}
                </div>

            </Layout>
        </>
    )
}