import axios from "axios";
// import React from "react";
import { GetServerUrl } from "../../global/variables";
import { Password } from "@mui/icons-material";


export const GetLogin = (Usuario: { Usuario: any, Password: any }) =>
    new Promise((resolver: any, Denegar: any) => {
        console.log("esta este es el usuario y la contraseña: ", Usuario )
        axios.post(`${GetServerUrl()}Usuarios/login`, Usuario) 
            .then(res => {
                resolver(res);

            }).catch(err => {
                Denegar(err);
            })
    })


export const GetUsers = () =>
    new Promise((resolver: any, Denegar: any) => {
        console.log("esta entrando a get usuarios: ")
        axios.get(`${GetServerUrl()}Users/GetUsers`)
            .then(res => {
                resolver(res);

            }).catch(err => {
                Denegar(err);
            })
    })

 
