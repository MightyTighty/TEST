import Layout from "@/components/layout/Layout"
import About2 from "@/components/sections/About2"
import Banner3 from "@/components/sections/Banner3"
import Brand2 from "@/components/sections/Brand2"
import Cta from "@/components/sections/Cta"
import Pricing3 from "@/components/sections/Pricing3"
import Services2 from "@/components/sections/Services2"
import Speech from "@/components/sections/Speech"
import Testimonial3 from "@/components/sections/Testimonial3"
import Voices from "@/components/sections/Voices"
export default function Home3() {

    return (
        <>
            <Layout mainCls="main-content-two fix" headerStyle={3} footerStyle={3}>
                <Banner3 />
                <Speech />
                <Brand2 />
                <Services2 />
                <About2 />
                <Voices />
                <Pricing3 />
                <Testimonial3 />
                <Cta />
            </Layout>
        </>
    )
}