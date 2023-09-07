import GlobalStyles from "./components/GlobalStyles";
import { Roboto } from "next/font/google";
import StyledComponentsRegistry from "./registry";
import BottomNav from "./components/BottomNav/BottomNav";
import { ApolloWrapper } from "@/lib/apollo-wrapper";

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
            {children}
            <BottomNav />
          </ApolloWrapper>
        </body>
      </StyledComponentsRegistry>
      <GlobalStyles />
    </html>
  );
}
