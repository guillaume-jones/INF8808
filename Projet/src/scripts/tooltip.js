export function renderTooltip(d) {
  // Counter
  if (d.counts) {
    const counts = Math.round(d.counts / 1000) * 1000;
    return `<div class="tooltip counter-tooltip">
        <p class="tooltip-value"><b>Nom du compteur :</b> ${d.name}</p>
        <p class="tooltip-value"><b>Quartier :</b> ${d.neighborhood}</p>
        <p class="tooltip-value"><b>Comptes :</b> ${counts}</p>
        </div>`;
  } else {
    const counts = Math.round(d.averageCounts / 1000) * 1000;
    return `<div class="tooltip neighborhood-tooltip">
        <p class="tooltip-value"><b>Quartier :</b> ${d.name}</p>
        ${
          counts > 0
            ? `<p class="tooltip-value"><b>Moyenne par compteur :</b> ${counts}</p>`
            : ''
        }
        </div>`;
  }
}
