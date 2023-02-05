const calc = document.querySelector('.calculator');

function update() {
  const inputs = document.getElementsByClassName('input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('change', policz);
  }
}

update();

function add() {
  const input = document.createElement("input");
  input.setAttribute("number", "text");

  input.style.margin = "15px 0 auto";
  input.classList.add('input');

  const br = document.createElement("br");

  calc.appendChild(input);
  calc.appendChild(br);
  update();
}

function policz() {
  const values = [];
  const tabCalc = document.getElementsByClassName('input');

  for (let i = 0; i < tabCalc.length; i++) {
    values.push(tabCalc[i].value);
  }

  let sumC = 0;
  let avgC = 0;
  let minC = 0;
  let maxC = 0;

  for (i = 0; i < values.length; i++) {
    sumC += parseInt(values[i]);
  }
  avgC = sumC / values.length;
  minC = Math.min(...values);
  maxC = Math.max(...values);

  document.getElementById('sum').value = sumC;
  document.getElementById('average').value = avgC;
  document.getElementById('min').value = minC;
  document.getElementById('max').value = maxC;
  update();
}