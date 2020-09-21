[Installation](#installation)

- [Installation](#installation)
- [Note](#note)
- [Testing](#testing)
- [Known Issues](#known-issues)

# Installation

This repo uses `docker` and `docker-compose`. The application runs on port `3000` and `MariaDB` runs on port `3388` by default. If you wish to change it edit the `DOCKER_PORT` and `MARIA_DB_PORT` variableS in the `.env` file

-   Clone this repository
-   Copy `.env.example` to `.env`.
-   Start `docker`
-   Run `docker-compose buid && docker-compose up`
-   Install `composer` and `npm` packages:
    -   Run `docker-compose exec myapp composer install`
    -   Run `docker-compose exec myapp npm install`
    -   Run `docker-compose exec myapp php artisan migrate --seed` to run migrations
-   Navigate to `localhost:{3000 or YOUR PORT}`

# Note

The application, as I built it, is overly architected and engineered based on the requirements. The reason for doing so is to be able to showcase my usage and understanding of various technologies, patterns, and design decisions. For a simple application like this I would not have chosen all the tools and designs I have implemented. Here are some tools, designs and decisions I have used:

-   The fields supply both front and backend validation. For the frontend I used `react-hook-form` that allows for custom validation rules applied at the control level. For the backend I used `Laravels` validators
-   `TailwindCSS` - I chose TW because the it is very easy to get up and running quickly without having to worry about native CSS, rather you use utility classes create your styles. As you can see in `OrderForm` I have extracted the styles to styled components (`Box`, `ImgContainer`, `Field`, `Select`) that supply the CSS, in this way it is very quick and easy to build a custom component library.
-   I used `Typescript` for this project but I should note that I am relatively new to Typescript and dont' fully understand yet all of its nuances
-   For state management I used an `XState` machine that handles all HTTP requests. It is a generic machine meant for handling the state of requests and allows you to create custom `services` that you can use for any endpoint and hook into the machine. You supply your logic that pertains to the operations while the `fetchMachine` handles the request and passes off to the services. It is very powerful.
-   For the backend you can see that I implemented `repository pattern` and kept the controllers very ligthweight.
-   For the testing you can also see that I kept the tests ligthweight by providint a standard way to test all CRUD operations for any model. All the heavy testing takes place in `TestCase.php`
-   `React Context API` - I am big fan of using the context API rather than using `Redux`. In this application I use the context API but expose it through two different hooks
    -   `useFetchState()` - exposes the current state of the state machine - data, state the machine is currently in, etc...
    -   `useSendToMachine()` - exposes commands to send requests to the service in the machine, exposes these methods:
        -   `createNew()` - Sends a `POST` request to the machine
        -   `getData()` - Sends a `GET` request to the machine
        -   `updateData()` - Sends a `PUT` request to the machine
        -   `deleteData()` - Sends a `DELETE` request to the machine.
    -   The advantage to using this paradigm where a hook exposes methods that interface with the context is that you can easily swap out your state management tool or logic and never have to update the components that implement them!

# Testing

To run the php unit tests run `docker-compose exec myapp php artisan test` it will run through the basic tests - creating an order, updating an order, deleting an existing order, and trying to delete an order that does not exist.

# Known Issues

Due to the fact that I just moved and without internet access for over a week and the fact that I rushed this to you because I missed the deadline there are some outstanding know issues. The following lists what they are and what I would have done had I the time to finish it properly

-   I had created both a `Select` and `Field` component. Using the `react-hook-form` requires a `register` method that defines the validation rules. By creating these components it now requires a ref to be forwarded. You will notice that when after a successful submission for an order the form is cleared. When you start typing in a field there is a delay, this is due to the fact that the forwarded ref now needs to managed, it is causing unnecessary rerenders that could be mitigated by using `useCallback()`.
-   Due to some ambiguity in the requirements or the fact that I may have interpreted them incorrectly a user can only submit a one-time order of three or less potions. The requirements say '...We will be verifying that we cannot do such things as...submit multiple orders under the same name' but later in the document it says 'before submitting a new verify that the client is not submittin an order that will exceed the max of 3 potions per customer per month'. This last statment implies that you can indeed order more than once per month but not exceed the limit. I chose to just implement a one-time order. If this were a real project I would have asked the PM for clarification.
-
