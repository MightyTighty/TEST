import Layout from "@/components/layout/Layout"
export default function Work() {

    return (
        <>
            <Layout headerStyle={1} footerStyle={1} breadcrumbTitle={<>How it <span>Works</span></>}>
                <section className="work-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="work-item" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                                    <div className="work-thumb">
                                        <img src="assets/img/images/work_img01.png" alt="" />
                                    </div>
                                    <div className="work-content">
                                        <span>Step 1</span>
                                        <h2 className="title">Sign Up or Log In</h2>
                                        <p>Create an account or log in to access RAID AI’s deepfake detection service. This ensures a secure and personalized experience for each user.</p>
                                    </div>
                                </div>
                                <div className="work-item" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                                    <div className="work-thumb">
                                        <img src="assets/img/images/work_img02.png" alt="" />
                                    </div>
                                    <div className="work-content">
                                        <span>Step 2</span>
                                        <h2 className="title">Upload Audio File</h2>
                                        <p>Once logged in, upload your audio file. RAID AI supports various formats like MP3, WAV, and more to ensure compatibility.</p>
                                    </div>
                                </div>
                                <div className="work-item" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                                    <div className="work-thumb">
                                        <img src="assets/img/images/work_img03.png" alt="" />
                                    </div>
                                    <div className="work-content">
                                        <span>Step 3</span>
                                        <h2 className="title">Processing with RAID AI</h2>
                                        <p>RAID AI’s advanced model analyzes the uploaded audio, detecting whether it is genuine or a deepfake with precision and speed.</p>
                                    </div>
                                </div>
                                <div className="work-item" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                                    <div className="work-thumb">
                                        <img src="assets/img/images/work_img04.jpg" alt="" />
                                    </div>
                                    <div className="work-content">
                                        <span>Step 4</span>
                                        <h2 className="title">Receive Your Report</h2>
                                        <p>After processing, RAID AI generates a detailed report, providing insights, confidence scores, and a clear verdict on the authenticity of the audio.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    )
}
