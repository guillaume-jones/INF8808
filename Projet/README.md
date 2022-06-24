## TODO

### Preprocess

#### Géographie
- Transformation coords compteurs en pixels
- Transformation coords reseau en pixels, par piste
- Fonction qui donne l'arrondissement pour des coords et montreal.json

#### Comptes
- Joindre données de tous les CSV des années et filtrer compteurs morts
```
{
    NAME: 
        '2009':
        [
            {
                name: 
                counts: 
                latitude:
                longitude:
            }
            ... X tous les timestamps
        ],
        '2010':  ...
    }
    NAME2: ...
}
```
- Somme comptes par compteur et par année (bar chart)
```
{
    NAME: 
        [
            14500,
            19000,
            ... x nombre d'années
        ],
    }
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
    NAME: {
        '2009':
            [
                50,
                250,
                300,
                ... x 365
            ],
        '2010': ...
    }
    NAME2: ...
    AVERAGE: (divisé par # compteurs)
}
```
- Somme comptes par compteur par année par 15 minutes (area chart)
```
{
    NAME: {
        '2009':
            [
                0,
                15,
                10,
                ... x 96
            ],
        '2010': ...
    }
    NAME2: ...
    AVERAGE: (divisé par # compteurs)
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
