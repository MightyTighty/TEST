import Head from 'next/head';
import Layout from "@/components/layout/Layout";

export default function Home1() {
  return (
    <>
      <Head>
        <title>RaidAI — Coming Soon</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      <Layout mainCls="main-content fix" headerStyle={1} footerStyle={1}>
        <div className="coming-soon-container mx-auto my-5">
          <div className="coming-soon-logo mb-4">
            Raid<span>AI</span>
          </div>
          <h1 className="mb-2">Coming Soon</h1>
          <p className="text-muted mb-4">
            We’re working hard to bring you our new AI-powered platform.
          </p>

          <form className="subscribe-form d-flex justify-content-center">
            <input
              type="email"
              className="form-control flex-grow-1 me-2"
              placeholder="Your email address"
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-primary">
              Notify Me
            </button>
          </form>
        </div>

        {/* Bootstrap JS Bundle */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

        <style jsx>{`
          :root {
            --brand-primary:   #5A66FF;
            --brand-secondary: #00D68F;
            --brand-light:     #F2F0FF;
            --text-dark:       #1F1F1F;
            --text-light:      #555555;
          }

          .coming-soon-container {
            text-align: center;
            background: #fff;
            padding: 3rem;
            border-radius: 0.5rem;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
            max-width: 400px;
          }

          .coming-soon-logo {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--brand-primary);
          }

          .coming-soon-logo span {
            color: var(--text-dark);
            font-weight: normal;
          }

          h1 {
            color: var(--text-dark);
          }

          p {
            color: var(--text-light);
          }

          .form-control {
            border-radius: 0.25rem;
            border-color: var(--brand-light);
          }

          .btn-primary {
            background: var(--brand-primary);
            border-color: var(--brand-primary);
          }

          .btn-primary:hover {
            background: var(--brand-secondary);
            border-color: var(--brand-secondary);
          }
        `}</style>
      </Layout>
    </>
  );
}
