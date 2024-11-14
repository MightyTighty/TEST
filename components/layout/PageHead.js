import Head from 'next/head'

const PageHead = ({ headTitle }) => {
    return (
        <>
            <Head>
                <title>
                    {headTitle ? headTitle : "Raid AI - Deepfake Detection Real Time Protection"}
                </title>
            </Head>
        </>
    )
}

export default PageHead