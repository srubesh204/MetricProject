import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import './loader.css'
import { useSelector } from "react-redux";

export default function SimpleBackdrop() {
  let loader = useSelector((state) => state.loader.loader);
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <div class="newtons-cradle">
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
        </div>
      </Backdrop>
    </div>
  );
}
