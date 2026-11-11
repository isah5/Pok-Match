import "./globals.css";

export const metadata = {
  title: "PokéMatch",
  description: "Card Swipe de Pokémon com Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
