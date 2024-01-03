import { React, useEffect, useState, useRef } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

import logo from "../assets/img/logo.png";
import { useSelector } from "react-redux";
import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import GreyButton from "./custom/GreyButton";
import { useAuth } from "./auth/Auth";
import { SignOutAlert } from "../services/alerts";
import { useQuery } from "react-query";
import { getAvatar, getUserName } from "../services/user-profile-api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const CDNURL = "https://ubgaioenvbnlnkpgtyml.supabase.co/storage/v1/object/public/profiles/";

const Header = () => {
  const [menuItem, setMenuItem] = useState(null);

  // вихід з акаунта
  const { token, setToken, signOut, image, userName, setUserName } = useAuth();
  const navigate = useNavigate();

  const logOutFunc = () => {
    signOut();
    setToken(false);
    localStorage.removeItem("token");
    localStorage.removeItem("password");
    navigate("/");
  };
  const handleLogOut = async () => {
    handleCloseMenu();
    SignOutAlert(logOutFunc);
  };

  // меню
  const openMenu = Boolean(menuItem);
  const handleClickMenu = (event) => {
    setMenuItem(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenuItem(null);
  };

  // аватар
  const {
    data: avatar,
    isFetched: isFetchedAvatar,
    refetch: refetchAvatar,
  } = useQuery({
    queryKey: ["getAvatar", token?.user?.id],
    queryFn: getAvatar,
    enabled: Boolean(token),
  });

  useEffect(() => {
    refetchAvatar();
  }, [image]);

  // username
  const { data: userNameData, isFetched: isFetchedUserName } = useQuery({
    queryKey: ["getUserName", token?.user?.id], // повторяти запрос, коли міняється token
    queryFn: getUserName,
    enabled: Boolean(token),
  });

  useEffect(() => {
    if (isFetchedUserName) setUserName(userNameData);
  }, [isFetchedUserName]);

  // other
  const { itemsCart, totalCount, totalPrice } = useSelector((state) => state.cart);
  const isMounted = useRef(false);

  let location = useLocation();
  let isButton = location.pathname !== "/cart" ? true : false;

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cart", JSON.stringify(itemsCart));
      localStorage.setItem("count", JSON.stringify(totalCount));
      localStorage.setItem("price", JSON.stringify(totalPrice));
    }
    isMounted.current = true;
  }, [itemsCart]);

  return (
    <header className="header">
      <Link to="/">
        <div className="header__logo-and-name">
          <img src={logo} alt="" className="header__logo" width={38} height={38} />

          <div>
            <h1 className="header__name">PIZZA SHOP</h1>
            <p className="header__description">Найсмачніша піца у світі</p>
          </div>
        </div>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {isButton && <Button />}

        {/* auth */}
        <Box
          variant="p"
          sx={{
            flexBasis: "33.33%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {token ? (
            <Box>
              <GreyButton
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClickMenu}
                sx={{
                  pr: { xs: 0, sm: 2 },
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                  <Typography
                    variant="p"
                    sx={{
                      display: "block",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "17vw",
                    }}
                  >
                    {userName ? userName : token.user.email.split("@")[0]}
                  </Typography>
                </Box>
                {avatar && isFetchedAvatar ? (
                  <Avatar
                    src={CDNURL + token?.user?.id + "/" + avatar?.name}
                    sx={{
                      width: "36px",
                      height: "36px",
                      ml: { xs: 0, sm: 1 },
                      bgcolor: "text.grey",
                    }}
                  />
                ) : (
                  <AccountCircleIcon sx={{ ml: { xs: 0, sm: 1 }, fontSize: "36px" }} />
                )}
              </GreyButton>

              <Menu
                id="basic-menu"
                anchorEl={menuItem}
                open={openMenu}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Link to="/profile">
                  <MenuItem
                    onClick={handleCloseMenu}
                    sx={{
                      fontSize: (theme) => theme.typography.menuItem.fontSize,
                      fontWeight: (theme) => theme.typography.menuItem.fontWeight,
                      color: "text.grey",
                    }}
                  >
                    Profile
                  </MenuItem>
                </Link>

                <MenuItem
                  sx={{
                    fontSize: (theme) => theme.typography.menuItem.fontSize,
                    fontWeight: (theme) => theme.typography.menuItem.fontWeight,
                    color: "text.grey",
                  }}
                  onClick={handleLogOut}
                >
                  Log out
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <GreyButton link="/log-in">log in</GreyButton>
          )}
        </Box>
      </div>
    </header>
  );
};

export default Header;
