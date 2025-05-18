import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import Topbar from "../common/Topbar";
import AuthModal from "../common/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";
import { setListFavorites, setUser } from "../../redux/features/userSlice";

const MainLayout = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("actkn");

      // Skip API call if no token exists
      if (!token) {
        dispatch(setUser(null));
        setIsLoading(false);
        return;
      }

      const { response, err } = await userApi.getInfo();

      if (response) {
        dispatch(setUser(response));
      }
      if (err) {
        dispatch(setUser(null));
        // Optional: show error only if status is not 401
        if (err.status !== 401) {
          toast.error("Failed to get user information");
        }
      }

      setIsLoading(false);
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();

      if (response) {
        dispatch(setListFavorites(response));
      } else {
        // Set empty array as fallback even on error
        dispatch(setListFavorites([]));
        if (err) toast.error(err.message);
      }
    };

    if (user) getFavorites();
    if (!user) dispatch(setListFavorites([]));
  }, [user, dispatch]);

  return (
    <>
      {/* global loading */}
      {isLoading && <GlobalLoading />}
      {/* global loading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;
