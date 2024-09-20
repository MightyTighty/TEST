import Layout from "@/components/layout/Layout";
import Link from "next/link";
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

        let token = localStorage.getItem("token");

        const response = await fetch('http://127.0.0.1:8000/api/audio-upload/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.status === 401) {
            // Token might be expired, try refreshing it
            const refresh = localStorage.getItem('refresh');
            const refreshResponse = await fetch('http://127.0.0.1:8000/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refresh })
            });

            const refreshData = await refreshResponse.json();

            if (refreshData.access) {
                // Update token in localStorage
                localStorage.setItem('token', refreshData.access);
                token = refreshData.access;

                // Retry the upload with the new token
                const retryResponse = await fetch('http://127.0.0.1:8000/api/audio-upload/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (retryResponse.ok) {
                    const result = await retryResponse.json();
                    setUploadResult(result);
                    updateFiles(result); // Update files with the response
                } else {
                    console.error('Error uploading file after token refresh:', await retryResponse.json());
                }
            } else {
                console.error('Failed to refresh token:', refreshData);
                // Redirect to login or handle token refresh failure
            }
        } else if (response.ok) {
            const result = await response.json();
            setUploadResult(result);
            updateFiles(result); // Update files with the response
        } else {
            console.error('Error uploading file:', await response.json());
        }
    };

    const updateFiles = (result) => {
        // Add the uploaded file to the audio files list
        const newFile = {
            id: files.length + 1, // Incremental ID
            url: preview, // Use the preview URL for the uploaded file
            waveColor: '#FFFFFF',
            progressColor: result.result === 'real' ? 'green' : 'red', // Green for real, red for fake
            size: { height: 50, barHeight: 20, barRadius: 2, barWidth: 3 },
            filename: file.name,
            isReal: result.result === 'real' // True for real, false for fake
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
                                                    />
                                                    <img
                                                        src="/assets/img/voice/deleteicon.png" // Delete icon path
                                                        alt="Delete"
                                                        onClick={() => handleDelete(audio.id)} // Delete handler
                                                        className="delete-icon"
                                                        style={{
                                                            width: '24px',
                                                            height: '24px',
                                                            cursor: 'pointer',
                                                            display: 'block',
                                                            margin: '10px auto',
                                                        }}
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
