import "../styles/tailwind.css";
import { ContzaProvider } from "@contza/react";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ContzaProvider
            websiteId={process.env.NEXT_PUBLIC_CONTZA_WEBSITE}
            contzaUrl="http://localhost:3000"
        >
            <Component {...pageProps} />
        </ContzaProvider>
    );
};

export default App;
