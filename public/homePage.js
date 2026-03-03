"use strict";

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

ApiConnector.current(response => {
        if (response.success) {
            ProfileWidget.showProfile(response);
        }
    });

    //function getExchangeRate() {
        //ApiConnector.______(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response);
        }
    });
}

getExchangeRate();
setInterval(getExchangeRate(), 60000);

