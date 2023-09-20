import Header from '~/component/Layout/components/Header';
import Sidebar from '~/component/Layout/components/Sidebar';
import Footer from '~/component/Layout/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <Sidebar />
            <div className="container">{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
