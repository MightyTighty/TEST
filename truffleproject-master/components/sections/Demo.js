import Link from "next/link"
import Layout from "@/components/layout/Layout"
import { useState } from 'react'

export default function Demo() {

    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    return (
        <>
          <section className="job-area pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="job-tab-wrap">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" onClick={() => handleOnClick(1)}>
                                            <button className={activeIndex == 1 ? "nav-link active" : "nav-link"}>Text to Speach</button>
                                        </li>
                                        <li className="nav-item" onClick={() => handleOnClick(2)}>
                                            <button className={activeIndex == 2 ? "nav-link active" : "nav-link"} aria-selected="false">Speach to Speach</button>
                                        </li>
                                        <li className="nav-item" onClick={() => handleOnClick(3)}>
                                            <button className={activeIndex == 3 ? "nav-link active" : "nav-link"} aria-selected="false">Audio Editing</button>
                                        </li>
                                        <li className="nav-item" onClick={() => handleOnClick(4)}>
                                            <button className={activeIndex == 4 ? "nav-link active" : "nav-link"} aria-selected="false">DeepFake Detection</button>
                                        </li>
                                        <li className="nav-item" onClick={() => handleOnClick(5)}>
                                            <button className={activeIndex == 5 ? "nav-link active" : "nav-link"} aria-selected="false">Voice Clonning</button>
                                        </li>
                                       
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div  className={activeIndex == 1 ? "tab-pane fade show active texttospeach" : "tab-pane fade texttospeach"} >
                                        <a class="play-btn popup-video"><i class="fas fa-play"></i> Click  Hear ........................................</a><br></br>
                                        <img src="/assets/img/voice/WAVE.png"></img>
                                        </div>
                                        <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                            
                                        </div>
                                        <div className={activeIndex == 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                            
                                        </div>
                                        <div className={activeIndex == 4 ? "tab-pane fade show active" : "tab-pane fade"}>
                                            
                                        </div>
                                        <div className={activeIndex == 5 ? "tab-pane fade show active" : "tab-pane fade"}>
                                           
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


        </>
    )
}
