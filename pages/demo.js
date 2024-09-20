
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState, useRef, useEffect } from 'react'
import Waveform from "@/components/elements/Waveform"
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Switch from "react-switch";
import { useRouter } from 'next/navigation';


const audioFiles = [
    {
        id: 1,
        url: '/assets/audio/sampleaudio.mp3',
        waveColor: '#FFFFFF',
        progressColor: 'red',
        size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
        filename: 'audio1.mp3',
        isReal: false
    },
    {
        id: 2,
        url: '/assets/audio/sampleaudio.mp3',
        waveColor: '#FFFFFF',
        progressColor: 'green',
        size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
        filename: 'audio2.mp3',
        isReal: true
    },
    {
        id: 3,
        url: '/assets/audio/sampleaudio.mp3',
        waveColor: '#FFFFFF',
        progressColor: 'red',
        size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 2 },
        filename: 'audio3.mp3',
        isReal: false
    },
];

export default function Job() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(1);
    const [isImageVisible, setImageVisible] = useState(true);
    const [files, setFiles] = useState(audioFiles);
    const [isChecked, setIsChecked] = useState(true);
    const [currentPlaying, setCurrentPlaying] = useState(null);

    const [token, setToken] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("assets/img/voice/upload.png");
    const [uploadResult, setUploadResult] = useState(null);



    useEffect(() => {
        const tok = localStorage.getItem("token");
        if (tok) {
            setToken(tok);
        }
    }, []);

    const handleFileChange = (event) => {
        const tok = localStorage.getItem("token");
        if (!tok) {
            router.push("/login");
        }

        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/audio-upload/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                setUploadResult(result);
            } else {
                const error = await response.json();
                console.error('Error uploading file:', error);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };


   



    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    const handleChange = (checked) => {
        setIsChecked(!checked);
    };

    const openFileInput = () => {
        document.getElementById('file-upload').click();
    };

    const handlePlay = (id) => {
        if (currentPlaying && currentPlaying !== id) {
            document.querySelector(`button[data-id="${currentPlaying}"]`).click();
        }
        setCurrentPlaying(id);
    };

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={<>Try a <span>Demo</span></>}>
                <div>
                    <section className="help-area pb-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="responds-wrap uploadarea">
                                        <div className="icon">
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="audio/*"
                                                style={{ display: 'none' }}
                                                id="file-upload"
                                            />
                                            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                                {preview ? (
                                                    <img
                                                        src={preview}
                                                        alt="Image Preview"
                                                        style={{ width: '120px', height: 'auto', marginBottom: '10px' }}
                                                    />
                                                ) : (
                                                    <div style={{ width: '120px', height: '120px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <span>Upload Audio</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                        <div className="content pb-40">
                                            <a onClick={openFileInput}>Upload File</a>
                                        </div>
                                        <div className="content pb-40">
                                            <p>Frame Length 2</p>
                                            <RangeSlider
                                                className="single-thumb"
                                                defaultValue={[0, 50]}
                                                thumbsDisabled={[true, false]}
                                                rangeSlideDisabled={true}
                                            />
                                        </div>
                                        <div className="content pb-40">
                                            <p>Sensitivity 50%</p>
                                            <RangeSlider
                                                className="single-thumb"
                                                defaultValue={[0, 50]}
                                                thumbsDisabled={[true, false]}
                                                rangeSlideDisabled={true}
                                            />
                                        </div>
                                        <div className="content pb-40">
                                            <p>Isolate Voice</p>
                                            <label>
                                                <Switch onChange={() => handleChange(isChecked)} checked={isChecked} />
                                            </label>
                                        </div>
                                        <div className="content">
                                            <div className="pricing-btn">
                                                <button onClick={handleUpload} className="btn btn-two">Upload</button>
                                            </div>
                                        </div>
                                        {uploadResult && (
                                            <div className="content pb-40">
                                                <p>Result: {uploadResult.result}</p>
                                                <p>Confidence: {uploadResult.confidence}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="contact-form audiolist">
                                        <div className="job-item-wrap">
                                            {files.map((audio, index) => (
                                                <div className="job-item" key={index}>
                                                    <Waveform
                                                        key={audio.id}
                                                        audioUrl={audio.url}
                                                        waveColor={audio.waveColor}
                                                        progressColor={audio.progressColor}
                                                        size={audio.size}
                                                        filename={audio.filename}
                                                        IsReal={audio.isReal}
                                                        onPlay={() => handlePlay(audio.id)}
                                                        audioId={audio.id}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    );
}