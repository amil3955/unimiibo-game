export function strHashCode(str)
{
    let hash = 0,
        i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++)
    {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return Math.abs(hash);
}

export function createAmiibo(amiiboData, hasGameInfo)
{
    let amiibo = {
        id: amiiboData.head + amiiboData.tail,
        name: amiiboData.name ?? "-- unknown --",
        character: amiiboData.character ?? "-- unknown --",
        series: amiiboData.gameSeries ?? "-- unknown --",
        img: amiiboData.image,
    }

    if(hasGameInfo) {
        amiibo = {
            ...amiibo,
            release: amiiboData.release,
            games3DS: amiiboData.games3DS,
            gamesWiiU: amiiboData.gamesWiiU,
            gamesSwitch: amiiboData.gamesSwitch,
        }
    }

    return amiibo;
}

export function nintendoShopUrl(game)
{
    return `https://www.nintendo.com/search/?q=${encodeURIComponent(game)}&p=1&cat=gme&sort=df`
}