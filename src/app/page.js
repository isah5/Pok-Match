"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [id, setId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setErro(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error(`PokéAPI respondeu ${r.status}`);
        return r.json();
      })
      .then((data) =>
        setPokemon({
          id: data.id,
          name: data.name,
          image:
            data.sprites.other["official-artwork"].front_default ??
            data.sprites.front_default,
        })
      )
      .catch((e) => setErro(e.message));
  }, [id]);

  async function capturar() {
    if (!pokemon) return;
    await fetch("/api/favoritos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    });
    setId(id + 1);
  }

  return (
    <main style={{ padding: 20, textAlign: "center" }}>
      <Link href="/favoritos">Minha Pokédex</Link>
      <h1>PokéMatch</h1>

      {erro && <p style={{ color: "red" }}>Erro ao buscar Pokémon: {erro}</p>}
      {!pokemon && !erro && <p>Carregando...</p>}

      {pokemon && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: 12,
            padding: 20,
            maxWidth: 260,
            margin: "20px auto",
          }}
        >
          <img src={pokemon.image} alt={pokemon.name} width={200} />
          <h2 style={{ textTransform: "capitalize" }}>
            #{pokemon.id} {pokemon.name}
          </h2>
        </div>
      )}

      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => setId(id + 1)}>Passar</button>
        <button onClick={capturar} disabled={!pokemon}>
          Capturar
        </button>
      </div>
    </main>
  );
}