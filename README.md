# 🛍️ Boutique en ligne — Front-end Angular

Ce projet est le **front-end d’une boutique en ligne** développé avec **Angular**.
L’application permet d’afficher et de rechercher des produits, d’ajouter de nouveaux articles (si l’utilisateur est administrateur), et de naviguer entre différentes pages grâce au **router Angular**.

Le **back-end** associé est développé séparément en **Spring Boot**, disponible sur un autre dépôt.

---

## 🚀 Fonctionnalités principales

* 🔍 **Recherche de produits** par nom ou par catégorie
* 🧾 **Affichage de la liste des produits** avec prix et date de création
* ➕ **Ajout de produits** (fonction réservée aux administrateurs)
* 🔐 **Authentification locale** (login, rôle admin ou user)
* 🧭 **Navigation dynamique** avec le `RouterModule`
* 🎨 **Interface responsive** grâce à **Bootstrap 5**

---

## 🧩 Stack technique

| Catégorie             | Outil / Framework            |
| --------------------- | ---------------------------- |
| Front-end             | Angular 17                   |
| Langage               | TypeScript                   |
| UI / Design           | Bootstrap 5                  |
| Gestion d’état légère | Services Angular             |
| Back-end (API)        | Spring Boot *(dépôt séparé)* |

---

## ⚙️ Installation & exécution

### 1. Cloner le projet

```bash
git clone https://github.com/ton-compte/nom-du-repo.git
cd nom-du-repo
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer le serveur de développement

```bash
ng serve
```

Puis ouvre ton navigateur à l’adresse :
👉 [http://localhost:4200](http://localhost:4200)

