import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMedias = async () => {
      setIsLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      setIsLoading(false);

      if (response) setMedias(response.results || []);
      if (err) toast.error(err.message);
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias && medias.length > 0 ? (
        medias.map((media, index) => (
          <SwiperSlide key={index}>
            <MediaItem media={media} mediaType={mediaType} />
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <div
            style={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoading ? "Loading..." : "No media found"}
          </div>
        </SwiperSlide>
      )}
    </AutoSwiper>
  );
};

export default MediaSlide;
