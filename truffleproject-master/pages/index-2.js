import Layout from "@/components/layout/Layout"
import About1 from "@/components/sections/About1"
import Banner2 from "@/components/sections/Banner2"
import Brand1 from "@/components/sections/Brand1"
import Compare from "@/components/sections/Compare"
import Counter2 from "@/components/sections/Counter2"
import Features from "@/components/sections/Features"
import Language from "@/components/sections/Language"
import Pricing2 from "@/components/sections/Pricing2"
import Services1 from "@/components/sections/Services1"
import Testimonial2 from "@/components/sections/Testimonial2"
export default function Home2() {

    return (
        <>
            <Layout headerStyle={2} footerStyle={2}>
                <Banner2 />
                <Features />
                <Brand1 />
                <Compare />
                <About1 />
                <Testimonial2 />
                <Services1 />
                <Language />
                <div className="area-bg" data-background="assets/img/bg/area_bg.jpg">
                    <Pricing2 />
                    <Counter2 />
                </div>
            </Layout>
        </>
    )
}