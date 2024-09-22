import Layout from "@/components/layout/Layout";
import { useState, useEffect } from 'react';
import Waveform from "@/components/elements/Waveform";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Switch from "react-switch";
import { useRouter } from 'next/router';

export default function Job() {
    const router = useRouter();
    const [files, setFiles] = useState([]);
    const [isChecked, setIsChecked] = useState(true);
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const [token, setToken] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("Drag & Drop or Click to Upload Audio");

    useEffect(() => {
        const tok = localStorage.getItem("token");
        if (tok) {
            setToken(tok);
        }
    }, []);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);

            // Create a new file object and append to the state
            const newFile = {
                id: files.length, // Unique ID based on current length
                url: objectUrl,
                waveColor: '#FFFFFF',
                progressColor: '#FF9900',
                size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
                filename: selectedFile.name,
                isReal: null // Initial result state
            };
            setFiles([...files, newFile]);
            setPreview("File Ready to Upload");
        }
    };

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
    
            const wavBuffer = encodeWAV(chunk, audioBuffer.sampleRate, 1);
            const chunkBlob = new Blob([wavBuffer], { type: 'audio/wav' });
    
            const result = await uploadChunk(chunkBlob, i);
            if (result) {
                totalConfidence += result.confidence;
                totalResults++;
    
                if (result.result === 'real') isRealCount++;
            }
        }
    
        // Reset preview and file after upload
        setPreview("Drag & Drop or Click to Upload Audio");
        setFile(null); // Reset file state
    
        // Calculate average result
        const averageConfidence = totalConfidence / totalResults;
        const majorityResult = isRealCount > totalResults / 2 ? 'real' : 'fake';
    
        // Update the state of the specific file with the upload result
        setFiles((prevFiles) =>
            prevFiles.map((f) =>
                f.id === files.length - 1 // Update only the last uploaded file
                    ? { ...f, isReal: majorityResult === 'real', progressColor: averageConfidence > 0.5 ? 'green' : 'red' }
                    : f
            )
        );
    };

    const handleDelete = (id) => {
        setFiles(files.filter(file => file.id !== id));
    };

    const handlePlay = (id) => {
        if (currentPlaying && currentPlaying !== id) {
            document.querySelector(`button[data-id="${currentPlaying}"]`).click();
        }
        setCurrentPlaying(id);
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

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={<>Try a <span>Demo</span></>}>
                <div>
                    <section className="help-area pb-50">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="responds-wrap uploadarea">
                                        <div
                                            className="contact-form audiolist"
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleDrop} // Handle drop event
                                            onClick={() => document.getElementById('file-upload').click()}
                                        >
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="audio/*"
                                                style={{ display: 'none' }}
                                                id="file-upload"
                                            />
                                            <span>{file ? preview : 'Drag & Drop or Click to Upload Audio'}</span>
                                        </div>
                                        <div className="content pb-40">
                                            <p>Noise Suppression</p>
                                            <label>
                                                <Switch onChange={() => setIsChecked(!isChecked)} checked={isChecked} />
                                            </label>
                                        </div>
                                        <div className="content">
                                            <div className="pricing-btn">
                                                <button onClick={handleUpload} className="btn btn-two">Upload</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="contact-form audiolist">
                                        <div className="job-item-wrap">
                                            {/* Render all uploaded files */}
                                            {files.map((file) => (
                                                <div className="job-item" key={file.id}>
                                                    <Waveform
                                                        key={file.id}
                                                        audioUrl={file.url}
                                                        waveColor={file.waveColor}
                                                        progressColor={file.progressColor}
                                                        size={file.size}
                                                        filename={file.filename}
                                                        IsReal={file.isReal}
                                                        onPlay={() => handlePlay(file.id)}
                                                        audioId={file.id}
                                                        handleDelete={() => handleDelete(file.id)}
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
