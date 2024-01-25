alert('REGRAS DO JOGO:\n1. Você precisa inserir o número limite que a pessoa poderá chutar.\n2. Você precisa inserir um limite de tentativas para não ficar um jogo infinito.\n3. Caso queira escutar a voz da nossa amiga "Manu", aceite a opção que aparecerá em branco.');

let numeroLimite;
let tentativaLimite;
// executando funcao para verficar o número limite
verificarNumeroLimite();
//funcao para verificar a tentativa limite.
verificarTentativaLimite();
// lista para ficar preenchendo os números secretos, dependendo do número limite.
let listaNumeroSecreto = [];
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;
console.log(`Número Secreto: ${numeroSecreto}`);

// executando a funcao de exibir mensagens
exibirMensagensIniciais();
// funcao para exibição de texto. Só colocar a tag do html e o texto que deseja. 
//(Ex: Quero substituir ou colocar um texto no <h1></h1>. exibirTexto('h1', 'Jogo do Número Secreto!'))
function exibirTexto(tag, texto){
        let campo = document.querySelector(tag);
        campo.innerHTML = texto;
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', 
        {rate:1.2});
}
// funcao para não ficar precisando repetir as mensagens iniciais/essenciais.
function exibirMensagensIniciais(){
        exibirTexto('#texto__titulo','Jogo do Número Secreto!');
        exibirTexto('#texto__subtitulo', `Tentativas: ${tentativaLimite}`);
        exibirTexto('#texto__paragrafo', `Insira um número entre 1 e ${numeroLimite}.`);
} 
// funcao para gerar o número secreto. A biblioteca Math.random() gera um número entre 0 e 1 depois multiplica pelo número limite (inserido pelo usuário) e o + 1 para "arredondar" o número, pois o Math.random() fica entre 0 e 1 (ou seja, o máximo é 0.99...). 
function gerarNumeroSecreto(){
        let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
        let quantidadeElementosNaLista = listaNumeroSecreto.length;
        console.log(listaNumeroSecreto.length);
        console.log(`Quantidade de Elementos na Lista: ${quantidadeElementosNaLista}`);
        // verificando se a quantidade de elementos da lista já chegou no limite máximo de opções randômicas (Ex: Caso o número limite seja 3, só haverá 3 elementos, sendo eles: 1, 2 e 3. Com isso, o random não vai repetir o mesmo número várias vezes)
        if(quantidadeElementosNaLista == numeroLimite){
                listaNumeroSecreto = [];
        }
        // se o número já estiver na lista de números secretos (já sorteados), irá retornar um novo valor, até gerar um número que nunca saiu.
        if(listaNumeroSecreto.includes(numeroEscolhido)){
                return gerarNumeroSecreto();
        } else {
                // se o número nunca saiu, irá colocar na lista de números secretos 
                listaNumeroSecreto.push(numeroEscolhido);
                console.log(listaNumeroSecreto);
                return numeroEscolhido;
        }
}

function verificarChute(){
        // recebendo o valor inserido pelo usuário.
        let chute = document.querySelector('#numMaximo').value;
        console.log(`Chute: ${chute}`);
        console.log(`Número Secreto é igual à chute: ${(chute == numeroSecreto)}`);
        // operador ternário para verificar se o texto vai ser no plural (tentativas) ou singular (tentativa).
        let textoTentativas = tentativas > 1 ? `Você descobriu o número secreto com ${tentativas} tentativas!` 
        : `Você descobriu o número secreto com ${tentativas} tentativa!`; 

        // Utilizei operador ternário para ficar algo mais dinâmico e simples ao invês de vários if e else.
        (chute == numeroSecreto) ? // Esta parte indica se caso o número chutado pelo usuário for igual ao número secreto, irá substituir algumas coisas.
        (exibirTexto('#texto__titulo', 'Acertou!'), // substitui o <h1></h1> para 'Acertou!'
        exibirTexto('#texto__subtitulo', `Número Secreto: ${numeroSecreto}!`), // substitui o subtítulo para 'Número Secreto: (número secreto)', para ficar visível qual foi o número acertado pelo usuário.
        exibirTexto('#texto__paragrafo', `${textoTentativas}`), // substitui o parágrafo para o texto: 'Você descobriu o número secreto com ${tentativas} tentativas!. Esse parágrafo está escrito na linha 57, um operador ternário.'
        document.getElementById("chutar").disabled = true, // colocando o atributo "disabled" no elemento do botão "chutar" para o usuário não precisar clicar no botão sem necessidade, pois ele já achou o número secreto (aleatório).
        document.getElementById("reiniciar").disabled = false, // retirando o atributo "disabled" no elemento do botão "Novo Jogo" para o usuário poder clicar no botão, pois ele poderá fazer um Novo Jogo.
        document.getElementById("numMaximo").disabled = true) // colocando o atributo "disabled" no elemento de inserção de números para o usuário não precisar inserir números sem necessidade, pois ele já achou o número secreto (aleatório).
        : (chute > numeroSecreto) ? 
        (tentativas++, tentativaLimite--,
        exibirTexto('#texto__paragrafo', 'O Número Secreto é menor!'), 
        exibirTexto('#texto__subtitulo',`Tentativas: ${tentativaLimite}`),
        limparCampo()) // se o chute for maior que o número secreto vai fazer essa linha de comando.
        : (tentativas++, tentativaLimite--, 
        exibirTexto('#texto__subtitulo',`Tentativas: ${tentativaLimite}`),
        exibirTexto('#texto__paragrafo', 'O Número Secreto é maior!'),
        limparCampo()) // se o chute for menor que o número secreto vai fazer essa linha de comando.  
        
        tentativaLimite <= 0 ? // tentativa limite é menor que 0? Se for, a pessoa perde e não irá poder mais chutar e nem inserir novos números, se não, irá exibir a quantidade de tentativas restantes.
        (exibirTexto('#texto__subtitulo',`Tentativas: ${tentativaLimite}`),
        exibirTexto('#texto__paragrafo', 'Você Perdeu :('),
        document.getElementById("chutar").disabled = true,
        document.getElementById("reiniciar").disabled = false,
        document.getElementById("numMaximo").disabled = true)
        : console.log(`Tentativas Restantes: ${tentativaLimite}`);
}

function verificarNumeroLimite(){
        do{
                numeroLimite = parseInt(prompt('Insira o número limite que poderá ser chutado:'));
                if (numeroLimite < 1 || Number.isNaN(numeroLimite)){
                        alert('O Número que você inseriu não pode ser aceito.')
                }
        }while(numeroLimite < 1 || Number.isNaN(numeroLimite));
        return numeroLimite;
}

function verificarTentativaLimite(){
        do{
                tentativaLimite = parseInt(prompt('Insira a quantidade de tentativas limite:'));
                if (tentativaLimite < 1 || Number.isNaN(tentativaLimite)){
                        alert('O Número que você inseriu não pode ser aceito.')
                }
        }while(tentativaLimite < 1 || Number.isNaN(tentativaLimite));
}

function limparCampo(){
        chute = document.querySelector('input');
        chute.value = ""; 
}

function reiniciarJogo(){     
        verificarNumeroLimite();
        verificarTentativaLimite(); 

        //listaNumeroSecreto = [];
        numeroSecreto = gerarNumeroSecreto();
        tentativas = 1;

        limparCampo();
        exibirMensagensIniciais();

        document.getElementById("chutar").disabled = false;
        document.getElementById("numMaximo").disabled = false;
        
        
}




