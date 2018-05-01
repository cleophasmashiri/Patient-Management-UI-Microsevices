# Deploying to Heroku

1. Make sure you register for a Heroku account at https://heroku.com

2. cd into the root of your java project and run the following commands.

```
git init
git add .
git commit -m "heroku deployment"
heroku login
heroku create app1
git push heroku master
```

3. To view your deployed
heroku open

4. Repeat 1, 2 and 3 for all your applications.

5. Update your zuul application.yml or application.properties using you heroku urls in place of localhost below:

```
zuul:
    routes:
        doctor:
            url: http://localhost:9081
            sensitive-headers:
        booking:
            url: http://localhost:9083
            sensitive-headers:
        payment:
            url: http://localhost:9084
            sensitive-headers:
        patient:
            url: http://localhost:9082
            sensitive-headers:
        main:
            url: http://localhost:9080
            sensitive-headers:
```


