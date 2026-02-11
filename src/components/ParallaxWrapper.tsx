function ParallaxWrapper() {
    return (
        <>
            <div className= "parallax-wrapper">
                <div className="layer layer-mid" data-speed="0.5"></div>
                <div className="layer layer-front" data-speed="0.9" ></div>
                <div className = "crt-overlay" ><div/> 
            </div>
        </>
    );
}

export default ParallaxWrapper;