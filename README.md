# Mon Site Web - Stages Montmorency
Ce fichier README présente les fonctionnalités principales de notre site Web, qui est une plateforme permettant de gérer des stages pour les étudiants de Montmorency. Les utilisateurs peuvent s'inscrire, se connecter, chercher des stages, postuler à des offres de stage, et les employeurs peuvent publier des offres de stage et gérer les candidatures.

## Fonctionnalités principales
1. Inscription et connexion des utilisateurs
2. Gestion des offres de stage
3. Gestion des candidatures
4. Espace étudiant
5. FAQ
6. Vérification de l'email
7. Changement de mot de passe
8. Liste des utilisateurs
9. Mise à jour des stages
10. Formulaire de candidature

## Détails des fonctionnalités
### 1. Inscription et connexion des utilisateurs
Les utilisateurs peuvent s'inscrire en fournissant un email, un nom d'utilisateur, un mot de passe et un type d'utilisateur (étudiant ou employeur). Ils peuvent ensuite se connecter en utilisant leur email et leur mot de passe. Les informations d'authentification sont gérées par des tokens JWT.

### 2. Gestion des offres de stage
Les employeurs peuvent créer, mettre à jour et supprimer des offres de stage. Ils peuvent également consulter la liste de tous les stages disponibles et filtrer par propriétaire. Les stages incluent des informations telles que le nom du contact, l'email, le téléphone, le nom de l'entreprise, l'adresse, le type de stage, le titre, le nombre de positions, la description et le salaire.

### 3. Gestion des candidatures
Les étudiants peuvent postuler aux offres de stage en envoyant un email à l'employeur avec leur CV et lettre de motivation en pièces jointes. Les employeurs peuvent consulter la liste des candidatures pour chaque offre de stage et gérer les candidats.

### 4. Espace étudiant
Les étudiants ont accès à un espace dédié où ils peuvent consulter la liste des offres de stage disponibles et postuler en envoyant un email à l'employeur avec leur CV et lettre de motivation en pièces jointes.

### 5. FAQ
Une section FAQ est disponible pour répondre aux questions fréquemment posées par les utilisateurs.

### 6. Vérification de l'email
Les utilisateurs peuvent vérifier leur adresse e-mail après l'inscription en suivant un lien envoyé à leur adresse e-mail.

### 7. Changement de mot de passe
Les utilisateurs ont la possibilité de modifier leur mot de passe en cas d'oubli. Un lien pour réinitialiser le mot de passe est envoyé à l'adresse e-mail de l'utilisateur.

### 8. Liste des utilisateurs
Le coordinateur peut accéder à une liste complète de tous les utilisateurs inscrits sur la plateforme.

### 9. Mise à jour des stages
Les employeurs ont la possibilité de mettre à jour les informations sur les offres de stage existantes.

### 10. Formulaire de candidature
Les étudiants peuvent remplir un formulaire de candidature détaillé lors de la postulation à une offre de stage.

## Routes de l'API
### L'API a les routes suivantes :

1. ```/api/email``` : pour l'envoi de courriels.
    *  ```POST /send-message``` : Envoie un email. L'utilisateur doit être authentifié pour envoyer un email. Les fichiers attachés à l'email peuvent être téléchargés en utilisant cette route.
2. ```/api/user``` : pour les opérations CRUD sur les utilisateurs enregistrés.
    * ```POST /register``` : Inscription d'un nouvel utilisateur.
    * ```POST /login``` : Connexion de l'utilisateur.
    * ```GET /all-users``` : Récupère tous les utilisateurs. Nécessite une authentification.
    * ```PATCH /update-role``` : Met à jour le rôle d'un utilisateur. Nécessite une authentification.
    * ```DELETE /delete-user``` : Supprime un utilisateur. Nécessite une authentification.
    * ```GET /:id/verify/:token``` : Vérifie l'utilisateur lors de l'inscription.
    * ```POST /sendPswEmail``` : Envoie un email pour réinitialiser le mot de passe.
    * ```POST /changepassword``` : Met à jour le mot de passe de l'utilisateur.
3. ```/api/internship``` : pour les opérations CRUD sur les offres de stage publiées.
    * ```POST /add-internship``` : Ajoute une nouvelle offre de stage. Nécessite une authentification.
    * ```GET /all-internship``` : Récupère toutes les offres de stage. Nécessite une authentification.
    * ```GET /get-Internships-By-Owner-Id``` : Récupère les offres de stage par l'ID du propriétaire. Nécessite une authentification.
    * ```DELETE /delete-internship``` : Supprime une offre de stage. Nécessite une authentification.
    * ```POST /update-internship``` : Met à jour une offre de stage. Nécessite une authentification.
    * ```POST /add-Applicant``` : Ajoute un candidat à une offre de stage. Nécessite une authentification.
    * ```POST /is-Applicant-In-List``` : Vérifie si un candidat est dans la liste. Nécessite une authentification.
    * ```POST /add-student``` : Ajoute un étudiant. Nécessite une authentification.
4. ```/api/student``` : pour les opérations CRUD sur les étudiants.
    * ```GET /student-list``` : Récupère la liste des étudiants. Nécessite une authentification.
    * ```POST /add-student``` : Ajoute un nouvel étudiant. Nécessite une authentification.
    * ```POST /delete-all-student``` : Supprime tous les étudiants. Nécessite une authentification.
    * ```DELETE /delete-student``` : Supprime un étudiant. Nécessite une authentification.
    * ```POST /upload-csv``` : Télécharge un fichier CSV contenant une liste d'étudiants. Nécessite une authentification.
    
## Technologies utilisées
* React : pour la partie frontend de l'application.
* Node.js : pour la partie backend de l'application.
* Express : pour le serveur Node.js.
* MongoDB : pour la base de données.
* JWT : pour la gestion de l'authentification.
* Axios : pour les requêtes HTTP.
* React Router : pour la gestion des routes dans React.

## Comment démarrer
- Clonez ce dépôt
- Installez les dépendances en utilisant ```npm install```
- Dans le dossier du serveur, créez un fichier ```.env``` en suivant ce modèle : 
```js
HOSTCONNECTION="DATABASE STRING"
JWT_SECRET="255 bits secret"
EMAIL_PASS="Email transporter password"
EMAIL_USER="Email of the transporter"
BASE_URL="Frontend Url"
PORT="The backend port for testing"
SALT_KEY=10
COORDINATEUR_EMAIL="Admin Email"
```
- Dans le dossier du client, créez un fichier ```.env``` en suivant ce modèle : 
```js
REACT_APP_BASE_URL="The backend adress"\
COORDINATEUR_EMAIL="L'email du coordinateur"
COORDINATEUR_NAME="Nom prenom du coordinateur"
``` 
- Démarrez le serveur backend en utilisant ```npm start``` dans ./server
- Démarrez le serveur frontend en utilisant ```npm start``` dans ./client
- Ouvrez votre navigateur et accédez à ```http://localhost:3000```
