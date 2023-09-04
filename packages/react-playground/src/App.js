import { ContentProvider, ContzaProvider, ContzaText } from "@contza/react";

function App() {
    return (
        <ContzaProvider websiteId="website-id" contzaUrl="http://localhost:3000">
            <ContentProvider slug="home">
                <div className="App">
                    <div className="bg-black text-white">
                        <div className="section text-center py-40">
                            <h1 className="text-5xl font-bold mb-8">
                                <ContzaText>Heading</ContzaText>
                            </h1>
                            <ContzaText>Heading description</ContzaText>
                        </div>
                    </div>
                </div>
            </ContentProvider>
        </ContzaProvider>
    );
}

export default App;
