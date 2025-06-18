document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the page from reloading
  getPokemon();
});

async function getPokemon() {
  const input = document.getElementById("pokeInput").value;
  const id = parseInt(input, 10);

  if (isNaN(id) || id < 1 || id > 251) {
    document.getElementById("pokeInfo").innerHTML =
      `<p style="color:red;">Please enter a number between 1 and 251.</p>`;
    return;
  }

  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Pokémon not found");
    const data = await response.json();

    const name = data.name.toUpperCase();
    const image = data.sprites.front_default;
    const typeList = data.types.map(t => t.type.name).join(", ");
    const hp = data.stats.find(s => s.stat.name === "hp").base_stat;
    const atk = data.stats.find(s => s.stat.name === "attack").base_stat;
    const fullJSON = JSON.stringify(data, null, 2);

    document.getElementById("pokeInfo").innerHTML = `
      <h2>${name}</h2>
      <img src="${image}" alt="${name}">
      <p><strong>Type:</strong> ${typeList}</p>
      <p><strong>HP:</strong> ${hp} | <strong>ATK:</strong> ${atk}</p>
      <details>
        <summary>Full JSON Data</summary>
        <pre>${fullJSON}</pre>
      </details>
    `;
  } catch (err) {
    document.getElementById("pokeInfo").innerHTML =
      `<p style="color:red;">${err.message}</p>`;
  }
}
