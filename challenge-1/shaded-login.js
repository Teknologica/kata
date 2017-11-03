(function () {
    var endpoint = 'https://api.rebilly.com/v2.1/signin';
    var key = 'challenge1';

    function Form() {
        if (typeof axios === 'undefined') {
            throw new Error('Axios not found.');
        }
        //clear
        store(false);
    }

    function generatePayload(user, pass, twoFa) {
        return {
            email: user,
            password: pass,
            oneTimePassword: twoFa
        };
    }

    function store(status) {
        if (status) {
            localStorage.setItem(key, JSON.stringify(true));
        }
        else {
            localStorage.removeItem(key);
        }
    }

    function isLoggedIn() {
        return localStorage.getItem(key) !== null;
    }

    Form.prototype.login = function (user, pass, twoFa) {
        return axios.post(endpoint, generatePayload(user, pass, twoFa))
            .then(function (response) {
                store(true);
                return response;
            })
            .catch(function (error) {
                store(false);
                return Promise.reject(error);
            });
    };

    Form.prototype.logout = function () {
        store(false);
        return false;
    };

    Form.prototype.isLoggedIn = isLoggedIn;

    window.loginForm = new Form();
})();
