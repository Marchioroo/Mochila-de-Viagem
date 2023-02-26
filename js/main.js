const form = document.getElementById("novoItem"); // busca o ID novoitem
const lista = document.getElementById("lista"); // busca o ID lisa
const itens = JSON.parse(localStorage.getItem("itens")) || [] // recebe as informações do local storage e o JSON.parse transforma os dados para ser lidos em js, 
                                                              // caso nao tenha nada, restorna vazio 

itens.forEach( (elemento)=>{ // busca todos os elementos dentro do "itens" que veio do loca storage
    criarElemento(elemento) // chama a função criar elemento 
    console.log(elemento)
})


form.addEventListener("submit", (evento) =>{
    evento.preventDefault() // corta o envio do submit
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value)
    const itemAtual = { // objetio com nome e quantidade que são pegos quando o usuário digita no campo text
        
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    

    if(existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    }else{
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length -1]).id +1 :0;
        criarElemento(itemAtual); 
        itens.push(itemAtual) // adiciona dentro do array Itens o item atual
    }

   
    
    localStorage.setItem("itens", JSON.stringify(itens)) // transforma o array em STRING JSON para ser lidos dentro do local storage
      
    nome.value = ""; // deixa o campo em branco
    quantidade.value = "";
})

function criarElemento(item){ 
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")
   
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML +=item.nome;
    novoItem.appendChild(botaoDeleta(item.id)) 
    lista.appendChild(novoItem) 
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", (e) =>{      
        deleteItemList(e.target.parentNode, id)
    })
    return elementoBotao
}

function deleteItemList(tag, id){
    tag.remove();
    itens.splice(itens.findIndex(elemento => elemento.id === id),1)
    
    localStorage.setItem("itens", JSON.stringify(itens))
    
}