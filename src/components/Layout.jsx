import Footer from "./footer";
import Header from "./Header";
import NavMenu from "./NavMenu/NavMenu";
import "../styles/Layout.css";

export default function Layout({children}) {
    return(
        <div className="app=layout">
            <Header />
            <NavMenu />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
}