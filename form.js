(function () {
  'use strict';

  // Lainattu suoraan getbootstrap.comista. Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation');

  // Lainattu suoraan getbootstrap.comista. Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          lomake();
          tyhjennaLomake();
        }
        form.classList.add('was-validated');
      }, false);
    });
})();

function lomake() {
  // Määritellään muuttujat lomakkeen tiedoille
  var etunimi = document.getElementById("etunimi").value;
  var sukunimi = document.getElementById("sukunimi").value;
  var sahkoposti = document.getElementById("sahkoposti").value;
  var puhelin = document.getElementById("puhelin").value;
  var palaute = document.getElementById("palaute").value;
  var arvio;
  var syoda = "";
  var viesti;

  // Haetaan radiobuttoneista valinta ravintolan arviolle
  var radio = document.getElementsByName('arvio');
  for (var i = 0, rLength = radio.length; i < rLength; i++) {
    if (radio[i].checked) {
      arvio = radio[i].value;
      break;
    }
  }
  
  // Haetaan monivalinta vaihtoehdot toivotuista ruokalajeista
  var monivalinta = document.getElementsByName('ruokatoive');
  for (var j = 0, length = monivalinta.length; j < length; j++) {
    if (monivalinta[j].checked) {
      syoda = syoda + monivalinta[j].value + ", ";
    }
  }

  // Haetaan pudotusvalikon tiedot siitä, että onko käyttäjä vieraillut ravintolassa
  var x = document.getElementById("kaynti").selectedIndex;
  var y = document.getElementById("kaynti").options;
  if (y[x].text == "Kyllä") {
    viesti = "Kiva kuulla, että olet käynyt meillä. Tulethan pian uudestaan.";
  } else {
    viesti = "Et ole siis vielä käynyt meillä. Tervetuloa ihastumaan!";
  }
  
  // Tulostetaan vastaukset sivulle
  document.getElementById("lomakkeen-tiedot").innerHTML="<h2>Kiitos palautteesta</h2>" +
    "<p><strong>Etunimi: </strong>" + etunimi + "<br>" +
    "<strong>Sukunimi: </strong>" + sukunimi + "<br>" +
    "<strong>Sähköposti: </strong>" + sahkoposti + "<br>" +
    "<strong>Puhelin: </strong>" + puhelin + "<br>" + 
    "<p>" + palaute + "</p>" + 
    "<p><strong>Arvio ravintolastamme: </strong>" + arvio + "<br>" +
    "<strong>Mitä haluaisit syödä: </strong>" + syoda + "</p>";

  // Näytetään vierauluviesti
  alert(viesti);
}

function tyhjennaLomake() {
  // Tyhjennetään lomake
  document.getElementById("palautelomake").reset();
  // Palautetaan tyylit alkutilaan.
  document.classList.remove("was-validated");
}