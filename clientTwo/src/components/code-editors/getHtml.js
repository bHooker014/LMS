function getSrcDoc({babelOutput, error, css}){
if(error){
return `<html lang='en'>
<head>
<meta charset="utf-8">
</head>
<body>
<pre>
<code>
${error}
</code>
</pre>
</body>
</html>
`
}return `
<html lang='en'>
<head>
<meta charset="utf-8">
<style type="text/css">
${css}
</style>
</head>
<body>
<div id='root'></div>
<script src=./react.development.js></script>
<script src=./react-dom.development.js></script>
<script>
try{
${babelOutput}

}catch(e){
const body = document.getElementsByTagName("body")[0]
const pre = document.createElement("pre")
pre.innerHTML = e
body.appendChild(pre)
}
</script>
</body>
</html>
`
}

export {
    getSrcDoc
}