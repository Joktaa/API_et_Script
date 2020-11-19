import requests
from datetime import datetime

date = datetime.now()
url = "http://192.168.137.2:3000/users"


# GET
def get():
    # id = str(input("Entrez l'id : "))
    # url_get = url + "/" + id

    r = requests.get(url)
    print(r.text)
    print(date)


# POST
def post():
    prenom = str(input("Entrez le prenom : "))
    nom = str(input("Entrez le nom : "))
    mail = str(input("Entrez le mail : "))
    post_url = url + "/add"

    data = {'nom': prenom, 'prenom': nom, 'mail': mail}
    r = requests.post(post_url, data=data)
    print(r.status_code)
    print(date)


# PUT
def put():
    # id = str(input("Entrez l'id : "))
    prenom = str(input("Entrez le prenom : "))
    nom = str(input("Entrez le nom : "))
    mail = str(input("Entrez le mail : "))

    put_url = url + "/update"

    data = {'nom' : nom, 'prenom' : prenom, 'mail' : mail}
    r = requests.put(put_url, data=data)
    print(r.status_code)
    print(date)


# DELETE
def delete():
    mail = str(input("Entrez le mail : "))

    delete_url = url + "/remove"

    data={'mail': mail}
    r = requests.delete(delete_url, data=data)
    print(r.status_code)
    print(date)

get()