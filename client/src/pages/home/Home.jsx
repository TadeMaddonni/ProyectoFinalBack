import React from "react";
import HomeBanner from "../../components/pages/home/banner/HomeBanner";
import HomeCta from "../../components/pages/home/cta/HomeCta";
import HomeHero from "../../components/pages/home/hero/Hero";

const Home = () => {
    return (
        <>
            <HomeHero />
            <HomeBanner />
            <HomeCta />
        </>
    );
};

export default Home;
