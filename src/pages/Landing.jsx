import Header from "../components/Header"
import Footer from "../components/footer"

export default function Landing() {
    return (
        <div className="landing-page">
            <Header />
            <main className="landing-content">
                <h2>Welcome</h2>
                <p>Welcome Text</p>
                
                <div className="landing-actions">
                    <button>Register</button>
                </div>
            </main>
        <Footer />
        </div>
    )
}