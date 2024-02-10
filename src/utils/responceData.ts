import { ProductResponceType2 } from "../types/productType";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";

type ResDataType =
  | {
      data: ProductResponceType2;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responceData = (
  res: ResDataType,

  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const err = res.error as FetchBaseQueryError;
    const messageResponce = err.data as ProductResponceType2;
    toast.error(messageResponce.message);
  }
};

export const latestMonth = () => {
  const currentDate = moment();
  currentDate.date(1);

  const last6Month: string[] = [];
  const last12Month: string[] = [];

  for (let i = 0; i < 6; i++) {
    const newDate = currentDate.clone().subtract(i, "months");
    const monthName = newDate.format("MMMM");
    last6Month.unshift(monthName);
  }
  for (let i = 0; i < 12; i++) {
    const newDate = currentDate.clone().subtract(i, "months");
    const monthName = newDate.format("MMMM");
    last12Month.unshift(monthName);
  }
  return {
    last12Month,
    last6Month,
  };
};
latestMonth();
