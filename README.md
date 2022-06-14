# La Boite à Sel

## Structure des retour API
**json :**
- *success* -> true, false
- *message* -> "message de retour en cas d'erreur"
- *data* -> __Array__

## Décodeur
- **users | role :** *U* -> utilisateur, *A* -> admin
- **post | toolsProvided :** *O* -> Oui, *N* -> Non; *A* -> aucun outils nécéssaire
- **post | status :** *C* -> crée, *E* -> en cours de résolution; *C* -> clôturé
- **reports | status :** *C* -> crée, *E* -> en cours de résolution; *C* -> clôturé
