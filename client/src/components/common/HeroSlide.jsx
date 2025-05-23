import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { routesGen } from "../../routes/routes";

import uiConfigs from "../../configs/ui.configs";

import CircularRate from "./CircularRate";

import tmdbConfigs from "../../api/configs/tmdb.configs";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      try {
        const { response, err } = await mediaApi.getList({
          mediaType,
          mediaCategory,
          page: 1,
        });

        if (response && Array.isArray(response.results)) {
          setMovies(response.results.slice(0, 5)); // Limit to 5 slides
          console.log(
            `mediaApi.getList Response (${mediaType}/${mediaCategory}):`,
            response
          );
        } else {
          throw new Error(err?.message || "No media data received");
        }
      } catch (error) {
        console.error(
          `mediaApi.getList Error (${mediaType}/${mediaCategory}):`,
          error
        );
        toast.error(
          `Failed to load ${mediaType} ${mediaCategory}: ${error.message}`
        );
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    const getGenres = async () => {
      try {
        dispatch(setGlobalLoading(true));
        const { response, err } = await genreApi.getList({ mediaType });

        if (response && Array.isArray(response.genres)) {
          setGenres(response.genres);
          console.log(`genreApi.getList Response (${mediaType}):`, response);
          await getMedias();
        } else {
          throw new Error(err?.message || "No genres data received");
        }
      } catch (error) {
        console.error(`genreApi.getList Error (${mediaType}):`, error);
        toast.error(`Failed to load genres for ${mediaType}: ${error.message}`);
      } finally {
        dispatch(setGlobalLoading(false));
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: "relative",
        color: "primary.contrastText",
        "&::before": {
          content: '""',
          width: "100%",
          height: "30%",
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 2,
          pointerEvents: "none",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
        },
      }}
    >
      <Swiper
        grabCursor={true}
        loop={movies.length > 1} // Only loop if multiple slides
        style={{ width: "100%", height: "max-content" }}
      >
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  paddingTop: {
                    xs: "130%",
                    sm: "80%",
                    md: "60%",
                    lg: "45%",
                  },
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    movie.backdrop_path || movie.poster_path
                  )})`,
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  ...uiConfigs.style.horizontalGradientBgImage[
                    theme.palette.mode
                  ],
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingX: "30px",
                    color: "text.primary",
                    width: { sm: "unset", md: "30%", lg: "40%" },
                  }}
                >
                  <Stack spacing={4} direction="column">
                    {/* title */}
                    <Typography
                      variant="h4"
                      fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                      fontWeight="700"
                      sx={{
                        ...uiConfigs.style.typoLines(2, "left"),
                      }}
                    >
                      {movie.title || movie.name}
                    </Typography>
                    {/* title */}

                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* rating */}
                      <CircularRate value={movie.vote_average} />
                      {/* rating */}

                      <Divider orientation="vertical" />
                      {/* genres */}
                      {Array.isArray(movie.genre_ids) &&
                        [...movie.genre_ids]
                          .slice(0, 2)
                          .map((genreId, index) => (
                            <Chip
                              variant="filled"
                              color="primary"
                              key={index}
                              label={
                                genres.find((e) => e.id === genreId)?.name ||
                                "Unknown"
                              }
                            />
                          ))}
                      {/* genres */}
                    </Stack>

                    {/* overview */}
                    <Typography
                      variant="body1"
                      sx={{
                        ...uiConfigs.style.typoLines(3),
                      }}
                    >
                      {movie.overview}
                    </Typography>
                    {/* overview */}

                    {/* buttons */}
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      component={Link}
                      to={routesGen.mediaDetail(mediaType, movie.id)}
                      sx={{ width: "max-content" }}
                    >
                      play clip
                    </Button>
                    {/* buttons */}
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <Box
              sx={{
                paddingTop: { xs: "130%", sm: "80%", md: "60%", lg: "45%" },
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundImage: `url(${tmdbConfigs.backdropPath(
                  "/default.jpg"
                )})`, // Fallback image
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5" color="text.primary">
                No media available
              </Typography>
            </Box>
          </SwiperSlide>
        )}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
