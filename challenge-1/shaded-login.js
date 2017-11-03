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

    function generatePayload(user, pass) {
        return {
            email: user,
            password: pass,
            oneTimePassword: null
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

    Form.prototype.login = function (user, pass) {
        return axios.post(endpoint, generatePayload(user, pass))
            .then(function (response) {
                store(true);
            })
            .catch(function (error) {
                store(false);
            });
    };

    Form.prototype.logout = function () {
        store(false);
        return false;
    };

    Form.prototype.isLoggedIn = isLoggedIn;

    window.loginForm = new Form();
})();
