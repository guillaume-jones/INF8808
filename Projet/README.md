## TODO

### Preprocessing API
- Dataset complet
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

### Left for final release
- Add legends to all charts
- Divide averages per hour by #days counter was active
- Manually add an absolute scale for the bar chart
- Add data for neighborhoods, divided by # counters in 'hood (0 if none)
- Fill color neighborhoods based on data
- Add absolute scale across years for circle size, line chart and area chart
- Add animations between counter datasets in area, line and bar charts
