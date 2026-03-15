type ParallaxWrapperProps = { midSpeed: number, frontSpeed: number }

function ParallaxWrapper({ midSpeed, frontSpeed }: ParallaxWrapperProps) {
    return (
        <>
            <div className= "parallax-wrapper">
                <div className="layer layer-mid" data-speed={midSpeed}></div>
                <div className="layer layer-front" data-speed={frontSpeed}></div>
                <div className = "crt-overlay" ></div>
            </div>
        </>
    );
}

export default ParallaxWrapper;