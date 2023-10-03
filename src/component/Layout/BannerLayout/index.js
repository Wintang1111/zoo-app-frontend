import Header from '~/component/Layout/components/Header';
import Footer from '~/component/Layout/components/Footer';
import NormalBanner from '~/component/Layout/components/NormalBanner';
function BannerLayout({ children }) {
    return (
        <div>
            <Header />
            <NormalBanner />
            {children}
            <Footer />
        </div>
    );
}

export default BannerLayout;