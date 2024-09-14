
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useRef, useEffect } from 'react'
import Waveform from "@/components/elements/Waveform"



const audioFiles = [
    {
        url: '/assets/audio/sampleaudio.mp3',
        waveColor: '#FFFFFF',
        progressColor: 'red',
        size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
        filename: 'audio1.mp3',
    },
    {
        url: '/assets/audio/sampleaudio.mp3',
        waveColor: '#FFFFFF',
        progressColor: 'green',
        size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
        filename: 'audio2.mp3',
    },
    {
        url: '/assets/audio/sampleaudio.mp3',
        waveColor: '#FFFFFF',
        progressColor: 'red',
        size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 2 },
        filename: 'audio3.mp3',
    },
];

export default function Job() {
    const [activeIndex, setActiveIndex] = useState(1)
    const [isImageVisible, setImageVisible] = useState(true)
    const [files, setFiles] = useState(audioFiles);

    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={<>Try a <span>Demo</span></>}>
                <div>
                    {/* faq-area */}

                    {/* faq-area-end */}
                    {/* help-area */}
                    <section className="help-area pb-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="responds-wrap uploadarea">
                                        <div className="icon">
                                            <img id="uploadicon" src="assets/img/voice/upload.png" alt="" />
                                        </div>
                                        <div className="content pb-20">
                                            <a >Upload File</a>
                                            <p>The best way to get answer faster.</p>
                                        </div>
                                        <div className="content">
                                            <div className="pricing-btn">
                                                <Link href="/login" className="btn btn-two">Upload</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-lg-9">
                                    <div className="contact-form audiolist">
                                        <div className="job-item-wrap">
                                            {files.map((audio, index) => (
                                                <div className="job-item" key={index}>
                                                    <p>{audio.filename}</p>
                                                    <Waveform
                                                        audioUrl={audio.url}
                                                        waveColor={audio.waveColor}
                                                        progressColor={audio.progressColor}
                                                        size={audio.size}
                                                        filename={audio.filename}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section className="counter-area-three pb-130">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="counter-content">
                                        <div className="section-title-four mb-40">
                                            <h2 className="title">AI can write content just like humans can</h2>
                                        </div>
                                        <p>By using Natural Language Processing (NLP) techniques, AI can understand the context, tone, and intent of a given piece of content, and produce written output that's relevant and engaging. This technology is especially useful for generating large volumes of content quickly and accurately, which can save businesses a significant amount of time and resources.</p>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="counter-item-wrap-three">
                                        <ul className="list-wrap">
                                            <li>
                                                <div className="counter-item-three">
                                                    <div className="icon">
                                                        {isImageVisible && (
                                                            <img id="uploadicon" src="assets/img/voice/playicon.png" onClick={() => handlePlay()} />
                                                        )}
                                                        {!isImageVisible && (
                                                            <img id="uploadicon" src="assets/img/voice/pauseicon.png" onClick={() => handlePause()} />
                                                        )}

                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="counter-item-three">
                                                    <div className="icon">
                                                        <img id="uploadicon" src="assets/img/voice/download.png" alt="" />
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="threeelist">
                                                <div className="counter-item-three wavediv">
                                                </div>
                                            </li>

                                        </ul>
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