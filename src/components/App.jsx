import React, { useState } from 'react';
import {Route, Routes , BrowserRouter} from "react-router-dom";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import Navbar from "./Navbar.jsx";
import Community from "./Community.jsx";
import Profile from "./Profile.jsx";
import Feed from "./Feed.jsx";
import Home from "./Home.jsx";



import './App.css';
import "./style.css";
import Create from './Create.jsx';

const wallets = [new PhantomWalletAdapter()];

function App() {
    



    return(

        <ConnectionProvider endpoint={clusterApiUrl('devnet')}>
            <WalletProvider wallets={wallets} autoConnect= {true}>
                <WalletModalProvider>
                    <BrowserRouter>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/community"  element={<Community />}/>
                            <Route path="/profile"  element={<Profile/>}/>
                        </Routes>
                    </BrowserRouter>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
                

    );
}


export default App;