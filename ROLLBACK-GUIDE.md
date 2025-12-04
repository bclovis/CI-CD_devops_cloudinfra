# Guide Rollback - Cloud Run

## Comment ça marche ?

Cloud Run garde automatiquement toutes les versions (révisions) de votre application. Chaque déploiement crée une nouvelle révision sans supprimer les anciennes.

## Commandes pour le rollback

### 1. Voir toutes les versions disponibles
```bash
gcloud run revisions list --service=gcp-project5 --region=europe-west9
```

### 2. Revenir à une version précédente
```bash
gcloud run services update-traffic gcp-project5 \
  --to-revisions=NOM-REVISION=100 \
  --region=europe-west9
```

Remplacez `NOM-REVISION` par le nom de la révision affichée dans la liste.

## Exemple pratique

**Situation :** Vous avez déployé une nouvelle version avec un bug, vous voulez revenir en arrière.

```bash
# 1. Lister les versions
gcloud run revisions list --service=gcp-project5 --region=europe-west9

# Résultat :
# gcp-project5-00003-xyz  (version actuelle avec bug)
# gcp-project5-00002-def  (version précédente OK)
# gcp-project5-00001-abc  (première version)

# 2. Revenir à la version 00002
gcloud run services update-traffic gcp-project5 \
  --to-revisions=gcp-project5-00002-def=100 \
  --region=europe-west9

# C'est fait ! L'application utilise maintenant la version 00002
```

## Test du rollback

Pour démontrer le rollback :

1. Déployez la version actuelle (V1)
2. Modifiez quelque chose (ex: titre dans `src/App.jsx`)
3. Pushez sur GitHub → déploiement automatique (V2)
4. Utilisez la commande rollback pour revenir à V1
5. Vérifiez que l'ancienne version est de nouveau active

Le rollback prend environ 10 secondes.
