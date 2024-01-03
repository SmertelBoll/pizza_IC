import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GooglePayButton from "@google-pay/button-react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import GreyButton from "../components/custom/GreyButton";
import { useDispatch } from "react-redux";
import { removeAllPizzas } from "../redux/slices/cartSlice";
import { successOrder } from "../services/alerts";

function Order() {
  const [selectedDelivery, setSelectedDelivery] = useState("");

  const handleChangeDelivery = (event) => {
    setSelectedDelivery(event.target.value);
  };

  const [selectedPay, setSelectedPay] = useState("");

  const handleChangePay = (event) => {
    setSelectedPay(event.target.value);
  };

  const [markers, setMarkers] = useState(false);

  const handleAddMarker = (event) => {
    const { latLng } = event.detail;
    setMarkers(latLng);
  };
  const [zoom, setZoom] = useState(6); // Початковий рівень зуму

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 1); // Збільшення рівня зуму на 1
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 1, 0)); // Зменшення рівня зуму на 1, але не менше 0
  };

  useEffect(() => {
    console.log(markers);
  }, [markers]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteAllPizzas = () => {
    successOrder();
    dispatch(removeAllPizzas());
    navigate("/");
  };

  return (
    <div className="cart">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "0 0 20px 0",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Typography variant="h6" gutterBottom>
              СПОСІБ ДОСТАВКИ
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Виберіть спосіб доставки:</FormLabel>
              <RadioGroup
                aria-label="delivery"
                name="delivery"
                value={selectedDelivery}
                onChange={handleChangeDelivery}
              >
                <FormControlLabel value="selfPickup" control={<Radio />} label="самовивіз" />
                <FormControlLabel value="homeDelivery" control={<Radio />} label="доставка додому" />
              </RadioGroup>
            </FormControl>
          </div>
          {selectedDelivery === "homeDelivery" && (
            <div style={{ minHeight: "500px", minWidth: "40vw", padding: "0 0 30px 0" }}>
              <APIProvider apiKey="AIzaSyA2sPlY_SR2_hkohFv-fKZ9uLwufJBBq_0">
                <div>
                  {/* Кнопки для зумування */}
                  <GreyButton onClick={handleZoomIn}>Zoom In</GreyButton>
                  <GreyButton onClick={handleZoomOut}>Zoom Out</GreyButton>
                </div>
                <Map
                  zoom={zoom}
                  center={{ lat: 48.3794, lng: 31.1656 }} // Координати центру України
                  gestureHandling={"greedy"}
                  disableDefaultUI={true}
                  onClick={handleAddMarker} // Додавання маркера при кліку на карту
                >
                  {markers !== false && <Marker position={markers} />}
                </Map>
              </APIProvider>
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <Typography variant="h6" gutterBottom>
              СПОСІБ ОПЛАТИ
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Виберіть спосіб оплати:</FormLabel>
              <RadioGroup aria-label="pay" name="pay" value={selectedPay} onChange={handleChangePay}>
                <FormControlLabel value="cash" control={<Radio />} label="готівкою" />
                <FormControlLabel value="GooglePay" control={<Radio />} label="GooglePay" />
              </RadioGroup>
            </FormControl>
          </div>
          {selectedPay === "GooglePay" && (
            <div>
              <GooglePayButton
                environment="TEST"
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: "CARD",
                      parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                      },
                      tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                          gateway: "example",
                          gatewayMerchantId: "exampleGatewayMerchantId",
                        },
                      },
                    },
                  ],
                  merchantInfo: {
                    merchantId: "12345678901234567890",
                    merchantName: "Demo Merchant",
                  },
                  transactionInfo: {
                    totalPriceStatus: "FINAL",
                    totalPriceLabel: "Total",
                    totalPrice: "100.00",
                    currencyCode: "USD",
                    countryCode: "US",
                  },
                }}
                onLoadPaymentData={(paymentRequest) => {
                  console.log("load payment data", paymentRequest);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <nav className="cart__navigation">
        <Link to="/cart">
          <button className="cart__back-home cart__button">
            <svg
              className="cart__back-home-img"
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#898989"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Повернутись назад</span>
          </button>
        </Link>
        <button className="cart__buy cart__button" onClick={deleteAllPizzas}>
          Готово
        </button>
      </nav>
    </div>
  );
}

export default Order;
