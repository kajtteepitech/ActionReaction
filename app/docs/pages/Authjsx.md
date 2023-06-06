# Auth.jsx
[Auth.jsx](../../src/pages/Auth.jsx)

## Introduction
Ce code est destiné à être utilisé dans le cadre d'une application web qui permet aux utilisateurs de s'authentifier via Supabase, une plateforme de développement d'applications web.

## Technologies utilisées
- React
- Supabase
- Axios

## Fonctionnalités
- L'utilisateur peut se connecter via un lien magique envoyé à son adresse e-mail.
- L'utilisateur peut se connecter via des fournisseurs OAuth tels que Github, Google, Discord et Twitch.

## Comment utiliser ce code
1. Cloner ce dépôt sur votre machine locale.
2. Installer les dépendances en exécutant `npm install`.
3. Ajouter les informations d'identification de Supabase dans le fichier `supabaseClient.js`.
4. Lancer l'application en exécutant `npm start`.

## Comment implémenter l'authentification avec Supabase dans votre application
1. Créer un compte Supabase et créer une nouvelle application.
2. Ajouter les informations d'identification de Supabase dans votre application en ajoutant la clé d'API et l'URL de votre application dans le fichier `supabaseClient.js`.
3. Utiliser les fonctions d'authentification fournies par Supabase pour gérer l'authentification utilisateur dans votre application.

## Comment implémenter l'authentification via OAuth dans votre application
1. Créer un compte développeur pour chaque fournisseur OAuth que vous souhaitez utiliser (Github, Google, Discord, Twitch).
2. Obtenir les informations d'identification OAuth pour chaque fournisseur et les ajouter à votre application Supabase.
3. Ajouté les boutons d'authentification dans le fichier avec pour base
```jsx
// Remplacer provider par le service oauth désiré.
<button className="button block" aria-live="polite" onClick={(e) => { setType('provider'); handlelogin2(e, 'provider') }}>
        Sign in with provider
</button>
```