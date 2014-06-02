define({
    get: function (key) {
        return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    },
    set: function (key, value, maxAge, path, domain, secure) {
        if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) { return false; }
        var expires = '';
        if (maxAge) {
            switch (maxAge.constructor) {
                case Number:
                    expires = maxAge === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + maxAge;
                    break;
                case String:
                    expires = '; expires=' + maxAge;
                    break;
                case Date:
                    expires = '; expires=' + maxAge.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + (domain ? '; domain=' + domain : '') + (path ? '; path=' + path : '') + (secure ? '; secure' : '');
        return true;
    },
    expire: function (key, path, domain) {
        if (!key || !this.has(key)) { return false; }
        document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + ( domain ? '; domain=' + domain : '') + ( path ? '; path=' + path : '');
        return true;
    },
    has: function (key) {
        return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    },
    isEnabled: function () {
        this.set('cookiesIsEnabledTest', '1');
        var isEnabled = (this.get('cookiesIsEnabledTest') === '1') ? true : false;
        this.expire('cookiesIsEnabledTest');
        
        return isEnabled;
    }
});