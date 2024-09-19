import Link from "next/link"
import Layout from "@/components/layout/Layout"
import { useState } from 'react'
import Waveform from "@/components/elements/Waveform"

const audioFiles = [
    {
        id:1,
        url: '/assets/audio/sampleaudio.mp3',
        waveColor: '#FFFFFF',
        progressColor: 'red',
        size: { height: 100, barHeight: 20, barRadius: 2, barWidth: 3 },
        filename: 'audio1.mp3',
        isReal:false,
        forHome:true
    },
    {
        id:2,
        url: '/assets/audio/sampleaudio.mp3',
        waveColor: '#FFFFFF',
        progressColor: 'green',
        size: { height: 100, barHeight: 20, barRadius: 2, barWidth: 3 },
        filename: 'audio2.mp3',
        isReal:true,
        forHome:true
    },
    {
        id:3,
        url: '/assets/audio/sampleaudio.mp3',
        waveColor: '#FFFFFF',
        progressColor: 'red',
        size: { height: 100, barHeight: 20, barRadius: 2, barWidth: 2 },
        filename: 'audio3.mp3',
        isReal:false,
        forHome:true
    },
];

export default function Demo() {

    const [activeIndex, setActiveIndex] = useState(1)
    const [currentPlaying, setCurrentPlaying] = useState(null);
    
    const handleOnClick = (index) => {
        setActiveIndex(index)

    }
    const handlePlay = (id) => {
        if (currentPlaying && currentPlaying !== id) {
          document.querySelector(`button[data-id="${currentPlaying}"]`).click();
        }
        setCurrentPlaying(id);
      };

    return (
        <>
          <section className="job-area pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="job-tab-wrap">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" onClick={() => handleOnClick(1)}>
                                            <button className={activeIndex == 1 ? "nav-link active" : "nav-link"} aria-selected="false">DeepFake Detection</button>
                                        </li>
                                       
                                        <li className="nav-item" onClick={() => handleOnClick(2)}>
                                            <button className={activeIndex == 2 ? "nav-link active" : "nav-link"}>Text to Speach</button>
                                        </li>
                                        <li className="nav-item" onClick={() => handleOnClick(3)}>
                                            <button className={activeIndex == 3 ? "nav-link active" : "nav-link"} aria-selected="false">Speach to Speach</button>
                                        </li>
                                     
                                       
                                       
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div  className={activeIndex == 1 ? "tab-pane fade show active texttospeach" : "tab-pane fade texttospeach"} >
                                        <div className="contact-form audiolist">
                                        <div className="job-item-wrap">
                                        <Waveform
                                                        key={audioFiles[0].id}
                                                        audioUrl={audioFiles[0].url}
                                                        waveColor={audioFiles[0].waveColor}
                                                        progressColor={audioFiles[0].progressColor}
                                                        size={audioFiles[0].size}
                                                        filename={audioFiles[0].filename}
                                                        IsReal={audioFiles[0].isReal}
                                                        forHome={audioFiles[0].forHome}
                                                        audioId={audioFiles[0].id}
                                                    />
                                                    </div>
                                                    </div>
                                        </div>
                                        <div className={activeIndex == 2 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="contact-form audiolist">
                                        <div className="job-item-wrap">
                                        <Waveform
                                        key={audioFiles[1].id}
                                                        audioUrl={audioFiles[1].url}
                                                        waveColor={audioFiles[1].waveColor}
                                                        progressColor={audioFiles[1].progressColor}
                                                        size={audioFiles[1].size}
                                                        filename={audioFiles[1].filename}
                                                        IsReal={audioFiles[1].isReal}
                                                        forHome={audioFiles[1].forHome}
                                                        audioId={audioFiles[1].id}
                                                    />
                                                    </div>
                                                    </div>
                                        </div>
                                      
                                        <div className={activeIndex == 3 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <div className="contact-form audiolist">
                                        <div className="job-item-wrap">
                                        <Waveform
                                        key={audioFiles[2].id}
                                                        audioUrl={audioFiles[2].url}
                                                        waveColor={audioFiles[2].waveColor}
                                                        progressColor={audioFiles[2].progressColor}
                                                        size={audioFiles[2].size}
                                                        filename={audioFiles[2].filename}
                                                        IsReal={audioFiles[2].isReal}
                                                        forHome={audioFiles[2].forHome}
                                                        audioId={audioFiles[2].id}
                                                    />
                                        </div>
                                        </div>
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
