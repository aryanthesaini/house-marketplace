import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Spinner from './Spinner';

function HomeSlider() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const listingsRef = collection(db, 'listings');
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      //   console.log(listings);
      setListings(listings);
      setLoading(false);
    };

    fetchListing();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <p className='exploreHeading'>Recommended</p>

        <Slider {...settings}>
          {listings.map(({ data, id }) => (
            <div
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}>
              <div className='swiperSlideDiv' style={{ height: '20rem' }}>
                <img src={data.imgUrls[0]} className='swiperSlideDiv' alt='' />
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ₹{data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </>
    )
  );
}

export default HomeSlider;
