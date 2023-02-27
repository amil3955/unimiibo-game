# Unimiibo

<picture>
 <source media="(prefers-color-scheme: dark)" srcset="/src/assets/LogoUnimiibo/unimiibo_logo_wh.png">
 <source media="(prefers-color-scheme: light)" srcset="/src/assets/LogoUnimiibo/unimiibo_logo.png">
 <img alt="Unimiibo Logo" src="/src/assets/LogoUnimiibo/unimiibo_logo.png">
</picture>


[Unimiibo](https://disteroby.github.io/unimiibo/) è una web application per la visualizzazione 
di **Amiibo**, ovvero particolari "statuette" prodotte direttamente da Nintendo per tanti franchise
famosi di sua proprietà come Super Mario, The Legend of Zelda e Pokémon.

Le Amiibo a prima vista possono sembrare normali oggetti da collezione, ma in realtà sono molto 
di più: infatti, ogni Amiibo è dotata di un *tag NFC* che le consente di comunicare direttamente con
le console di casa Nintendo (come Nintendo 3DS, Nintendo Wii U e Nintendo Switch),
per ottenere bonus e vantaggi esclusivi in tantissimi videogiochi.


## Struttura del progetto

Dal momento che Unimiibo è un progetto complesso, è stato necessario definire una
struttura precisa per l'organizzazione delle risorse (come file di codice sorgente, immagini, ecc...).

Le directory principali del progetto sono:

* **assets**: contiene tutte le risorse multimediali utilizzate per la creazione
di Unimiibo. É a sua volta suddivisa in sotto-directory, in modo da accorpare risorse semanticamente
simili.

* **components**: comprende sia componenti specifici per il progetto Unimiibo che componenti
generici (direttamente utilizzabili, quindi, anche in progetti diversi con lievissimi cambiamenti del 
codice o addirittura così come sono). I componenti sono organizzati in sotto-directory in modo da
accorpare a ogni file di codice anche il relativo foglio di stile (vengono utilizzati i moduli CSS).

* **utilities**: racchiude tutti quei file javascript che contengono preferenze globali e
funzionalità generiche richiamabili in diverse parti del progetto.

* **views**: l'insieme di tutte le pagine della web application. Ogni pagina ha un relativo foglio 
di stile CSS, nella modalità classica (no moduli).


## Descrizione API esterna

L'API utilizzata è [AmiiboAPI](https://amiiboapi.com/), un servizio che permette di recuperare tante
informazioni relative alle statuette di Nintendo.

Di seguito verranno mostrati alcuni esempi di chiamate utilizzate da Unimiibo.

### Lista Amiibo \[ GET \]

> URL: https://www.amiiboapi.com/api/amiibo/?type=Figure

Recupera una lista di tutte le Amiibo disponibili contenente alcune delle informazioni principali, 
come ad esempio il nome o l'immagine.

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

### Dettagli singola Amiibo \[ GET \]

> URL: https://www.amiiboapi.com/api/amiibo/?name=Link&showusage

Recupera tutte le informazioni associate a una specifica Amiibo, compresi tutti i bonus per ogni gioco
e per ogni piattaforma compatibile.

Necessita del **nome** della statuetta come parametro query, non dell'**ID**.

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

In questa sezione verranno mostrate piccole porzioni significative di codice per facilitare
la comprensione di alcune funzionalità complesse del progetto.


### Concatenazione di chiamate all'API

Nel file [AmiiboDetails.js](/src/views/AmiiboDetails/AmiiboDetails.js), che è associato alla pagina di
visualizzazione dei dettagli di una specifica Amiibo, è stato necessario eseguire due chiamate al servizio
AmiiboAPI per poter recuperare tutte le informazioni necessarie.

La particolarità, però, è che la costruzione della URI della seconda chiamata dipende dal 
risultato ottenuto dalla prima.

Il problema è stato affrontato tramite il meccanismo di **Async/Await** e delle **Promise**, concetti
avanzati della programmazione JavaScript che hanno permesso di scrivere una soluzione elegante
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

In questo modo viene utilizzato un solo *useEffect*, al cui interno vengono recuperate le informazioni
della Amiibo corrente. Se l'ID non dovesse corrispondere a nessuna Amiibo valida allora si verrebbe
reindirizzati al path `'/not-found'`, ovvero alla nota pagina per la gestione dell'errore 404.

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
Le funzioni `fetchAmiiboDataByID` e `fetchAmiiboDataByNAME` utilizzano il meccanismo **Async/Await**.

Tutte le funzioni definite `async` restituiscono un oggetto di tipo `Promise`, il cui valore
può essere recuperato tramite l'utilizzo del metodo `then`, che viene utilizzato come callback.


### La palette di colori delle Amiibo

In Unimiibo, a tutte le Amiibo appartenenti allo stesso franchise (ovvero alla stessa serie, come Pokémon)
viene associato lo stesso colore.

Il colore principale di ogni franchise è definito in un oggetto JavaScript nel file
[Colors.js](/src/utilities/Colors.js):

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

Tuttavia, per garantire che possa venire associato un colore anche alle serie non presenti nell'elenco,
si è scelto di utilizzare un metodo basato sull'hash di una stringa, in modo da ottenere come risultato
un colore che appaia come "casuale" ma che sia invece deterministico e replicabile.

Il colore (per serie non presenti in elenco) viene scelto, quindi, nel seguente modo:

```jsx
function indexSeries(series) {
    return strHashCode(series) % colors.length;
}
```

dove `strHashCode` è una funzione che è definita in [Utils.js](/src/utilities/Utils.js) e che calcola un hash
numerico per una stringa passata come parametro, che viene poi utilizzato per creare un indice per
l'array `colors` (definito in [Colors.js](/src/utilities/Colors.js)).

In questo modo anche personaggi che potranno saranno aggiunti in futuro alla lista delle Amiibo dell'API
e che provengono da franchise nuovi potranno essere associati a un colore "casuale" 
ma che sia sempre lo stesso.


### Ordine di visualizzazione delle Amiibo

Nella pagina **Amiibo** è possibile visualizzare una lista di tutte le statuette presenti attualmente in
commercio. L'ordine di visualizzazione di default, tuttavia, non è basato su nessuna regola specifica e
rischia di confondere l'utente.

È stato quindi necessario pensare a un modo per definire regole di sorting complesse e personalizzabili,
al fine di organizzare la lista delle Amiibo secondo una certa logica, mostrata di seguito.

1. Le Amiibo vengono ordinate in base al numero di statuette appartenenti allo stesso franchise
(campo **series**), in ordine decrescente.
   * Le Amiibo visualizzate per prime saranno tutte quelle appartenenti al franchise di
Super Mario (che comprende ben 29 statuette)

2. A parità di franchise, le Amiibo visualizzabili per prime saranno quelle relative ai singoli personaggi 
(campo **character**) raffigurati in un numero maggiore di statuette, in ordine decrescente.
   * Nel franchise di Super Mario, le Amiibo di Mario (9 in totale) saranno le prime a essere visualizzate

3. A parità di personaggio, le Amiibo verranno visualizzate in ordine crescente in base alla data
di uscita (campo **release**). Poiché spesso sono presenti date diverse in base alla zona geografica,
viene considerata la meno recente (e diversa da `null`).
   * Tra le Amiibo di Mario, la prima visualizzata sarà quella uscita nel 06/12/2014,
ovvero la meno recente

4. Infine, a parità di data di uscita, le Amiibo verranno mostrate secondo ordinamento lessicografico 
crescente del nome (campo **name**).
   * Tra le Amiibo di Mario uscite in Giappone nel 10/09/2015 verrà mostrata prima "8-Bit Mario 
Classic Color" e poi "8-Bit Mario Modern Color"

Il codice che realizza questo specifico ordinamento è mostrato di seguito.

```jsx
fetch("https://www.amiiboapi.com/api/amiibo/?type=Figure")
   .then(response => response.json())
   .then(data => data['amiibo'].map(amiibo => createAmiibo(amiibo, false)))
   .then(data => data.sort((a1, a2) => compareAmiibo(data, a1, a2, {
      sortOrder: [
         {key: 'series', orderASC: false},
         {key: 'character', orderASC: false},
         {key: 'release', orderASC: true},
         {key: 'name', orderASC: true},
      ],
      sortComparator: {
         series: countComparator,
         character: countComparator,
         release: dateComparator,
         name: stringComparator,
      }
   })))
   .then(data => setAmiibos(data));
```

La funzione `compareAmiibo` consente di stabilire l'ordinamento di due generiche Amiibo, basandosi sulle
regole definite precedentemente. Nello specifico, essa accetta come parametro:
1. La lista di tutte le Amiibo;
2. Le due Amiibo da confrontare;
3. Un oggetto contenente sia le regole relative all'ordinamento dei parametri di sorting
(campo `sortOrder`), sia le funzioni che nel pratico realizzano i singoli ordinamenti
(campo `sortComparator`). 

L'implementazione è la seguente:

```jsx
function compareAmiibo(amiibos, a1, a2, {sortOrder, sortComparator}) {
   for (let sortRule of sortOrder) {
      const {key, orderASC} = sortRule;

      let comparison = sortComparator[key] ?
              sortComparator[key](a1[key], a2[key], amiibos, key) :
              a1[key] - a2[key];

      if (comparison !== 0)
         return orderASC ? comparison : -comparison;
   }

   return 0;
}
```

Le funzioni *compare* restituiscono un valore positivo o negativo (tipicamente **1** e **-1**) 
in base all'ordinamento tra il primo e il secondo oggetto, oppure **0** nel caso in cui i due oggetti 
siano uguali (secondo un certo criterio).

Nel caso preso in esame, in maniera sequenziale vengono calcolati i valori di comparazione 
fino a quando uno di questi è diverso da zero (oppure se non esistono ulteriori criteri di ordinamento).

Qualora non fosse stata definita una precisa funzione di *compare* per uno specifico campo, allora
verrebbe svolta una normale *compare* tra due valori numerici. 

Esempi di funzioni *compare*:

```jsx
function countComparator(str1, str2, collection, key) {
   str1 = str1.toLowerCase();
   str2 = str2.toLowerCase();
   
   if (str1 === str2)
      return 0;
   
   const tot1 = collection.filter(amiibo => amiibo[key].toLowerCase() === str1).length;
   const tot2 = collection.filter(amiibo => amiibo[key].toLowerCase() === str2).length;
   
   return tot1 - tot2;
}
```

```jsx
function stringComparator(str1, str2) {
   return str1.localeCompare(str2);
}
```


## Dettagli vari rilevanti

* Unimiibo è totalmente **responsive**, il che vuol dire che può essere visualizzabile su schermi di
device di qualsiasi dimensioni (smartphone, tablet, laptop, computer, ecc..), grazie all'utilizzo 
di **Bootstrap** (vanilla). Inoltre, in particolari occasioni (come ad esempio per l'*header*)
è stata utilizzata la versione di Bootstrap per React e non la versione "vanilla";

* Per garantire una visualizzazione ottimale, l'interfaccia grafica può variare tra dispositivi *mobile*
e *computers*. Ad esempio, nella pagina **FAQ** è presente un'immagine di Super Mario che differisce in
base alla dimensione dello schermo, che mantiene il medesimo significato ma con il contenuto
disposto diversamente;

* Gran parte delle immagini presenti in Unimiibo sfrutta il meccanismo di **lazy loading**, che permette
(se supportato dal browser) di scaricare la risorsa dalla rete solo se visibile all'utente. Ciò garantisce
migliori performance e, tramite un effetto di *fade in*, non infastidisce l'utente con sgradevoli effetti 
di "comparsa improvvisa";

* Durante l'attesa che un'immagine venga caricata, viene visualizzata un'animazione di loading *ad hoc*
basata sul logo di Unimiibo. L'animazione è stata realizzata come **componente React** in modo da essere
utilizzata in più parti del progetto, favorendo un riuso del codice e in linea con la filosofia di React;

* Se si prova a visualizzare una pagina inesistente oppure relativa a un'Amiibo con id sconosciuto si 
viene automaticamente reindirizzati alla pagina **Not Found** (o pagina 404);

* I tanti collegamenti ipertestuali che puntano all'esterno di Unimiibo hanno come comportamento
quello di aprire una nuova scheda del browser, per non perdere il flusso di navigazione all'interno
della web application. Si noti, inoltre, che ogni link che punta al sito di Nintendo permette di
raggiungere il **vero negozio di Nintendo**, pertanto eventuali acquisti effettuati al suo interno
utilizzerebbero **soldi reali** e quindi non sono da considerare a solo scopo dimostrativo;

* Il deploy di Unimiibo viene fatto tramite un servizio di Github chiamato **Github Pages**, che utilizza
il comando `npm run deploy` per creare una build ottimizzata per la fase di produzione, che in assenza
di errori viene pubblicata nel giro di un minuto. Il deploy è totalmente automatizzato da Github
e richiede uno sforzo minimo o nullo da parte dello sviluppatore.

* Purtroppo la tecnologia di Github Pages non è (ancora) compatibile con le funzionalità del
**BrowserRouter** offerto dalla libreria *react-router-dom*, quindi si è scelto di utilizzare un 
**HashRouter** che permette di navigare correttamente nel sito senza la necessità di dovervi accedere 
obbligatoriamente dalla URI della pagina principale e, soprattutto, che permette di far funzionare
correttamente sia la pagina *Not Found* (404) che il tasto *indietro* dei browser;


## Compatibilità con i browser moderni
Unimiibo è raggiungibile pubblicamente all'indirizzo https://disteroby.github.io/unimiibo/ ed è stata
testata sui seguenti browser (nella loro versione più recente al momento della scrittura
di questo documento):

1. **Google Chrome**:
    * Computer
        * :heavy_check_mark: Windows
    * Tablet
        * :heavy_check_mark: iOS
    * Smartphone
        * :heavy_check_mark: Android
        * :heavy_check_mark: iOS

2. **Mozilla Firefox**:
    * Computer
        * :heavy_check_mark: Windows
    * Tablet
        * :heavy_check_mark: iOS
    * Smartphone
        * :heavy_check_mark: Android
        * :heavy_check_mark: iOS

3. **Microsoft Edge**:
    * Computer
        * :heavy_check_mark: Windows
    * Tablet
        * :heavy_check_mark: iOS
    * Smartphone
        * :heavy_check_mark: Android
        * :heavy_check_mark: iOS

Legenda:
  * :heavy_check_mark: Totalmente compatibile
  * :large_orange_diamond: Parzialmente compatibile (problemi legati al CSS)
  * :x: Non compatibile