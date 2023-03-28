# Introduction

This is a sample of po-gen implementation in several public API, which are:

1. [Demo QA](https://bookstore.toolsqa.com/swagger/)
2. [Pet Store](https://petstore.swagger.io/)

# Installation

1. Install NodeJS and NPM

    Check if node and npm are successfully installed:
    ```bash
    node -v
    npm -v
    ```
2. Clone repo
3. Create `.env.dev` file with key-value inside:
    | key | example value | description | 
    |---|---------------------------|----|
    | MAIN | [bookstore_url](https://bookstore.toolsqa.com) <br> [petstore_url](https://petstore.swagger.io) | petstore API is used to give sample for upload file case and the rest is given by bookstore API <br> |
    | USER_ID | 99741930-****** | user id obtained from registration response in bookstore API|
    | USER_NAME | automation**** | user name valid static for automation purpose |
    | PASSWORD | Password123! | password valid static for automation purpose |

    P.S: for `MAIN` value, you can change the value when you need to run one of the case (which are upload file case or the rest)

    P.S: for user id, user name, and password value, you can get them from creating new account in bookstore API.

4. Run regression runner with:
    ```bash
    npm run test:dev
    ```
5. Run runner with mochawesome report:
    ```bash
    npm run report:dev
    ```
6. Run runner for specific runner, which is `file.js`:
    ```bash
    npm run test runner/file.js
    ```

# Directory Example

## Case: Upload file / attachment

You can see from:
- [upload image case](tests/scenarios/File/POST_uploadimage.spec.js)

## Case: Request get only

You can see from:
- [get books case](tests/scenarios/BookStore/GET_getbooks.spec.js)

## Case: Request with body and DDT mechanism

You can see from:
- [login case](tests/scenarios/User/POST_register.spec.js)
- [register case](tests/scenarios/User/POST_register.spec.js)
- [check token case](tests/scenarios/User/POST_checktoken.spec.js)

## Case: Request with another argument

You can see from:
- ID and token: [get user by user id case](tests/scenarios/User/GET_getuserbyuserid.spec.js)
- ID and token: [delete user by user id case](tests/scenarios/User/DELETE_deletebyuserid.spec.js)
- ID and token: [delete books case](tests/scenarios/BookStore/DELETE_deletebooks.spec.js)
- ID: [get books by isbn case](tests/scenarios/BookStore/GET_getbookbyisbn.spec.js)
- Token, body: [create a book case](tests/scenarios/BookStore/POST_createbook.spec.js)
- ID, token, body: [delete a book case](tests/scenarios/BookStore/DELETE_deleteabook.spec.js)
- ID, token, body: [edit isbn book case](tests/scenarios/BookStore/PUT_editisbnbook.spec.js)