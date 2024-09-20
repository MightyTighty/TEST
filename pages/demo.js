import Layout from "@/components/layout/Layout";
import { useState, useEffect } from 'react';
import Waveform from "@/components/elements/Waveform";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Switch from "react-switch";
import { useRouter } from 'next/router';

export default function Job() {
    const router = useRouter();
    const [activeIndex, setActiveIndex] = useState(1);
    const [isImageVisible, setImageVisible] = useState(true);
    const [files, setFiles] = useState([]); // Initially empty, to be populated after upload
    const [isChecked, setIsChecked] = useState(true);
    const [currentPlaying, setCurrentPlaying] = useState(null);

    const [token, setToken] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("assets/img/voice/upload.png");
    const [uploadResult, setUploadResult] = useState(null);
    const [averageResult, setAverageResult] = useState({ result: '', confidence: 0 });

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

    // Upload chunks and calculate average confidence
    const handleUpload = async () => {
        if (!file) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const chunkDuration = 2; // 2 seconds
        const chunkSize = chunkDuration * audioBuffer.sampleRate; // Number of samples in 2 seconds
        const totalChunks = Math.ceil(audioBuffer.length / chunkSize);

        let totalConfidence = 0;
        let totalResults = 0;
        let isRealCount = 0;

        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min((i + 1) * chunkSize, audioBuffer.length);
            const chunk = audioBuffer.getChannelData(0).slice(start, end);

            const wavBuffer = encodeWAV(chunk, 16000, 1); // Resample to 16000 Hz
            const chunkBlob = new Blob([wavBuffer], { type: 'audio/wav' });

            const formData = new FormData();
            const audioFile = new File([chunkBlob], `chunk-${i}.wav`, { type: 'audio/wav' });
            formData.append('file', audioFile);

            let token = localStorage.getItem("token");

            const response = await fetch('http://127.0.0.1:8000/api/audio-upload/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const result = await response.json();
            if (result) {
                totalConfidence += result.confidence;
                totalResults++;

                if (result.result === 'real') isRealCount++;
            }
        }

        // Calculate average result
        const averageConfidence = totalConfidence / totalResults;
        const majorityResult = isRealCount > totalResults / 2 ? 'real' : 'fake';

        setAverageResult({ result: majorityResult, confidence: averageConfidence });
        updateFiles({ result: majorityResult, confidence: averageConfidence });
    };

    const encodeWAV = (samples, sampleRate, numChannels) => {
        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);

        const writeString = (view, offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        /* RIFF identifier */
        writeString(view, 0, 'RIFF');
        /* file length */
        view.setUint32(4, 36 + samples.length * 2, true);
        /* RIFF type */
        writeString(view, 8, 'WAVE');
        /* format chunk identifier */
        writeString(view, 12, 'fmt ');
        /* format chunk length */
        view.setUint32(16, 16, true);
        /* sample format (raw) */
        view.setUint16(20, 1, true);
        /* channel count */
        view.setUint16(22, numChannels, true);
        /* sample rate */
        view.setUint32(24, sampleRate, true);
        /* byte rate (sample rate * block align) */
        view.setUint32(28, sampleRate * numChannels * 2, true);
        /* block align (channel count * bytes per sample) */
        view.setUint16(32, numChannels * 2, true);
        /* bits per sample */
        view.setUint16(34, 16, true);
        /* data chunk identifier */
        writeString(view, 36, 'data');
        /* data chunk length */
        view.setUint32(40, samples.length * 2, true);

        /* Write samples to data chunk */
        let offset = 44;
        for (let i = 0; i < samples.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, samples[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }

        return buffer;
    };

    const updateFiles = (result) => {
        // Add the uploaded file to the audio files list with average confidence result
        const newFile = {
            id: files.length + 1, // Incremental ID
            url: preview, // Use the preview URL for the uploaded file
            waveColor: '#FFFFFF',
            progressColor: result.confidence > 0.5 ? 'green' : 'red', // Green for real, red for fake
            size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
            filename: file.name,
            isReal: result.confidence > 0.5 // True for real, false for fake
        };
        setFiles([...files, newFile]); // Add the new file to the list
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

    const handleDelete = (id) => {
        // Filter out the file with the specified ID from the files list
        setFiles(files.filter(file => file.id !== id));
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
                                                        handleDelete={handleDelete} // Pass the delete handler here
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
