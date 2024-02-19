document.addEventListener('DOMContentLoaded', () => {
    let fitxersImg = [];
  
    const zona = document.querySelector('.drop-area');
    const botoPujada = zona.querySelector('button');
    const entradaFitxer = document.getElementById('input-file');
    const previsualitzacioImg = document.getElementById('preview');
  
    ['dragover', 'dragleave', 'drop'].forEach(esdeveniment => {
        zona.addEventListener(esdeveniment, (e) => {
            e.preventDefault();
            zona.classList.toggle('active', esdeveniment === 'dragover');
        });
    });
  
    zona.addEventListener("drop", (e) => {
        fitxersImg = fitxersImg.concat(Array.from(e.dataTransfer.files));
        actualitzaPrevisualitzacio();
    });
  
    botoPujada.addEventListener("click", (e) => {
        e.preventDefault();
        entradaFitxer.click();
    });
  
    entradaFitxer.addEventListener("change", () => {
        fitxersImg = fitxersImg.concat(Array.from(entradaFitxer.files));
        actualitzaPrevisualitzacio();
    });
  
    function actualitzaPrevisualitzacio() {
        previsualitzacioImg.innerHTML = '';
        fitxersImg.forEach(mostraImg);
    }
  
    function mostraImg(fitxer, idx) {
        const tipusPermesos = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!tipusPermesos.includes(fitxer.type)) {
            alert("Tipus de fitxer no suportat.");
            fitxersImg.splice(idx, 1);
            return;
        }
  
        const lector = new FileReader();
        lector.onload = () => {
            const contenidorImg = document.createElement('div');
            contenidorImg.className = "previewImage";
            
            const imatge = document.createElement('img');
            imatge.src = lector.result;
            
            const nomFitxer = document.createElement('span');
            nomFitxer.textContent = fitxer.name;
            
            const botoEliminar = document.createElement('span');
            botoEliminar.className = "material-symbols-outlined removeBtn";
            botoEliminar.textContent = "close";
            botoEliminar.onclick = () => {
                fitxersImg.splice(idx, 1);
                actualitzaPrevisualitzacio();
            };
            
            contenidorImg.append(imatge, nomFitxer, botoEliminar);
            previsualitzacioImg.appendChild(contenidorImg);
        };
        lector.readAsDataURL(fitxer);
    }
  });
  