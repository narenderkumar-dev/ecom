import React from "react";
import AddressDetailCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple, purple } from "@mui/material/colors";
import StarBorderIcon from '@mui/icons-material/StarBorder';

const OrderDetails = () => {
  return (
    <div className="px:5 lg:px-20">
      <div>
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressDetailCard />
      </div>
      <div className="py-10">
        <OrderTracker activeStep={3} />
      </div>

      <Grid className="space-y-5" container>
        {[1,1,1,1].map((item)=><Grid
          item
          container
          className="shadow-xl rounded-md p-5 border"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Grid item xs={6}>
            <div className="flex items-center space-x-4">
              <img
                className="w-[5rem] h-[5rem] object-cover object-top"
                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Lunar_Peak.jpg?v=1698819324"
                alt=""
              />
              <div className="space-y-2 ml-5">
                <p className="font-semibold">Men solid mid black jeans</p>
                <p className="space-x-5 opacity-50 text-xs font-semibold">
                  <span>color : pink</span>
                  <span>size : m</span>
                </p>
                <p>seller: linaria</p>
                <p>$1999</p>
              </div>
            </div>
          </Grid>

          <Grid item>
            <Box sx={{ color: deepPurple[500] }}>
                <StarBorderIcon sx={{fontSize:"2rem"}} className="px-2"/>
                <span>Rate and review product</span>
                {/* <StarBorderIcon fontSize={3} className="px-2"/>
                <span>Rate and review product</span> */}
            </Box>
          </Grid>
        </Grid>)}
      </Grid>
    </div>
  );
};

export default OrderDetails;
