import type { ComponentType } from 'react';
export type { ISendOtp, ILogin, IVerifyOtp } from './auth.type'
export type { ITourPackage } from './tour.type';

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}


export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType
  }[];
}


export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";