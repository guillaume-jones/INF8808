## TODO

### Preprocess

#### Géographie
- Transformation coords compteurs en pixels
- Transformation coords reseau en pixels, par piste
- Fonction qui donne l'arrondissement pour des coords et montreal.json

#### Comptes
- Joindre données de tous les CSV des années et filtrer compteurs morts
- Somme comptes par compteur et par année (bar chart)
```
{
    NAME: 
        [
            {
                name: 
                counts: 
                neighborhood: 
                x:
                y:
            }
            ...
        ],
    }
    NAME2: ...
    DEFAULT: ... (divisé par # compteurs)
}
```
- Somme comptes par compteur et par année (map)
```
{
    NAME: {
        '2009': 
            [
                {
                    name: 
                    counts: 
                    neighborhood: 
                    x:
                    y:
                }
                ...
            ],
        '2010': ...
    }
    NAME2: ...
}
```
- Somme comptes par compteur par jour par année  (line chart)
```
{
    NAME: {
        '2009':
            [
                {
                    name:   
                    counts: 
                    day: (0-365)
                }
                ...
            ],
        '2010': ...
    }
    NAME2: ...
    DEFAULT: (divisé par # compteurs)
}
```
- Somme comptes par compteur par 15 minutes par année (area chart)
```
{
    NAME: {
        '2009':
            [
                {
                    name: 
                    counts: 
                    15_min_period:  (0-95)
                }
                ...
            ],
        2010: ...
    }
    NAME2: ...
    DEFAULT: (divisé par # compteurs)
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