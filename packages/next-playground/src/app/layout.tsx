import { ContzaProvider } from "@contza/react/dist";
import { ReactNode } from "react";
import "../styles/tailwind.css";

export const metadata = {
    title: "Next Playground",
    description: "Contza Next Playground",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <ContzaProvider
                    websiteId={process.env.NEXT_PUBLIC_CONTZA_WEBSITE}
                    contzaUrl="http://localhost:3000"
                >
                    {children}
                </ContzaProvider>
            </body>
        </html>
    );
}
