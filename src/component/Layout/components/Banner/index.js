import banner from '~/assets/img/banner.jpg';
import cssStyles from './Banner.css';
import styles from './Banner.module.scss';
import classNames from 'classnames/bind';
import { Carousel } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
const VideoProperties = [
    {
        id: 1,
        title: 'Video 1',
        src: 'https://firebasestorage.googleapis.com/v0/b/wintangz.appspot.com/o/video%2Ftiger-video.mp4?alt=media&token=0c458270-812a-4852-baa0-a07e00ea6693&_gl=1*1f8bghu*_ga*OTc2NDkwNzUyLjE2OTY0OTQzMzM.*_ga_CW55HF8NVT*MTY5NjQ5NDMzMy4xLjEuMTY5NjQ5NDM3OC4xNS4wLjA.',
        credit: 'Video about tiger',
        duration: 30000,
    },
    {
        id: 2,
        title: 'Video 2',
        src: 'http://localhost:8080/animals/video/crocodile-video.mp4',
        credit: 'Video about crocodile',
        duration: 8,
    },
    {
        id: 3,
        title: 'Video 3',
        src: 'http://localhost:8080/animals/video/panda-video.mp4',
        credit: 'Video about giraffe',
        duration: 16,
    },
    {
        id: 4,
        title: 'Video 4',
        src: 'http://localhost:8080/animals/video/elephant-video.mp4',
        credit: 'Video about elephant',
        duration: 8,
    },
];
function Banner() {
    const cx = classNames.bind(styles);

    const [activeIndex, setActiveIndex] = useState(0);
    const [playbackReady, setPlaybackReady] = useState(false);
    const playerRef = useRef(null);

    const handleSlide = (selectedIndex) => {
        setActiveIndex(selectedIndex);
    };

    const handleVideoEnded = () => {
        // Calculate the index of the next video
        const nextIndex = (activeIndex + 1) % VideoProperties.length;
        setActiveIndex(nextIndex);
    };

    useEffect(() => {
        // When the component mounts or activeIndex changes, set playbackReady to true
        setPlaybackReady(true);
    }, [activeIndex]);

    return (
        <div className={'banner--container ' + ' ' + cx('container-content')}>
            <Carousel
                activeIndex={activeIndex}
                onSelect={handleSlide}
                interval={null} // Disable Bootstrap Carousel interval
                controls={false} // Hide manual slide controls
                touch={false} // Disable touch gestures for manual slide
            >
                {VideoProperties.map((videoObj, index) => (
                    <Carousel.Item key={videoObj.id}>
                        <div className="video-container">
                            <ReactPlayer
                                ref={playerRef}
                                url={videoObj.src}
                                width="100vw"
                                height="100vh"
                                playing={index === activeIndex && playbackReady}
                                muted={true}
                                loop={false}
                                onEnded={handleVideoEnded} // Handle video end event
                            />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className={cx('content--text')}>
                <div className={cx('text--title')}>
                    <p className={cx('title')}>Welcome To SaiGonZoo Safari</p>
                </div>
                <div className={cx('content')}>
                    <p>Conversation is The</p>
                    <p>
                        Life of <span>WildLife</span>
                    </p>
                </div>
            </div>
            <div className={cx('content--button')}>
                <Link to="./news">Explore Safari</Link>
            </div>
        </div>
    );
}

export default Banner;
