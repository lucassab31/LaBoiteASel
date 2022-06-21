# La Boite à Sel

## Structure des retour API
**json :**
- *success* -> true, false
- *error* -> "message de retour en cas d'erreur"
- *data* -> __Array__

## Décodeur
- **users | role :** *U* -> utilisateur, *A* -> admin
- **post | toolsProvided :** *Y* -> Oui, *N* -> Non; *A* -> aucun outils nécéssaire
- **post | status :** *C* -> crée, *P* -> en cours de résolution; *F* -> clôturé
- **post | datetimeType :** *B* -> avant le, *A* -> après le, *O* le
- **reports | status :** *C* -> crée, *P* -> en cours de résolution; *F* -> clôturé

## CSS
- ne pas commit les fichiers contenus dans public/css et public/js : ils sont compilés automatiquement lorsque la commande npm run watch est lancée (il faudra juste penser à les commit
à la fin du projet).
- ajouter les noms des fichiers scss (sans l'extension) dans l'array du fichier webpack.mix.js pour
la compilation puis importer le fichier css (contenu dans public/css) dans le component correspondant.
- Penser à utiliser les variables dans le fichier _variables, et à créer des mixins pour éviter de dupliquer la scss si possible
- npm run watch pour compiler en temps réeel - npm run dev pour compiler une seule fois

## Checklist accessibilité

### formulaires
- vérifier que l'ordre de tabulation sur la page est correct
- vérifier que tous les champs ont le bon comportement clavier
- pour les checkboxes et les radios, rendre la zone contenant le label cliquable
- de préférence, créer des formulaires multi-pages
- attributs aria (aria-required, aria-invalid, aria-describedby="id-erreur")

