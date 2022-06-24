## TODO

### Preprocess

#### Géographie
- Transformation coords compteurs en pixels
- Transformation coords reseau en pixels, par piste
- Fonction qui donne l'arrondissement pour des coords et montreal.json

#### Comptes
- Joindre données de tous les CSV des années, changer IDs pour names, mettre longitude/latitude, filtrer compteurs avec trous
```
{
    '2009':
    {
        NAME: 
        {
            name: 
            longitude:
            latitude: 
            counts: 
            [
                1,
                2,
                ... X tous les timestamps
            ],
        }
        NAME2:  ...
    }
    '2010': ...
}
```
- Somme comptes par compteur et par année (bar chart)
```
{
    NAME: 
        [
            {
                year: 2009
                counts: 14500
            }
            ... x nombre d'années du compteur
        ],
    NAME2: ...
    AVERAGE: ... (divisé par # compteurs)
}
```
- Somme comptes par compteur et par année (map)
```
{
    '2009': [
        {
            name: 
            counts: 
            neighborhood: 
            x:
            y:
        }
        ... x nombre de compteurs
    ],
    '2010': ...
}
```
- Somme comptes par compteur par jour par année  (line chart)
```
{
    '2009': {
        NAME:
            {
                name:
                neighborhood:
                counts:
                [
                    50,
                    250,
                    300,
                    ... x 365
                ]
            }
        NAME2: ...
        AVERAGE: (divisé par # compteurs)
    }
    '2010': ...
}
```
- Somme comptes par compteur par année par 15 minutes (area chart)
```
{
    '2009': {
        NAME:
            {
                name:
                counts:
                [
                    0,
                    15,
                    10,
                    ... x 96
                ],
            }
        NAME2: ...
        AVERAGE: (divisé par # compteurs)
    }
     '2010': ...
}
```

### Affichage
- Dropdown dans index.html
- Choix du compteur selon un on('click') passé aux points
- Carte
    - Arrondissement (GeoJSON)
    - Pistes cyclables sans couleur pour l'instant (GeoJSON)
    - Compteurs
- Line chart
- Area chart
- Bar chart

### Left for final release
- Deal with inactive counters properly
- Add loading animation before showing data
