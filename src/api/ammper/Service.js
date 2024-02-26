import axios from "axios";
import URLS from "../../Constants";
import Cookies from "js-cookie";


class Endpoints {
    static REGISTER = '/member/register'
    static LOGIN = '/member/login';
    static LOGOUT = '/member/logout';
    static BANKS = '/banking/institutions';
    static ACCOUNTS = '/banking/accounts';
    static TRANSACTIONS = '/banking/transactions';
    static HOME = '/member/home';
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken=true;


export default class AmmperService {
    static client = axios.create({baseURL: URLS.AMMPER_BASE_URL});

    static async register(body) {
        return await this.client.post(Endpoints.REGISTER, body);
    }

    static async login(login_body) {
        return await this.client.post(Endpoints.LOGIN, login_body);
    }

    static async logout() {
        return await this.client.get(Endpoints.LOGOUT);
    }

    static async listBanks() {
        return await this.client.get(Endpoints.BANKS);
    }

    static async listAccounts(bank) {
        
        return await this.client.post(Endpoints.ACCOUNTS, bank)
    }

    static async listTransactions(body) {
        return await this.client.post(Endpoints.TRANSACTIONS, body);
    }

    static async userAuthenticated() {
        return await this.client.get(Endpoints.HOME);
    }

    static sessionExists() {
        return localStorage.getItem('auth') == 'true';
    }

    static updateSession(value, setUserAuth) {
        localStorage.setItem('auth', value);
        setUserAuth(value);
    }

    static saveSession(value) {
        localStorage.setItem('auth', value);
    }
}

