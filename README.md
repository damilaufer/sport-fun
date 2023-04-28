To deploy to production, just push to the "main" branch

Do not store the package-lock.json if you do `npm i` from PP. It will the PP
registry (even when it shouldn't) and the deployment will fail.
