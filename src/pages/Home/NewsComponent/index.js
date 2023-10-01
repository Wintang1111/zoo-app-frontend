import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import ImageSlider from './imageSlider.js';
import images from './postComponent.js';
import news from './newsList';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function News() {
    return (
        <div className={cx('news')}>
            <div className={cx('news-container')}>
                <div className={cx('content')}>
                    <div className={cx('news-welcome')}>
                        <div className={cx('welcome')}>
                            <p>Safari Tour!</p>
                        </div>
                        <div className={cx('information--title')}>
                            <h1>
                                Discover Animal <span>Way!</span>
                            </h1>
                        </div>
                    </div>
                    <div className={cx('all--news')}>
                        <div className={cx('news--left')}>
                            <ImageSlider images={images} />
                        </div>
                        <div className={cx('news--right')}>
                            <div className={cx('news--tab--list')}>
                                <p className={cx('tab--list--name')}>Latest</p>
                            </div>
                            <div className={cx('news--list')}>
                                <ul className={cx('news--ul')}>
                                    {news.map((post) => {
                                        return (
                                            <>
                                                <li key={post.id} className={cx('news-obj')}>
                                                    <Link to={post.path}>
                                                        <p className={cx('news-name')}>{post.name}</p>
                                                        <p className={cx('news-date')}>{post.date}</p>
                                                    </Link>
                                                </li>
                                            </>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className={cx('more-btn')}>
                                <Link to="/news">
                                    <FontAwesomeIcon icon={faPlus} />
                                    <p>More</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;
