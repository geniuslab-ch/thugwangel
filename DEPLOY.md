# Deployment Guide / Guide de Déploiement

## English

This application is built with **Next.js**. The easiest way to deploy it is using **Vercel** (the creators of Next.js).

### Step 1: Push to GitHub
1.  Ensure your code is pushed to a GitHub repository.

### Step 2: Deploy on Vercel
1.  Go to [Vercel.com](https://vercel.com) and sign up/log in.
2.  Click **"Add New..."** > **"Project"**.
3.  Import your GitHub repository.
4.  Vercel will automatically detect that it is a Next.js project.
5.  Click **"Deploy"**.

### Step 3: Connect Custom Domain (`thug-angel.ch`)
1.  Once deployed, go to the project **Settings** > **Domains**.
2.  Enter `thug-angel.ch` in the input field and click **Add**.
3.  Vercel will provide you with DNS records (usually an **A Record** or **CNAME**).
4.  Log in to your domain registrar (where you bought `thug-angel.ch`) and update the DNS records as shown by Vercel.

### Important: Media Files
Since you are managing media files manually (as per `USAGE.md`):
- Ensure the `public/music/` and `public/images/` folders containing your files are included in your GitHub repository.
- If they were too large for GitHub, you might need to use **Git LFS** (Large File Storage) or upload them to a storage service (like AWS S3) and update the code to point there.
- **For Vercel**: If the total size of your build (including static files) exceeds 250MB (Free tier), you may face issues. In that case, hosting media externally is recommended.

### Troubleshooting
**"404 Not Found" after connecting domain:**
If you see a 404 error on your domain (`thug-angel.ch`) and you saw a "DNS check" on GitHub:
- **Do NOT configure the domain in GitHub Pages settings.** This will point your domain to GitHub's servers, which do not have your Vercel app.
- You must configure the domain in **Vercel** (Step 3 above).
- If you accidentally configured it on GitHub, remove the custom domain from your GitHub repository settings ("Pages" section) and ensure your DNS records point to Vercel.

---

## Français

Cette application est construite avec **Next.js**. La manière la plus simple de la déployer est d'utiliser **Vercel** (les créateurs de Next.js).

### Étape 1 : Pousser vers GitHub
1.  Assurez-vous que votre code est sur un dépôt GitHub.

### Étape 2 : Déployer sur Vercel
1.  Allez sur [Vercel.com](https://vercel.com) et connectez-vous.
2.  Cliquez sur **"Add New..."** > **"Project"**.
3.  Importez votre dépôt GitHub.
4.  Vercel détectera automatiquement qu'il s'agit d'un projet Next.js.
5.  Cliquez sur **"Deploy"**.

### Étape 3 : Connecter le Domaine Personnalisé (`thug-angel.ch`)
1.  Une fois déployé, allez dans **Settings** (Paramètres) > **Domains** (Domaines) du projet.
2.  Entrez `thug-angel.ch` et cliquez sur **Add**.
3.  Vercel vous fournira des enregistrements DNS (généralement un **A Record** ou **CNAME**).
4.  Connectez-vous chez votre registraire de domaine (là où vous avez acheté `thug-angel.ch`) et mettez à jour les DNS comme indiqué par Vercel.

### Important : Fichiers Média
Comme vous gérez les fichiers médias manuellement (selon `USAGE.md`) :
- Assurez-vous que les dossiers `public/music/` et `public/images/` contenant vos fichiers sont bien inclus dans votre dépôt GitHub.
- S'ils sont trop volumineux pour GitHub, vous devrez peut-être utiliser **Git LFS** ou héberger les fichiers ailleurs (ex: AWS S3).
- **Pour Vercel** : Si la taille totale dépasse 250MB (version gratuite), vous pourriez avoir des problèmes. Dans ce cas, l'hébergement externe des médias est recommandé.

### Dépannage
**Erreur "404 Not Found" après avoir connecté le domaine :**
Si vous voyez une erreur 404 sur votre domaine (`thug-angel.ch`) et que vous avez vu une "vérification DNS" sur GitHub :
- **Ne configurez PAS le domaine dans les paramètres GitHub Pages.** Cela pointera votre domaine vers les serveurs de GitHub, qui ne contiennent pas votre application Vercel.
- Vous devez configurer le domaine dans **Vercel** (Étape 3 ci-dessus).
- Si vous l'avez configuré par erreur sur GitHub, retirez le domaine personnalisé des paramètres de votre dépôt GitHub (section "Pages") et assurez-vous que vos enregistrements DNS pointent vers Vercel.
