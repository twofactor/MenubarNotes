# quill-local-storage
a local storage module for restoring "drafted" text to the quilljs editor

i.e., a means to keep your users' post or comment drafts from getting wiped on page reload.
## usage

quill-local-storage works as a standard module for the quilljs editor.

to include mentions in your project, place the `quill-local-storage` file on your page.

you can get the dist files (including a minified version) on npm. i'll put them on bower by request.

```sh
npm install quill-local-storage
```

simply register the module with the `Quill` global, 

```javascript
Quill.registerModule("local-storage", QuillMentions);
```
and pass a config 
```javascript
var config = {
  timeout: 60, //minutes
  key: "my-unique-identifier", // the key used to store "drafts" in localstorage
};
myEditor.addModule("local-storage", config);
```
and voila!
## options

### timeout
the number of minutes until the value of the contets in local storage are no longer placed in the editor.

default is 30 mins.

### key
this is the key that `quill-local-storage` uses to get/set data from your editor.

defaults to either the `quill.editor.root` id name or (as a last resort) `quill-local-storage`.
