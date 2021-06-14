//Listagem de quais personagens ja foram mostrados
let numbers = [];

//Realiza a randomização dos numeros
function newNumber() {
  return Math.floor(Math.random() * 671) + 1;
}

//"Compara" quatro números gerados na função newNumber. Se houverem números iguais, o laço while irá gerar outros diferentes!
function newSet() {
  let set = [];
  if (numbers.length < 671) {
    for (let index = 0; index < 4; index++) {
      let number = newNumber();

      while (numbers.find((n) => number == n)) {
        number = newNumber();
      }
      set.push(number);
      numbers.push(number);
      console.log(numbers);
    }
  } else {
    //reseta a varialvel controle, pois ja mosntrou todos os personagens, ou seja, não teremos personagens repetidos até a página ser atualizada
    numbers = [];
  }

  return set;
}

//Usando os números gerados como parâmetro para requisitar as informações pelo id da documentação da API
function cleanElements() {
  for (const key in [0, 1, 2, 3]) {
    document.getElementById("img" + (parseInt(key) + 1)).src =
      "https://i.stack.imgur.com/kOnzy.gif";
    document.getElementById("imgDescription" + (parseInt(key) + 1)).innerHTML =
      "";
  }
}

//Async function foi a forma mais simples que encontrei de executar um grupo de tarefas sem repetir grupos de código.
//O fetch então traz o resultado, para ENTÃO, conseguir alterar cada uma das img e imgDescription
async function seeMore() {
  cleanElements();

  await fetch(
    "https://rickandmortyapi.com/api/character/" + newSet().concat(","),
    {
      method: "GET",
      mode: "cors",
      redirect: "follow",
      headers: {
        "content-type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      for (const key in response) {
        document.getElementById("img" + (parseInt(key) + 1)).src =
          response[parseInt(key)].image;
        document.getElementById(
          "imgDescription" + (parseInt(key) + 1)
        ).innerHTML = response[parseInt(key)].name;
      }
    });
}
