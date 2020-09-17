## minesweeper

## External Endpoint

To access the application use the following address:

### http://54.172.104.73:3000/

## Local Build

To run the application you need to use:

### npm start

To run the tests you need to use:

### npm run test

You could run the server using the following command:

### docker-compose -f docker-compose.yml up --build

You could run the tests using the docker-compose-test.yml, run the following command:

### docker-compose -f docker-compose-test.yml up --build

the API Documentation could be found on Swagger

## CREATE AN USER

### POST - http://{HOST}/v1/register

{
    "name": "Raphael Santos",
    "email": "email@test1.com",
    "password": "123456789"
}

Response
{
    "response": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQHRlc3QxLmNvbSIsIl9pZCI6IjVmNjE5OTdhMDlkMDNhMDIxNzkzYjAxNyIsImlhdCI6MTYwMDIzMTgwMn0.0SDm8r85VsqHAwhquZ9c3pA9YtUczGJDVcazuVN9loc",
    "user": {
        "_id": "5f61997a09d03a021793b017",
        "name": "Raphael Santos",
        "email": "email@test1.com",
        "salt": "62d7287b7903957c0867f8070a52baf8",
        "hash": "49b0c501bd21e0b9496c85f2b952562f297048e906acd1670158cc17b8f54384f0359256c24d4c76e2c81f338a565d27f8b61d3e3025811e94af8f61e34bc2df",
        "createdAt": "2020-09-16T04:50:02.715Z",
        "updatedAt": "2020-09-16T04:50:02.715Z",
        "__v": 0
    }
}


## CREATE AN USER

### POST - http://{HOST}/v1/login

{
    "email": "email@test1.com",
    "password": "123456789"
}

Response
{
    "response": true,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQHRlc3QxLmNvbSIsIl9pZCI6IjVmNjE5OTdhMDlkMDNhMDIxNzkzYjAxNyIsImlhdCI6MTYwMDIzMTk0MH0._VDk8YHo1e-aGbegYHHR8eiev0qRGng8l3IZNOJbSSY",
    "user": {
        "_id": "5f61997a09d03a021793b017",
        "name": "Raphael Santos",
        "email": "email@test1.com",
        "salt": "62d7287b7903957c0867f8070a52baf8",
        "hash": "49b0c501bd21e0b9496c85f2b952562f297048e906acd1670158cc17b8f54384f0359256c24d4c76e2c81f338a565d27f8b61d3e3025811e94af8f61e34bc2df",
        "createdAt": "2020-09-16T04:50:02.715Z",
        "updatedAt": "2020-09-16T04:50:02.715Z",
        "__v": 0
    }
}

## GET YOUR USER

### GET - http://{HOST}/v1/user

header
{
    Authorization: Bearer {TOKEN}
}

Response
{
    "response": true,
    "user": {
        "_id": "5f61997a09d03a021793b017",
        "name": "Raphael Santos",
        "email": "email@test1.com",
        "salt": "62d7287b7903957c0867f8070a52baf8",
        "hash": "49b0c501bd21e0b9496c85f2b952562f297048e906acd1670158cc17b8f54384f0359256c24d4c76e2c81f338a565d27f8b61d3e3025811e94af8f61e34bc2df",
        "createdAt": "2020-09-16T04:50:02.715Z",
        "updatedAt": "2020-09-16T04:50:02.715Z",
        "__v": 0
    }
}

## CREATE A GAME

### POST - http://{HOST}/v1/game

header
{
    Authorization: Bearer {TOKEN}
}
Params
{
    "cols": 10,
    "rows": 10,
    "number_mines": 5
}

Response
{
    "response": true,
    "id": "5f619b0209d03a021793b018",
    "view_board": [
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ]
    ]
}

## GET THE GAMES

### GET - http://{HOST}/v1/games

header
{
    Authorization: Bearer {TOKEN}
}

Response
{
    "response": true,
    "games": [
        {
            "_id": "5f619b0209d03a021793b018",
            "cols": 10,
            "rows": 10,
            "userId": "5f61997a09d03a021793b017",
            "number_mines": 5,
            "view_board": [
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ],
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ],
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ],
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ],
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ],
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ],
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ],
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ],
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ],
                [
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X",
                    "X"
                ]
            ]
        }
    ]
}

## DELETE THE GAME

### DELETE - http://{HOST}/v1/game/:id

header
{
    Authorization: Bearer {TOKEN}
}

Response
{
    "response": true
}

## MARK A FLAG / NEW POSITION

### POST - http://{HOST}/v1/game/:id/mark

header
{
    Authorization: Bearer {TOKEN}
}

params
{
    "row": 1,
    "col": 1,
    "type": "F"
}

response
{
    "response": true,
    "view_board": [
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "F",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ],
        [
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X",
            "X"
        ]
    ],
    "status": "playing"
}
