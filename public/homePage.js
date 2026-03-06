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
            ProfileWidget.showProfile(response.data);
        }
    });

    function getExchangeRate() {
        ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

getExchangeRate();
setInterval(getExchangeRate, 60000);

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс пополнен");
        } else {
            console.error("Ошибка пополнения", response.error)
            moneyManager.setMessage(false, response.error, "Ошибка пополнения");
        }
    });
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация валюты выполнена");
        } else {
            console.error("Ошибка конвертации", response.error)
            moneyManager.setMessage(false, response.error, "Ошибка конвертации");
        }
    });
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод средств выполнен");
        } else {
            console.error("Ошибка перевода", response.error)
            moneyManager.setMessage(false, response.error, "Ошибка перевода");
        }
    });
}

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    });
}