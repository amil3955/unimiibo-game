# Unimiibo

<picture>
 <source media="(prefers-color-scheme: dark)" srcset="/src/assets/LogoUnimiibo/unimiibo_logo_wh.png">
 <source media="(prefers-color-scheme: light)" srcset="/src/assets/LogoUnimiibo/unimiibo_logo.png">
</picture>

## Project structure

Since Unimiibo is a complex project, it was necessary to define a
precise structure for organizing resources (such as source code files, images, etc...).

The main directories of the project are:

**assets**: contains all the multimedia resources used for the creation
of Unimiibo. It is in turn divided into sub-directories, in order to group semantically
similar resources.

**components**: includes both components specific to the Unimiibo project and
generic components (therefore directly usable even in different projects with very
slight changes to the code or even as they are). The components are organized in sub-directories in order to
group each code file with its relative style sheet (CSS modules are used).

**utilities**: contains all those javascript files that contain global preferences and
generic functions that can be called up in different parts of the project.

**views**: the set of all the pages of the web application. Each page has a relative CSS style sheet, in classic mode (no modu


## Code snippets

In this section, small significant portions of code will be shown to facilitate
the understanding of some complex features of the project.

### Concatenation of API calls

displaying the details of a specific Amiibo, it was necessary to make two calls to the
AmiiboAPI service to be able to retrieve all the necessary information.

The peculiarity, however, is that the construction of the URI of the second call depends on the
result obtained from the first.

The problem was addressed through the mechanism of **Async/Await** and **Promise**, advanced concepts of
JavaScript programming that allowed us to write an elegant solution
for the problem in question

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

In this way, only one *useEffect* is used, within which the information of the current Amiibo is retrieved. If the ID does not correspond to any valid Amiibo, then you will be redirected to the path `'/not-found'`, or to the well-known page for handling the 404 error.

The `fetchData` function is defined as follows:

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

This way, it is possible to execute the two calls asynchronously but still sequentially,
making it possible to use the data from the first call to create the second.

The functions `fetchAmiiboDataByID` and `fetchAmiiboDataByNAME` use the **Async/Await** mechanism.

All the functions defined as `async` return a `Promise` object, whose value
can be retrieved using the `then` method, which is used as a callback.

### The Amiibo color palette

In Unimiibo, all Amiibo belonging to the same franchise (i.e. the same series, such as Pokémon)
are associated with the same color.

The main color of each franchise is defined in a JavaScript object in the file
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

However, to ensure that a color can also be associated with series not present in the list,
we chose to use a method based on the hash of a string, so as to obtain as a result
a color that appears "random" but is instead deterministic and replicable.

The color (for series not present in the list) is therefore chosen in the following way:

```jsx
function indexSeries(series) {
    return strHashCode(series) % colors.length;
}
```
### Ordine di visualizzazione delle Amiibo

On the **Amiibo** page, you can view a list of all the figurines currently on the market. The default display order, however, is not based on any specific rule and
risks confusing the user.

It was therefore necessary to think of a way to define complex and customizable sorting rules,
in order to organize the list of Amiibo according to a certain logic, shown below.

1. The Amiibo are ordered based on the number of figurines belonging to the same franchise
(field **series**), in decreasing order.
* The Amiibo displayed first will be all those belonging to the
Super Mario franchise (which includes 29 figurines)

2. For the same franchise, the Amiibo displayed first will be those relating to the individual characters
(field **character**) depicted in a greater number of figurines, in decreasing order.
* In the Super Mario franchise, Mario Amiibo (9 in total) will be displayed first

3. For the same character, Amiibo will be displayed in ascending order based on the
release date (the **release** field). Since there are often different dates based on the geographical area,
the least recent (and different from `null`) will be considered.

* Among Mario Amiibo, the first displayed will be the one released on 06/12/2014,
that is, the least recent

4. Finally, for the same release date, Amiibo will be displayed in ascending lexicographic
order of the name (the **name** field).

* Among Mario Amiibo released in Japan on 10/09/2015, "8-Bit Mario
Classic Color" will be displayed first and then "8-Bit Mario Modern Color"

The code that creates this specific order is shown below.

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

## Compatibilità con i browser moderni

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

Legend:
* :heavy_check_mark: Fully compatible
* :large_orange_diamond: Partially compatible (CSS related issues)
* :x: Not compatible