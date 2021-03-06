import * as React from 'react';

// Importing a light build (only supporting svg renderer) for lottie (NB: still 40,9K gzipped :O )
// React-lottie did not work with our animations for some reason (guessing some features were not yet supported)
import lottie from 'lottie-web/build/player/lottie_light';

interface IAnimationLoaderProps {
    name: string;
}

export const AnimationLoader: React.FC<IAnimationLoaderProps> = ({ name }) => {
    const container = React.useRef(null);

    React.useEffect(() => {
        void loadAnimationAsync(name);
    }, [name]);

    const loadAnimationAsync = async (_name: string) => {
        try {
            const animationData = await import(/* webpackChunkName: "animation/[request]" */ `../../../public/animations/${_name}.json`);

            lottie.loadAnimation({
                container: container.current, // the dom element that will contain the animation
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData,
            });
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error('Error loading animation');
        }
    };

    return <div ref={container} />;
};
