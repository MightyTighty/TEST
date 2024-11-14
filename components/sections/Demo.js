import { useState, useEffect, useRef } from "react";
import Waveform from "@/components/elements/Waveform";

const audioFiles = [
  {
    id: 1,
    url: "/assets/audio/kamala-fake.mp3",
    waveColor: "#FFFFFF",
    progressColor: "red",
    size: { height: 100, barHeight: 20, barRadius: 2, barWidth: 3 },
    filename: "audio1.mp3",
    isReal: false,
    forHome: true,
  },
  {
    id: 2,
    url: "/assets/audio/t2s.mp3",
    waveColor: "#FFFFFF",
    progressColor: "green",
    size: { height: 100, barHeight: 20, barRadius: 2, barWidth: 3 },
    filename: "audio2.mp3",
    isReal: true,
    forHome: true,
  },
  {
    id: 3,
    url: "/assets/audio/s2s.mp3",
    waveColor: "#FFFFFF",
    progressColor: "red",
    size: { height: 100, barHeight: 20, barRadius: 2, barWidth: 2 },
    filename: "audio3.mp3",
    isReal: false,
    forHome: true,
  },
];

export default function Demo() {
  const [activeIndex, setActiveIndex] = useState(1);
  const waveformRefs = useRef({}); // Store references for each Waveform instance

  useEffect(() => {
    return () => {
      // Stop all audio on component unmount
      Object.values(waveformRefs.current).forEach((waveSurfer) => waveSurfer?.pause());
    };
  }, []);

  const handleOnClick = (index) => {
    // Pause currently playing audio when switching tabs
    Object.values(waveformRefs.current).forEach((waveSurfer) => waveSurfer?.pause());
    setActiveIndex(index);
  };

  const registerWaveSurfer = (id, waveSurferInstance) => {
    waveformRefs.current[id] = waveSurferInstance;
  };

  return (
    <section className="job-area pb-150">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="job-tab-wrap">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" onClick={() => handleOnClick(1)}>
                  <button
                    className={activeIndex === 1 ? "nav-link active" : "nav-link"}
                    aria-selected="false"
                  >
                    DeepFake Detection
                  </button>
                </li>
                <li className="nav-item" onClick={() => handleOnClick(2)}>
                  <button
                    className={activeIndex === 2 ? "nav-link active" : "nav-link"}
                  >
                    Text to Speech
                  </button>
                </li>
                <li className="nav-item" onClick={() => handleOnClick(3)}>
                  <button
                    className={activeIndex === 3 ? "nav-link active" : "nav-link"}
                    aria-selected="false"
                  >
                    Speech to Speech
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                {audioFiles.map((file, index) => (
                  <div
                    key={file.id}
                    className={
                      activeIndex === file.id
                        ? "tab-pane fade show active"
                        : "tab-pane fade"
                    }
                  >
                    <div className="contact-form audiolist">
                      <div className="job-item-wrap">
                        <Waveform
                          audioUrl={file.url}
                          waveColor={file.waveColor}
                          progressColor={file.progressColor}
                          size={file.size}
                          filename={file.filename}
                          IsReal={file.isReal}
                          forHome={file.forHome}
                          audioId={file.id}
                          registerWaveSurfer={registerWaveSurfer}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
