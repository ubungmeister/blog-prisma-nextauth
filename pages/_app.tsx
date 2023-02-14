import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Header from "@/components/layout/Header";
import {AppContextProvider} from "@/components/authContext/AuthContext";
import {SessionProvider} from "next-auth/react";


export default function App({Component, pageProps}: AppProps) {
    return (
        <AppContextProvider>
            <SessionProvider session={pageProps}>
            <Header/>
            <Component {...pageProps} />
            </SessionProvider>
        </AppContextProvider>
    )
}
