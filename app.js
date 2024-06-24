var html = document.getElementById('html');
var css = document.getElementById('css');
var js = document.getElementById('js');
var code = document.getElementById('output').contentWindow.document;
function compile() {
  const PREFIX = 'livecode-';
  const data = ['html', 'css', 'js'].map((key) => {
    const prefixedKey = PREFIX + key;
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);
  });
  setInitial(data);
  document.body.onkeyup = function () {
    localStorage.setItem('livecode-html', JSON.stringify(html.value));
    localStorage.setItem('livecode-css', JSON.stringify(css.value));
    localStorage.setItem('livecode-js', JSON.stringify(js.value));
    code.open();
    code.writeln(
      html.value +
        '<style>' +
        css.value +
        '</style>' +
        '<script>' +
        js.value +
        '</script>'
    );
    code.close();
  };
}


function setInitial(data) {
  let htmlContent = data[0] || '';
  let cssContent =
    data[1] ||
    ``;
  let jsContent = data[2] || '';
  css.value = cssContent;
  js.value = jsContent;
  html.value = htmlContent;
  code.open();
  code.writeln(
    htmlContent +
      '<style>' +
      cssContent +
      '</style>' +
      '<script>' +
      jsContent +
      '</script>'
  );
  code.close();
}
compile();

document.querySelectorAll('.control').forEach((control) =>
  control.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.classList.toggle('collapse');
    e.target.classList.add('close');
    e.target.parentElement.querySelector('h2').classList.toggle('hidden');
  })
);

document.querySelectorAll('.clear').forEach((clear) =>
  clear.addEventListener('click', (e) => {
    const ele = e.target.classList[1];
    document.querySelector(`#${ele}`).value = '';
    localStorage.setItem(`livecode-${ele}`, JSON.stringify(''));
    compile();
  })
);

document.querySelectorAll('.copy-btn').forEach((copy) => {
  copy.addEventListener('click', (e) => {
    const temp = e.target.innerHTML;
    e.target.innerText = 'Copied!';
    setTimeout(function () {
      e.target.innerHTML = temp;
    }, 800);
  });
});

document.addEventListener("keydown", function(event) {
  // Verifica si se presionó Ctrl + U
  if (event.ctrlKey && event.key === 'u') {
      // Agrega o quita la clase 'ocultar-header' al body
      document.body.classList.toggle('ocultar-header');
  }
}); 
