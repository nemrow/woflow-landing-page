
var Flask = new (function(){ return {
        '_endpoints': [["static", ["/static/", ""], ["filename"]], ["dwnld", ["/dwnld/", ""], ["session_key"]], ["contact_team", ["/contact-team"], []], ["favicon", ["/favicon.ico"], []], ["sneak_redirect", ["/sneak-peek"], []], ["serve_js", ["/jsglue.js"], []], ["download", ["/download"], []], ["introbar", ["/introbar"], []], ["register", ["/register"], []], ["contact", ["/contact"], []], ["expired", ["/expired"], []], ["pricing", ["/pricing"], []], ["privacy", ["/privacy"], []], ["resend", ["/resend"], []], ["dwnld", ["/dwnld"], []], ["eula", ["/eula"], []], ["index", ["/"], []]],
        'url_for': function(endpoint, rule) {
            if(rule === undefined) rule = {};

            var has_everything = false, url = "";
            
            var is_absolute = false, has_anchor = false, has_scheme;
            var anchor = "", scheme = "";

            if(rule['_external'] === true) {
                is_absolute = true; 
                scheme = location.protocol.split(':')[0];
                delete rule['_external'];
            }

            if(rule['_scheme'] !== undefined) {
                if(is_absolute) {
                    scheme = rule['_scheme'];
                    delete rule['_scheme'];
                } else {
                    throw {name:"ValueError", message:"_scheme is set without _external."};
                }
            }

            if(rule['_anchor'] !== undefined) {
                has_anchor = true;
                anchor = rule['_anchor'];
                delete rule['_anchor'];
            }

            for(var i in this._endpoints) {
                if(endpoint == this._endpoints[i][0]) {
                    url = ''; j = 0; has_everything = true;
                    for(var j = 0; j < this._endpoints[i][2].length; j++) {
                        t = rule[this._endpoints[i][2][j]];
                        if(t == undefined) {
                            has_everything = false;
                            break;
                        }
                        url += this._endpoints[i][1][j] + t;
                    }
                    if(has_everything) {
                        if(this._endpoints[i][2].length != this._endpoints[i][1].length) 
                            url += this._endpoints[i][1][j];

                        if(has_anchor) {
                            url += "#" + anchor;
                        }

                        if(is_absolute) {
                            return scheme + "://" + location.host + url;
                        } else {
                            return url;
                        }
                    }
                }
            }                

            throw {name: 'BuildError', message: "Couldn't find the matching endpoint."};
        }
};});