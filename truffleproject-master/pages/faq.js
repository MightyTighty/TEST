import Layout from "@/components/layout/Layout"
import { useState } from 'react'
export default function Faq() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
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
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={<>Ask <span>Question</span></>}>
                <section className="faq-area pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
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
                                        <div className={isActive.key == 6 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(6)}>
                                            <h2 className="accordion-header">
                                                <button className={isActive.key == 6 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                                    How much does AI content writing cost?
                                                </button>
                                            </h2>
                                            <div id="collapseSix" className={isActive.key == 6 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                                <div className="accordion-body">
                                                    <p>AI content writing works by using machine learning algorithms to analyze vast amounts of data, including text, images, and videos, to generate unique and engaging content. The software learns from previous content and can mimic the style and tone of human writers.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={isActive.key == 7 ? "accordion-item active" : "accordion-item"} onClick={() => handleToggle(7)}>
                                            <h2 className="accordion-header">
                                                <button className={isActive.key == 7 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                                    How accurate is the content generated by AI software?
                                                </button>
                                            </h2>
                                            <div id="collapseSeven" className={isActive.key == 7 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
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
                </section>

            </Layout>
        </>
    )
}