import NavMenu from "../components/NavMenu/NavMenu";

export default function About() {
    return (
        <div className="about-page">
            <Header />
            <NavMenu />

            <main className="about-content">
                <h1>About Query Keeper</h1>
                <p>Welcome to Query Keeper.</p>
                <p>In depth explanation of our mission</p>
            </main>
            <Footer />
        </div>
    )
}