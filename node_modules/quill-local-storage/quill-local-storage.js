// Custom module to add local storage to Quill editor
var QuillLocalStorage = function(quill, options) {
    this.quill    = quill;
    this.options  = options;
    this.timeout  = options.timeout || 30; // mins
    this.key      = options.key || this.quill.root.id || "quill-local-storage";

    var save   = this.textHandler.bind(this);

    if (window.localStorage) {
        if (!this.options.key) {
            this.printNoKey();
            if (!this.quill.root.id) {
                this.printDefaultKeyWarning();
            }
        }
        // restore text if found in local storage
        this.restore();
        this.quill.on("text-change", save);
    } else {
    }
};

QuillLocalStorage.prototype.restore = function restore() {
    var cached = JSON.parse(localStorage.getItem(this.key)),
        timestamp,
        expiration;
    if (cached) {
        timestamp = new Date(cached.timestamp);  // chose dates > numbers because it was easier to read and reason about while debugging...
        expiration = this._expiresAt(timestamp);
        if (expiration > (new Date())) {
            this.quill.setHTML(cached.data);
        } else {
            this.clear();
        }
    }
};

QuillLocalStorage.prototype.textHandler = function textHandler(_delta, _source) {
    var placeholder = this.quill.modules.placeholder, // make this play nicely with the placeholder text module
        toStore = {
            timestamp: (new Date()),
            data: this.quill.getHTML(),
        };
    if (placeholder && !placeholder.isEmpty()) {
        localStorage.setItem(this.key, JSON.stringify(toStore));
    }
};

QuillLocalStorage.prototype.clear = function clear() {
    localStorage.removeItem(this.key);
};

QuillLocalStorage.prototype._expiresAt = function(timestamp) {
    var ONE_MINUTE = 60000,
        timeout = this.timeout*ONE_MINUTE;
    return (new Date(timestamp.getTime() + timeout));
};

QuillLocalStorage.prototype.printNoKey = function() {
    this._printName();
    console.log("No `key` option provided. Falling back to editor root id.");
    this._printDashes();
};

QuillLocalStorage.prototype.printDefaultKeyWarning = function() {
    var msg = "*** Warning! *** quill.root did not have an ID.\n"+
                "> Defaulted to using 'quill-local-storage' as localStorage key. "+
                "> If you have multiple editors on the page, "+
                "this could cause :bug:s.";
    this._printName();
    console.log(msg);
    this._printDashes();
};

QuillLocalStorage.prototype.printNoSupport = function() {
    var msg = "This browser does not support local storage. "+
                "Quill module quill-local-storage did not attach text-change handler.";
    this._printName();
    console.log(msg);
    this._printDashes();
};

QuillLocalStorage.prototype._printName = function() {
    var name = "[quill-local-storage]";
    console.log(name);
};
QuillLocalStorage.prototype._printDashes = function() {
    var dashes = "======================================";
    console.log(dashes);
};