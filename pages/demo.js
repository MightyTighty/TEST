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
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("Drag & Drop or Click to Upload Audio");
    const [averageResult, setAverageResult] = useState({ result: '', confidence: 0 });
    const [isChecked, setIsChecked] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
        }
    }, [router]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview("File Ready to Upload");

            const newFile = {
                id: files.length,
                url: URL.createObjectURL(selectedFile),
                waveColor: '#FFFFFF',
                progressColor: '#FF9900',
                size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
                filename: selectedFile.name,
                isReal: null,
            };
            setFiles([...files, newFile]);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview("File Ready to Upload");

            const newFile = {
                id: files.length,
                url: URL.createObjectURL(selectedFile),
                waveColor: '#FFFFFF',
                progressColor: '#FF9900',
                size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
                filename: selectedFile.name,
                isReal: null,
            };
            setFiles([...files, newFile]);
        }
    };

    const uploadChunk = async (chunk, index) => {
        // Create a FormData object
        const formData = new FormData();
        const audioFile = new File([chunk], `chunk-${index}.wav`, { type: 'audio/wav' });
        formData.append("file", audioFile, `chunk-${index}.wav`);
    
        const requestOptions = {
            method: "POST",
            body: formData, // Send FormData exactly like Postman
            redirect: "follow"
        };
    
        try {
            const response = await fetch("https://api.raidai.net/backend", requestOptions);
    
            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }
    
            const result = await response.json(); // Assuming the server returns JSON
            return result;
        } catch (error) {
            console.error(`Error uploading chunk ${index}:`, error);
            return null; // Return null in case of error
        }
    };
    

    const handleUpload = async () => {
        if (!file) return;

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const chunkDuration = 2; // 2 seconds per chunk
        const chunkSize = chunkDuration * audioBuffer.sampleRate;
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

        const averageConfidence = totalConfidence / totalResults;
        const majorityResult = isRealCount > totalResults / 2 ? 'real' : 'fake';

        setAverageResult({ result: majorityResult, confidence: averageConfidence });

        const updatedFiles = files.map((file, idx) =>
            idx === files.length - 1
                ? { ...file, isReal: majorityResult === 'real', progressColor: averageConfidence > 0.5 ? 'green' : 'red' }
                : file
        );
        setFiles(updatedFiles);

        setPreview("Drag & Drop or Click to Upload Audio");
        setFile(null);
    };

    const encodeWAV = (samples, sampleRate, numChannels) => {
        const buffer = new ArrayBuffer(44 + samples.length * 2);
        const view = new DataView(buffer);

        const writeString = (view, offset, string) => {
            for (let i = 0; i < string.length; i++) {
                view.setUint8(offset + i, string.charCodeAt(i));
            }
        };

        writeString(view, 0, 'RIFF');
        view.setUint32(4, 36 + samples.length * 2, true);
        writeString(view, 8, 'WAVE');
        writeString(view, 12, 'fmt ');
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numChannels * 2, true);
        view.setUint16(32, numChannels * 2, true);
        view.setUint16(34, 16, true);
        writeString(view, 36, 'data');
        view.setUint32(40, samples.length * 2, true);

        let offset = 44;
        for (let i = 0; i < samples.length; i++, offset += 2) {
            const s = Math.max(-1, Math.min(1, samples[i]));
            view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }

        return buffer;
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
                                        <div
                                            className="contact-form audiolist"
                                            onDragOver={handleDragOver} // Allow dropping
                                            onDrop={handleDrop} // Handle drop event
                                            onClick={() => document.getElementById('file-upload').click()} // Open file dialog on click
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
                                        {averageResult.result && (
                                            <div className="content pb-40">
                                                <p>Average Result: {averageResult.result}</p>
                                                <p>Average Confidence: {averageResult.confidence.toFixed(2)}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="contact-form audiolist">
                                        <div className="job-item-wrap">
                                            {/* Display all uploaded files */}
                                            {files.map((file, index) => (
                                                <div className="job-item" key={file.id}>
                                                    <Waveform
                                                        audioUrl={file.url}
                                                        waveColor={file.waveColor}
                                                        progressColor={file.progressColor}
                                                        size={file.size}
                                                        filename={file.filename}
                                                        IsReal={file.isReal}
                                                        onPlay={() => handlePlay(file.id)}
                                                        audioId={file.id}
                                                        handleDelete={() => handleDelete(file.id)} // Pass delete handler
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
