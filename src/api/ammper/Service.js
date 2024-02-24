import axios from "axios";
import URLS from "../../Constants";


class Endpoints {
    static LOGIN = '/member/login';
    static LOGOUT = '/member/logout';
    static BANKS = '/banking/institutions';
    static HOME = '/member/home';
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken=true;

export default class AmmperService {
    static client = axios.create({baseURL: URLS.AMMPER_BASE_URL});

    static async login(login_body) {
        return await this.client.post(Endpoints.LOGIN, login_body);
    }

    static async logout() {
        return await this.client.get(Endpoints.LOGOUT);
    }

    static async listBanks() {
        return await this.client.get(Endpoints.BANKS)
    }

    static async userAuthenticated() {
        return await this.client.get(Endpoints.HOME);
    }
}

