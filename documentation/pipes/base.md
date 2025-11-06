
## 1. Qu’est-ce qu’un pipe dans Angular ?

Un *pipe* est un moyen de **transformer une donnée** directement dans un template HTML, en déclaratif, sans avoir à écrire de logique dans le composant pour ce seul affichage.

* Concrètement : dans un template on écrit `{{ value | myPipe:arg1:arg2 }}` et Angular va appeler le pipe `myPipe.transform(value, arg1, arg2)` pour obtenir un résultat. ([angular.dev][1])
* Il s’agit donc d’une classe avec le décorateur `@Pipe` qui implémente l’interface `PipeTransform`. ([angular.dev][2])
* Documentation officielle : « Pipes are a special operator in Angular template expressions that allows you to transform data declaratively in your template. » ([angular.dev][3])
* On peut les voir comme des « fonctions » appliquées dans la vue, qui prennent une valeur d’entrée + éventuellement des arguments, et renvoient une valeur de sortie.

### Pourquoi les utiliser ?

* Pour **séparer la logique d’affichage** (formatage, filtres, etc) de la logique métier du composant.
* Pour **réutiliser** une transformation dans plusieurs templates.
* Pour avoir un **code plus propre** dans le composant (moins de manipulation de données juste pour l’affichage).
* Pour un **formatage déclaratif** : dans le template on voit ce qui est appliqué, ce qui est plus clair.

### Concepts clés

* Entrée (`value`) : la donnée à gauche du `|`.
* Arguments (`args`) : après les `:` dans le template.
* Pure vs impure : par défaut les pipes sont pures (aucun effet de bord, recalcul seulement si l’entrée ou un argument change). ([Medium][4])
* Enregistrement dans un `NgModule` (ou en mode standalone) afin que le pipe soit utilisable dans le template. ([Stack Overflow][5])

---

## 2. Mécanisme concret : comment ça fonctionne “sous le capot”

1. Le template contient :

   ```html
   {{ someValue | myPipe: arg1 : arg2 }}
   ```
2. Angular compile ce template en quelque chose qui, à l’exécution, évaluera :

   ```ts
   myPipe.transform(someValue, arg1, arg2)
   ```

   (où `myPipe` est une instance de la classe définie via `@Pipe({name:'myPipe'})`).
3. Le résultat retourné par `transform()` est injecté dans le rendu du template.
4. Lors de la détection de changement (change detection) :

  * Si le pipe est **pur**, alors Angular va vérifier : “la référence de `someValue` ou celle d’un des arguments a-t-elle changé ?”

    * Si non, il **réutilise** le résultat précédent (pas de nouveau calcul).
    * Si oui, il **recalcule** via la méthode `transform`.
  * Si le pipe est **impur** (`pure: false`), il est appelé à chaque cycle de détection de changement — ce qui peut impacter les perfs.
    ([Medium][4])
5. Le rendu est donc mis à jour automatiquement quand les valeurs changent (ou leurs références, dans le cas d’un pipe pur).

### Exemple “flux” (visuel)

* Le composant définit `searchTerm` et `products` (un tableau).
* Dans le template :

  ```html
  <input [(ngModel)]="searchTerm" …>
  <li *ngFor="let p of products | searchFilter: searchTerm">
    {{ p.name }}
  </li>
  ```
* Quand l’utilisateur tape dans l’input, `searchTerm` change → Angular déclenche détection de changement → il passe `products` + `searchTerm` dans `searchFilter.transform()` → renvoie tableau filtré → *ngFor* affiche ce nouveau tableau.

### Pourquoi seulement “un paramètre” après le `:` peut suffire, mais l’entrée est “liste” ?

Car c’est la logique du pipe : l’entrée (le “value” à gauche) est libre et peut être *n'importe quoi* (liste, objet, string etc). Le premier argument est toujours “value”. Ensuite, les paramètres suivent. Dans ton exemple :

```ts
transform(list: ProductType[], filterText: string): ProductType[]
```

* `list` reçoit la valeur passée à gauche du `|` (le tableau `products`).
* `filterText` reçoit l’argument `searchTerm`.
  C’est pour ça que tu n’écris qu’un “: searchTerm” mais la signature a deux paramètres — le premier est implicite (le value).

---

## 3. Exemples de code

### 3.1 – Pipe sans paramètre

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sayHello'
})
export class SayHelloPipe implements PipeTransform {
  transform(value: string): string {
    return `Hello, ${value}!`;
  }
}
```

Template :

```html
<p>{{ userName | sayHello }}</p>
```

Si `userName = "Alice"`, ça affiche `Hello, Alice!`.

### 3.2 – Pipe avec deux paramètres (entrée + 1 paramètre)

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength) + '…';
  }
}
```

Template :

```html
<p>{{ articleText | truncate: 50 }}</p>
```

### 3.3 – Pipe avec trois paramètres (entrée + 2 paramètres)

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateOffset'
})
export class FormatDateOffsetPipe implements PipeTransform {
  transform(value: Date | string, locale: string, offsetDays: number): string {
    if (!value) return '';
    const d = new Date(value);
    d.setDate(d.getDate() + offsetDays);
    return d.toLocaleDateString(locale);
  }
}
```

Template :

```html
<p>{{ eventDate | formatDateOffset:'fr-FR':7 }}</p>
```

Ici : input = `eventDate`, param1 = `'fr-FR'`, param2 = `7`.

---

## 4. Utilisations courantes des pipes dans Angular

Voici quelques usages typiques :

* Formatage de dates, nombres, devises.
  Exemple : `{{ dateValue | date:'dd/MM/yyyy' }}` ([angular.dev][6])
* Transformation de chaînes : majuscule/minuscule, title case.
  Exemple : `{{ name | uppercase }}` ou `{{ name | titlecase }}` ([Simplilearn.com][7])
* Filtrage ou tri de tableaux (via custom pipes) – attention aux contraintes de performance.
* Conversion d’Observables ou Promises en valeurs affichables via `async` pipe.
* Chainer plusieurs pipes : `{{ value | pipe1:arg | pipe2 }}` ([Medium][4])
* Séparer la logique d’affichage de la logique métier dans les composants.

### Bonnes pratiques

* Utiliser les pipes **pures** par défaut (performance meilleure).
* Ne pas faire de traitements lourds dans le `transform()` (ex : boucles énormes, multiples filtres) sinon risque de lenteur.
* Si un filtre ou tri est complexe, envisager de le faire dans le composant plutôt que dans un pipe.
* Garder les pipes **cohérents**, séparés, simples à tester.
* Pour les composants “standalone” dans Angular : enregistrer le pipe dans `imports` ou `declarations`. ([Stack Overflow][5])

---

## 5. Alternatives : comment faire sans pipe ?

Si tu n’utilises pas de pipe, voici comment tu aurais pu faire :

### Exemple sans pipe pour ton filtre “search”

Dans le composant :

```ts
filteredProducts: ProductType[] = [];

ngOnInit() {
  this.filteredProducts = this.products; // initial
}

onSearchTermChange(newTerm: string) {
  this.filteredProducts = this.products.filter(p => p.nameProduct?.toLowerCase().includes(newTerm.toLowerCase()));
}
```

Dans le template :

```html
<input [(ngModel)]="searchTerm" (ngModelChange)="onSearchTermChange($event)">
<li *ngFor="let p of filteredProducts">
  {{ p.nameProduct }}
</li>
```

### Comparatif

| Avec pipe                                             | Sans pipe                                                                                 |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Transformation dans le template, plus déclaratif      | Logique dans le composant                                                                 |
| Réutilisable dans plusieurs composants/templates      | Code spécifique au composant                                                              |
| Moins de code dans le composant pour l’affichage      | Le composant devient plus “chargé”                                                        |
| Risque : pipe peut être exécuté souvent (performance) | Doit gérer manuellement les changements, mais performant dès qu’on contrôle quand filtrer |
| Facile à tester la logique de pipe séparément         | Logique mélangée avec le composant                                                        |

Donc, les pipes sont très utiles pour les transformations d’affichage, mais **ils ne doivent pas remplacer la logique métier** ou être utilisés pour des traitements très lourds sans précaution.

---

## 6. Résumé rapide

* Un pipe : valeur d’entrée à gauche du `|`, arguments après les `:`.
* Il faut implémenter `PipeTransform.transform(value, ...args)`.
* Angular appelle automatiquement ce pipe lors des détections de changement (si pure) ou à chaque cycle (si impure).
* On peut avoir 0, 1, 2 ou plusieurs paramètres.
* On peut l’utiliser pour formatage, filtrage, tri, conversion.
* On peut l’éviter en faisant la logique dans le composant, mais on perd la réutilisabilité et la clarté dans le template.
* Toujours veiller à la performance.

---

## 7. Liens utiles pour approfondir

* Guide officiel : “Pipes – Angular” sur angular.dev ([angular.dev][3])
* Créer un pipe personnalisé (tutorial) : angular.dev “Create a custom pipe” ([angular.dev][2])
* Article “Pipes in Angular” (GeeksforGeeks) ([GeeksforGeeks][8])
* Article “Custom pipes step-by-step” ([angularminds.com][9])

---

[1]: https://angular.dev/api/core/Pipe?utm_source=chatgpt.com "Pipe - Angular"
[2]: https://angular.dev/tutorials/learn-angular/24-create-a-pipe?utm_source=chatgpt.com "Create a custom pipe - Angular"
[3]: https://angular.dev/guide/templates/pipes?utm_source=chatgpt.com "Pipes - Angular"
[4]: https://medium.com/%40aqeelabbas3972/pipes-in-angular-6a871589299d?utm_source=chatgpt.com "Pipes in Angular - Medium"
[5]: https://stackoverflow.com/questions/77519728/how-do-you-register-custom-pipes-in-angular-17?utm_source=chatgpt.com "How do you register custom pipes in Angular 17? - Stack Overflow"
[6]: https://angular.dev/tutorials/learn-angular/23-pipes-format-data?utm_source=chatgpt.com "Formatting data with pipes - Angular"
[7]: https://www.simplilearn.com/tutorials/angular-tutorial/angular-pipes?utm_source=chatgpt.com "Pipes in Angular: Transform Your Data with Ease - Simplilearn.com"
[8]: https://www.geeksforgeeks.org/angular-js/pipes-in-angular/?utm_source=chatgpt.com "Pipes in Angular - GeeksforGeeks"
[9]: https://www.angularminds.com/blog/creating-custom-pipe-in-angular-a-step-by-step-tutorial?utm_source=chatgpt.com "Creating Custom Pipe in Angular: A Step-by-Step Tutorial"
