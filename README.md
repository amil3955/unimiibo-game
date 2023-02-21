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
informazioni relative alle statuette di Nintendo.

Di seguito verranno mostrati alcuni esempi di chiamate utilizzate da Unimiibo.

### \[ GET \] Lista Amiibo

> https://www.amiiboapi.com/api/amiibo/?type=Figure

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

### \[ GET \] Dettagli singola Amiibo

> https://www.amiiboapi.com/api/amiibo/?name=Link&showusage

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

In questa sezione verranno mostrate piccole porzioni di codice, e perche sono state ritenute
significative.

### Concatenazione di chiamate all'API

Nel file [AmiiboDetails.js](/src/views/AmiiboDetails/AmiiboDetails.js), che corrisponde alla pagina di
visualizzazione dei dettagli di una specifica Amiibo, è stato necessario eseguire due chiamate al servizio
AmiiboAPI per poter recuperare tutte le informazioni necessarie.

La particolarità, però, è che la
costruzione della URI della seconda chiamata dipendeva dal risultato ottenuto dalla prima.
Il problema è stato affrontato tramite il meccanismo di **Async/Await** e delle **Promise**, concetti
avanzati della programmazione JavaScript che però hanno permesso di scrivere una soluzione elegante
per il problema in questione.

```jsx
useEffect(() => {
    fetchData(params.id)
        .then(fetchedAmiibo => {
            if (fetchedAmiibo) {
                setCurrentAmiibo(fetchedAmiibo);
            } else {
                navigator('/not-found');
            }
        });
}, [navigator, params.id])
```

In questo modo viene utilizzato solo uno *useEffect*, al cui interno vengono recuperate le informazioni
della Amiibo corrente oppure si viene reindirizzati alla pagina `'/not-found'`, che corrisponde
alla nota pagina 404.

La funzione `fetchData` è così definita:

```jsx
async function fetchData(id) {
    try {
        const amiiboNameTail = await fetchAmiiboDataByID(id);
        const currentAmiibo = await fetchAmiiboDataByNAME(amiiboNameTail.name, amiiboNameTail.tail);

        return createAmiibo(currentAmiibo, true);
    } catch (error) {
        return undefined;
    }
}
```

In questo modo è possibile eseguire le due chiamate in modo asincrono ma comunque in modo sequenziale,
rendendo quindi possibile utilizzare i dati della prima chiamata per creare la seconda.
Le funzioni `fetchAmiiboDataByID` e `fetchAmiiboDataByNAME` utilizzano il meccanismo Async/Await.

Tutte le funzioni definite come asincrone restituiscono un oggeto di tipo `Promise`, il cui valore
può essere recuperato tramite la concatenazione del metodo `then()` che viene utilizzato come callback.


### La palette di colori delle Amiibo

In Unimiibo, a tutte le Amiibo appartenenti allo stesso franchise (ovvero alla stessa serie, come Pokémon)
è stato associato lo stesso colore.

Il colore principale associato a ogni franchise è definito in un oggetto JavaScript nel file
[Colors.js](/src/utilities/Colors.js)

```jsx
export const seriesMapPalette = {
    "Animal Crossing": 'yellow',
    "ARMS": 'green',
    "Banjo Kazooie": 'orange',
    "Bayonetta": 'pink',
    
    //...
    
    "Super Mario": 'red',
    "The Legend of Zelda": 'green',
    "Wii Fit": 'blue',
    "Xenoblade": 'red',
};
```

Tuttavia, per garantire che possa venire associato un colore anche alle serie non presenti, si
è scelto di utilizzare un metodo basato sull'hash di una stringa, in modo da ottenere come risultato
un colore casuale ma deterministico.

Un colore viene scelto, quindi, nel seguente modo:

```jsx
function indexSeries(series) {
    return strHashCode(series) % colors.length;
}
```

dove `strHashCode` è una funzione definita in [Utils.js](/src/utilities/Utils.js) e calcola un hash
numerico per una stringa data come parametro, che viene utilizzato per creare un indice utilizzabile
nell'array `colors` (definito in [Colors.js](/src/utilities/Colors.js)).

In questo modo anche personaggi che potranno essere aggiunti in futuro alla lista delle Amiibo e che
provengono da franchise nuovi potranno essere associato a un colore casuale ma sempre uguale.


### Le card Amiibo

![Card Amiibo hover effect](/docs/card_on_hover.png)


