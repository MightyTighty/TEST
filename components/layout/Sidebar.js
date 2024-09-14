import Link from "next/link"
import { useState } from "react"

export default function Sidebar() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }
    return (
        <>
            <ul className="navigation">
            <li><Link href="/">Home</Link></li>
                <li><Link href="/contact">contacts</Link></li>
                <li><Link href="/#pricing">Pricing</Link></li>
                <li><Link href="/demo">Demo</Link></li>
            </ul>

        </>
    )
}
