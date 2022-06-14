# La Boite à Sel

## Structure des retour API
**json :**
- *success* -> true, false
- *message* -> "message de retour en cas d'erreur"
- *data* -> __Array__

## Décodeur
- **users | role :** *U* -> utilisateur, *A* -> admin
- **post | toolsProvided :** *Y* -> Oui, *N* -> Non; *A* -> aucun outils nécéssaire
- **post | status :** *C* -> crée, *P* -> en cours de résolution; *F* -> clôturé
- **reports | status :** *C* -> crée, *P* -> en cours de résolution; *F* -> clôturé
