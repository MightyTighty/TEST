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
    const [preview, setPreview] = useState("Drag & Drop or Click to Upload Audio");
    const [averageResult, setAverageResult] = useState({ result: '', confidence: 0 }); // Store average result

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
            setPreview(selectedFile.name); // Display file name instead of image

            // Update files state to include the original file
            const newFile = {
                id: 0, // Use ID 0 for the original file
                url: objectUrl,
                waveColor: '#FFFFFF',
                progressColor: '#FF9900',
                size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
                filename: selectedFile.name,
                isReal: null // Set as null for now since we don't have the result
            };
            setFiles([newFile]); // Reset files list with the original file
        }
    };

    // Handle drag and drop events
    const handleDragOver = (event) => {
        event.preventDefault(); // Allow drop
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(selectedFile.name);// Show file name instead of image

            // Update files state to include the original file
            const newFile = {
                id: 0, // Use ID 0 for the original file
                url: URL.createObjectURL(selectedFile),
                waveColor: '#FFFFFF',
                progressColor: '#FF9900',
                size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
                filename: selectedFile.name,
                isReal: null // Set as null for now since we don't have the result
            };
            setFiles([newFile]); // Reset files list with the original file
        }
    };

    // Function to upload chunks of the audio file
    const uploadChunk = async (chunk, index) => {
        const formData = new FormData();
        const audioFile = new File([chunk], `chunk-${index}.wav`, { type: 'audio/wav' });
        formData.append('file', audioFile);

        let token = localStorage.getItem("token");

        const response = await fetch('http://127.0.0.1:8000/api/audio-upload/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        return response.json();
    };

    // Function to handle file upload and chunking
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
       

        // Calculate average result
        const averageConfidence = totalConfidence / totalResults;
        const majorityResult = isRealCount > totalResults / 2 ? 'real' : 'fake';

        setAverageResult({ result: majorityResult, confidence: averageConfidence });

        // Update the original file result in files state with average result
        const updatedFiles = files.map(file =>
            file.id === 0 ? { ...file, isReal: majorityResult === 'real', progressColor: averageConfidence > 0.5 ? 'green' : 'red' } : file
        );
        setFiles(updatedFiles);
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
                                            onClick={openFileInput} // Open file dialog on click
                                            style={{
                                                width: '100%',
                                                height: '120px',
                                                border: '1.5px solid #FF9900',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <input
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="audio/*"
                                                style={{ display: 'none' }}
                                                id="file-upload"
                                            />
                                            <span>{file ? "File Ready to Upload" : 'Drag & Drop or Click to Upload Audio'}</span>
                                        </div>

                                        <div className="content pb-40">
                                            <p>Noise Suppression</p>
                                            <label>
                                                <Switch onChange={() => handleChange(isChecked)} checked={isChecked} />
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
                                            {/* Original Audio Waveform */}
                                            {files.length > 0 && (
                                                <div className="job-item">
                                                    <Waveform
                                                        key={files[0].id}
                                                        audioUrl={files[0].url}
                                                        waveColor={files[0].waveColor}
                                                        progressColor={files[0].progressColor}
                                                        size={files[0].size}
                                                        filename={files[0].filename}
                                                        IsReal={files[0].isReal}
                                                        onPlay={() => handlePlay(files[0].id)}
                                                        audioId={files[0].id}
                                                        handleDelete={handleDelete} // Pass the delete handler here
                                                        fakeImageUrl="/path/to/fake_image.png"
                                                        realImageUrl="/path/to/real_image.png"
                                                    />
                                                </div>
                                            )}
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
