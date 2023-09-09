import GlobalStyles from "./components/GlobalStyles";
import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "./registry";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import { AuthContextProvider } from "@/app/context/AuthContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Pokemon — Lindhu Parang Kusuma",
  description: "Pokemon at your pocket",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body className={roboto.className}>
          <ApolloWrapper>
            <AuthContextProvider>{children}</AuthContextProvider>
          </ApolloWrapper>
        </body>
      </StyledComponentsRegistry>
      <GlobalStyles />
    </html>
  );
}
