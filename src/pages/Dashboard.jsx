import Header from "../components/Header"
import NavMenu from "../components/NavMenu/NavMenu"
import Footer from "../components/footer"

export default function Dashboard() {
    return (
        <div className="dashboard-page">
            <Header />
            <div className="dashboard-container">
                {/* Canvas Here */}
                <p>Canvas Here</p>
            </div>
            <NavMenu />
            <Footer />
        </div>
    )
}