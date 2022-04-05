const API_KEY = '79b3a3b99fd743e4035834c995a9ec4e';
const CARGADO = 'cargado';
const HABILITADO = 'habilitado';
let estado = CARGADO;
const RATES = ['EUR', 'AUD', 'CAD', 'CHF', 'CNY', 'GBP', 'JPY', 'USD'];

function crearDateInput() {
  return ($input = $(document.createElement('input'))
    .attr('type', 'date')
    .attr('id', 'datedata')
    .attr('name', 'datedata')
    .attr('min', '2000-01-01')
    .attr('max', new Date().toISOString().split('T')[0]));
}

function crearSelectInput() {
  $select = $(document.createElement('select'));
  RATES.forEach((elem) => {
    $select.append(
      $(document.createElement('option')).attr('value', elem).text(elem)
    );
  });
  return $select;
}

function crearInputs() {
  $form = $('form').append(crearDateInput()).append(crearSelectInput());
}

function habilitar() {
  estado = HABILITADO;
  $boton.innerText = 'Calcular';
  crearInputs();
}

const $boton = document.querySelector('button');
$boton.onclick = () => {
  if (estado === CARGADO) {
    habilitar();
  }
  if (estado === HABILITADO) {
    url =
      'http://api.exchangeratesapi.io/v1/' +
      $('input').val() +
      '?access_key=' +
      API_KEY +
      '&symbols=' +
      RATES.join(',');
    console.log(url);

    //rate = $('select').val() / eur
    //fetch('url')
  }
};
