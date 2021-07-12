import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import qs from 'qs';
import {getToken} from "../../utills/Utill"

const data = qs.stringify({
  username:'bsingh91',
  password:'password',
  grant_type:'password'
});


const headers = {
    'Authorization': 'Basic Y2xpZW50OnBhc3N3b3Jk', 
    'Content-Type': 'application/x-www-form-urlencoded'
}

const pdfheader = {
  'Authorization': 'Bearer ' + getToken(),
  'Access-Control-Allow-Origin': '*',
}

// const getToken =  () => {
//   return sessionStorage.getItem("authToken");
// }



function apicall(loginData){
  let oauthUrl = 'http://localhost:8090/oauth/token';
  let cred = {
    'username':'bsingh91',
    'password':'password',
    'grant_type':'password'
  };
  return axios.post(oauthUrl,loginData,{headers: headers})
}

function apicallToDownaloadPdf(){
  let pdfUrl = 'http://localhost:8091/pdfdownload';
  let cred = {
    'username':'bsingh91',
    'password':'password',
    'grant_type':'password'
  };
  return axios.get(pdfUrl,{headers: pdfheader,responseType: 'blob'})
}

function apiTokenKeycall(){
  let oauthUrl = 'http://localhost:8090/oauth/token_key';
  let cred = {
    'username':'bsingh91' ,
    'password':'password',
    'grant_type':'password'
  };
  return axios.get(oauthUrl)
}

export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (loginData, thunkAPI) => {
      const response = await apicall(loginData);
      // const response = await apiTokenKeycall();
      return response.data
    }
)

export const fetchPDF = createAsyncThunk(
  'users/fetchPDF',
  async () => {
    const response = await apicallToDownaloadPdf();
    // const response = await apiTokenKeycall();
    return response.data
  }
)



export const usersSlice = createSlice({
  name: 'users',
  initialState: { data: {}, loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    logout: state => {
      state.data = {}
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchUserById.fulfilled]: (state, action) => {
      // Add user to the state array
      state.data = action.payload;
    },
    [fetchPDF.fulfilled]: (state, action) => {
      // Add user to the state array
      //state.data = action.payload;
      const url = window.URL.createObjectURL(new Blob([action.payload]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      //document.body.appendChild(link);
      link.click();
    }

  }
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;
