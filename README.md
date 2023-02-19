# Unimiibo

<picture>
 <source media="(prefers-color-scheme: dark)" srcset="/src/assets/LogoUnimiibo/unimiibo_logo_wh.png">
 <img alt="Unimiibo Logo" src="/src/assets/LogoUnimiibo/unimiibo_logo.png">
</picture>

Unimiibo è una semplice web application per la visualizzazione delle Amiibo, particolari "statuette"
prodotte direttamente da Nintendo per tanti franchise famosi di sua proprietà, come Super Mario,
The Legend of Zelda e Pokémon.

Le Amiibo possono essere considerate anche come semplici oggetti da collezione, ma sono molto di più:
infatti, ogni Amiibo è dotata di un tag NFC che le permette di comunicare direttamente con le console
di casa Nintendo (come Nintendo 3DS, Nintendo Wii U e la più recente Nintendo Switch), per ottenere
bonus e vantaggi esclusivi in tanti giochi diversi.


## La struttura del progetto

Dal momento che Unimiibo è un progetto complesso, è stato necessario fin da subito definire una
struttura precisa per l'organizzazione delle risorse (come file di codice, o immagini).

* **assets**: contiene tutte le risorse multimediali utilizzate per la creazione
di Unimiibo. É a sua volta suddivisa in sotto-directory, in modo da accorpare risorse semanticamente
simili.

* **components**: comprende sia componenti specifici per il progetto Unimiibo che componenti
generici (direttamente utilizzabili, quindi, anche in progetti diversi o con minimi cambiamenti del 
codice o addirittura così come sono). I componenti sono organizzati in sotto-directory in modo da
associare a ogni file di codice anche il relativo foglio di stile (vengono utilizzati i moduli CSS).

* **utilities**: racchiude tutti quei file javascript che contengono funzionalità generiche o
dati globali utilizzabili in parti diverse del progetto.

* **views**: l'insieme di tutte le pagine della web application. Ogni pagina ha un relativo foglio di stile
CSS, nella modalità classica (no moduli).