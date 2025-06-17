// Estrai le riserve uniche dalla tua "listaPesci"
const reserves = [...new Set(listaPesci.map(p => p.RISERVA))];

// Ordina le riserve in base a questo ordine personalizzato
const ordineRiserve = ['Golden Ridge', 'Trollsporet', 'Aguas Claras', 'Izilo Zasendulo', 'Kamuibetsu'];

reserves.sort((a, b) => ordineRiserve.indexOf(a) - ordineRiserve.indexOf(b));
reserves.reverse();
const reservesContainer = document.getElementById('reserves');
const fishesList = document.getElementById('fishes');
const details = document.getElementById('details');

// Cliccando su una riserva, popola l'elenco dei pesci
reserves.forEach(riserva => {
  const button = document.createElement('button');
  button.textContent = riserva;
  button.addEventListener('click', () => {
    // Filtra i pesci di quella riserva
    let pesci = listaPesci.filter(p => p.RISERVA === riserva);
    // Ordina i pesci in ordine alfabetico
    pesci.sort((a, b) => a.FISH.localeCompare(b.FISH));
    pesci.reverse();
    // Svuota la lista
    fishesList.innerHTML = '';
    details.innerHTML = '';
    // Aggiungi ogni pesce come <li>
    pesci.forEach(pesce => {
      const li = document.createElement('li');
      li.textContent = pesce.FISH;
      li.addEventListener('click', () => {
        // Mostra dettagli
        details.innerHTML = `
          <h3>${pesce.FISH}</h3>
          <p>Riserva: ${pesce.RISERVA}</p>
          <h4>Esche</h4>
          <ul>
            ${Object.entries(pesce.esche).map(([esca, percentuale]) =>
              `<li>${esca} - ${percentuale}%</li>`).join('')}
          </ul>
          <h4>Ranks</h4>
          <ul>
            ${Object.entries(pesce.ranks).map(([rank, info]) =>
              `<li>${rank} - amo: ${info.numero_amo}, peso: ${info.peso}</li>`).join('')}
          </ul>
<h4>Immagine</h4>
<img src="img/${pesce.RISERVA[0].toLowerCase()}_${pesce.FISH.toLowerCase().replace(/\s+/g, '_')}.webp" alt="${pesce.FISH}" style="width:100%;max-width:400px;height:auto;margin-bottom:20px;" />
`;
      });
      fishesList.prepend(li);
    });
  });
  reservesContainer.prepend(button);
});
