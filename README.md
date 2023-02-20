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

* **views**: l'insieme di tutte le pagine della web application. Ogni pagina ha un relativo foglio 
di stile CSS, nella modalità classica (no moduli).


## Descrizione API

L'API utilizzata è [AmiiboAPI](https://amiiboapi.com/), un servizio che permette di recuperare tante
informazioni relative alle statuette di Nintendo. Di seguito verranno mostrati alcuni esempi

### \[GET\] Lista Amiibo

Recupera una lista di tutte le Amiibo disponibili con alcune delle informazioni principali, come il nome
o l'immagine.
```json5
{
  "amiibo": [
    {
      "amiiboSeries": "Super Smash Bros.",
      "character": "Mario",
      "gameSeries": "Super Mario",
      "head": "00000000",
      "image": "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00000002.png",
      "name": "Mario",
      "release": {
        "au": "2014-11-29",
        "eu": "2014-11-28",
        "jp": "2014-12-06",
        "na": "2014-11-21"
      },
      "tail": "00000002",
      "type": "Figure"
    },
    {
      "amiiboSeries": "Super Mario Bros.",
      "character": "Mario",
      "gameSeries": "Super Mario",
      "head": "00000000",
      "image": "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_00000000-00340102.png",
      "name": "Mario",
      "release": {
        "au": "2015-03-21",
        "eu": "2015-03-20",
        "jp": "2015-03-12",
        "na": "2015-03-20"
      },
      "tail": "00340102",
      "type": "Figure"
    },
    //...
  ]
}
```

### \[GET\] Dettagli singola Amiibo

Recupera tutte le informazioni associate a una specifica Amiibo, compresi tutti i bonus per ogni gioco
e per ogni piattaforma compatibile.

Necessita del nome della statuetta come parametro query.

```json5
{
  "amiibo": [
    {
      "amiiboSeries": "Super Smash Bros.",
      "character": "Link",
      "gameSeries": "The Legend of Zelda",
      "games3DS": [
        {
          "amiiboUsage": [
            {
              "Usage": "Unlock character-themed aircraft early",
              "write": false
            }
          ],
          "gameID": [
            "0004000000064900",
            "000400000006CC00",
            "000400000015A300",
            "000400000015C000"
          ],
          "gameName": "Ace Combat Assault Horizon Legacy+"
        },
        //...
      ],
      "gamesSwitch": [
        {
          "amiiboUsage": [
            {
              "Usage": "Unlock a costume based on the character (short-hair version)",
              "write": false
            }
          ],
          "gameID": [
            "01007960049A0000"
          ],
          "gameName": "Bayonetta 2"
        },
        //...
      ],
      "gamesWiiU": [
        {
          "amiiboUsage": [
            {
              "Usage": "Unlock the Spinner weapon",
              "write": false
            },
            {
              "Usage": "Receive a weapon rated 3 stars or higher",
              "write": false
            }
          ],
          "gameID": [
            "000500001017D800",
            "000500001017D900",
            "000500001017CD00"
          ],
          "gameName": "Hyrule Warriors"
        },
        //...
      ],
      "head": "01000000",
      "image": "https://raw.githubusercontent.com/N3evin/AmiiboAPI/master/images/icon_01000000-00040002.png",
      "name": "Link",
      "release": {
        "au": "2014-11-29",
        "eu": "2014-11-28",
        "jp": "2014-12-06",
        "na": "2014-11-21"
      },
      "tail": "00040002",
      "type": "Figure"
    },
    //...
  ]
}
```


## Frammenti di codice

In questa sezione verranno mostrate piccole porzioni di codice