const API_KEY = '79b3a3b99fd743e4035834c995a9ec4e';
const RATES = ['EUR', 'AUD', 'CAD', 'CHF', 'CNY', 'GBP', 'JPY', 'USD'];

function crearDate() {
  return ($input = $(document.createElement('input'))
    .attr('type', 'date')
    .attr('id', 'date')
    .attr('min', '2000-01-01')
    .attr('value', new Date().toISOString().split('T')[0])
    .attr('max', new Date().toISOString().split('T')[0]));
}

function crearSelect() {
  $select = $(document.createElement('select'));
  RATES.forEach((elem) => {
    $select.append(
      $(document.createElement('option')).attr('value', elem).text(elem)
    );
  });
  return $select;
}

function crearInputs() {
  $form = $('form').append(crearDate()).append(crearSelect());
}

function actualizarElemento(elemento, valor = '') {
  elemento.text(valor);
}

function crearTablaResutados() {
  RATES.forEach((elem) => {
    $('table').append(
      $(document.createElement('tr'))
        .attr('id', elem)
        .append($(document.createElement('td')).attr('class', 'rate'))
        .append($(document.createElement('td')).attr('class', 'value'))
    );
  });
}

crearInputs();
crearTablaResutados();
const $boton = document.querySelector('button');
$boton.onclick = () => {
  actualizarElemento($('td'));

  const fechaConsulta = $('#date').val();
  const monedasConsulta = RATES.join(',');
  const url =
    'http://api.exchangeratesapi.io/v1/' +
    fechaConsulta +
    '?access_key=' +
    API_KEY +
    '&symbols=' +
    monedasConsulta;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.success === true) {
        let escala = data.rates[$('select').val()];

        $('td.rate').each((index, elem) =>
          actualizarElemento($(elem), RATES[index])
        );

        $('td.value').each((index, elem) =>
          actualizarElemento(
            $(elem),
            (data.rates[RATES[index]] / escala).toPrecision(4)
          )
        );
      } else {
        console.error('Error en la respuesta de la API');
      }
    })
    .catch(console.error());
};
