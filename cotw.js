// Estrai le riserve uniche dalla tua "listaPesci"
const reserves = [...new Set(listaPesci.map(p => p.RISERVA))];

// Ordina le riserve in base a questo ordine personalizzato
const ordineRiserve = ['Golden Ridge', 'Trollsporet', 'Aguas Claras', 'Izilo Zasendulo', 'Kamuibetsu'];

reserves.sort((a, b) => ordineRiserve.indexOf(a) - ordineRiserve.indexOf(b));
reserves.reverse();
const reservesContainer = document.getElementById('reserves');
const fishesList = document.getElementById('fishes');
const details = document.getElementById('details');
const titoloPesci = document.getElementById('titolo-pesci');
const titoloDettagli = document.getElementById('titolo-dettagli');

// Cliccando su una riserva, popola l'elenco dei pesci
// All'inizio nascondi le sezioni
titoloPesci.style.display = 'none';
titoloDettagli.style.display = 'none';
fishesList.style.display = 'none';
details.style.display = 'none';

reserves.forEach(riserva => {
    const button = document.createElement('button');
    button.textContent = riserva;
    button.addEventListener('click', () => {
        let pesci = listaPesci.filter(p => p.RISERVA === riserva);
        pesci.sort((a, b) => a.FISH.localeCompare(b.FISH));
        pesci.reverse();

        // Svuota e poi ripopola
        fishesList.innerHTML = '';
        details.innerHTML = '';
        details.style.display = 'none';

        // Mostra la lista pesci
        fishesList.style.display = 'grid';

        pesci.forEach(pesce => {
            const li = document.createElement('li');
            li.innerHTML = `
        <img src="imgpesci/${pesce.FISH.toLowerCase().replace(/\s+/g, '_')}.gif" alt="${pesce.FISH}" style="width:100px;height:auto;display:block;margin-bottom:10px;" />
        <span>${pesce.FISH}</span>`;

            li.addEventListener('click', () => {
                const stili = stileDiPesca.find(entry => entry.pesce === pesce.FISH)?.stili || [];

                details.innerHTML = `
      <h3><strong>${pesce.FISH}</strong></h3>
      <p><strong>Stili di pesca:</strong> ${stili.length ? stili.join(', ') : 'N/A'}</p>
      <h4><strong>Esche</strong></h4>
      <ul>
        ${Object.entries(pesce.esche).map(([esca, percentuale]) =>
                    `<li>${esca} - ${percentuale}%</li>`).join('')}
      </ul>
      <h4><strong>Ranks</strong></h4>
      <ul>
        ${Object.entries(pesce.ranks).map(([rank, info]) =>
                        `<li>${rank}: ${info.numero_amo}, peso: ${info.peso}</li>`).join('')}
      </ul>
      <h4><strong>Zona di Pesca</strong></h4>
      <img src="img/${pesce.RISERVA[0].toLowerCase()}_${pesce.FISH.toLowerCase().replace(/\s+/g, '_')}.webp" alt="${pesce.FISH}" style="width:100%;max-width:400px;height:auto;margin-bottom:20px;" />
    `;
                details.style.display = 'block';
                details.scrollIntoView({ behavior: 'smooth' });
                titoloDettagli.style.display = 'block';
            });


            fishesList.prepend(li);
        });
        titoloPesci.style.display = 'block';
        fishesList.style.display = 'grid';
        // Nascondi dettagli finché non clicco il pesce
        titoloDettagli.style.display = 'none';
        details.style.display = 'none';
    });
    reservesContainer.prepend(button);
});
