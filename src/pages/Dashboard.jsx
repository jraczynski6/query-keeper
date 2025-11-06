import Header from "../components/Header"
import NavMenu from "../components/NavMenu/NavMenu"
import Footer from "../components/footer"

export default function Dashboard() {
    return (
        <div className="dashboard-page">
            <Header />
            <NavMenu />
            <div className="dashboard-content">
                {/* Canvas Here */}
                <p>Canvas Here</p>
            </div>
            <Footer />
        </div>
    )
}